const { app } = require("./app");
const http = require("http");
const { connectDatabase } = require("./config/mongo");
const { PORT } = require("./environment");
const httpServer = http.createServer(app);
const { Server } = require("socket.io");
const { MessageRepository } = require("./repositories/message.repository");

// SOCKET
const io = new Server(httpServer, {
  cors: { origin: "https://social-web-client.herokuapp.com" },
});

var usersHasConnected = new Map();

io.on("connection", (socket) => {
  socket.on("Connect to Socket server from client", (userId) => {
    const userIdString = userId.toString();
    if (usersHasConnected.has(userIdString)) {
      usersHasConnected.delete(userIdString);
    }
    usersHasConnected.set(userIdString, socket.id);

    console.log({
      UserID: userId,
      SocketID: socket.id,
      Action: "Connect to Socket Server",
    });
  });

  socket.on("New message from Client", async (data) => {
    const sender = data.sender;
    const receiver = data.receiver;
    const lastestMessage = await MessageRepository.getLastestMessage(
      sender,
      receiver
    );

    console.log({
      UserID: sender,
      Action: "New message from Client",
      Payload: data,
    });

    console.log({ lastestMessage });

    const receiverString = receiver.toString();
    const senderString = sender.toString();

    if (usersHasConnected.has(receiverString)) {
      const receiverSocketID = usersHasConnected.get(receiverString);
      socket
        .to(receiverSocketID)
        .emit("New message from Server", { lastestMessage });
    }

    const senderSocketID = usersHasConnected.get(senderString);
    socket
      .to(senderSocketID)
      .emit("New message from Server", { lastestMessage });
  });

  socket.on("disconnect", () => {
    console.log({ message: "User disconnected" });
  });
});

async function start() {
  try {
    connectDatabase();
    httpServer.listen(PORT, () => {
      console.log(`HTTP Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

// START HTTP SERVER
start();
