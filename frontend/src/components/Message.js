import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MessageApi from "../APIs/message";
import useLoggedInUser from "../hooks/useLoggedInUser";
import io from "socket.io-client";
const SERVER_HOST = "https://social-web-apii.herokuapp.com";

const Message = () => {
  const socket = io(SERVER_HOST);
  const { userId } = useParams();
  const pathToUserProfile = "/profile/" + userId;

  const [content, setContent] = useState("");
  const [createdMessage, setCreatedMessage] = useState(null);
  const [newMsg, setNewMsg] = useState(null);

  const loggedInUser = useLoggedInUser();

  const fetchCreatedMessage = async () => {
    try {
      MessageApi.getAllMessages(userId).then((data) => {
        if (data.messages) {
          setCreatedMessage(data.messages);
        }
      });
    } catch (error) {
      throw error;
    }
  };

  const fetchCreateNewMessage = async () => {
    try {
      const newMesasgeData = await MessageApi.createNewMessage(userId, content);
      if (newMesasgeData.newMessage) {
        socket.emit("New message from Client", {
          sender: loggedInUser.loggedInUser.user._id,
          receiver: userId,
        });
        setContent("");
      }
    } catch (error) {
      throw error;
    }
  };

  const emitConnectEventToSocket = () => {
    socket.emit(
      "Connect to Socket server from client",
      loggedInUser.loggedInUser.user._id
    );
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    fetchCreateNewMessage();
  };

  useEffect(() => {
    fetchCreatedMessage();
    emitConnectEventToSocket();

    document.title = "Message";

    socket.on("New message from Server", (data) => {
      if (data.lastestMessage) {
        setCreatedMessage((oldCreatedMessage) => [
          ...oldCreatedMessage,
          data.lastestMessage,
        ]);
        setNewMsg(data.lastestMessage);
      }
    });
  }, []);

  if (createdMessage) {
    return (
      <>
        <p className="text-base">
          You are on chatting with user{" "}
          <Link to={pathToUserProfile} className="italic text-cyan-800">
            {userId}
          </Link>
        </p>

        <div
          style={{ height: "450px" }}
          className="text-sm flex flex-col h-full w-full mt-2 rounded-xl bg-red-100 relative py-3 px-5 overflow-y-scroll"
        >
          {createdMessage.length === 0 && (
            <p className="italic text-center text-gray-500">No message here</p>
          )}
          {createdMessage.map((message, index) => {
            if (
              message.from === userId &&
              message.to === loggedInUser.loggedInUser.user._id
            ) {
              return (
                <div key={index} className="flex justify-start">
                  <p className="w-fit bg-red-300 p-3 rounded-2xl my-1">
                    {message.content}
                  </p>
                </div>
              );
            }
            if (
              message.from === loggedInUser.loggedInUser.user._id &&
              message.to === userId
            ) {
              return (
                <div key={index} className="flex justify-end">
                  <p className="text-right p-3 bg-red-400 rounded-2xl w-fit my-1">
                    {message.content}
                  </p>
                </div>
              );
            }
          })}
        </div>
        <div className="mt-2 flex w-full">
          <input
            className="text-sm p-2 mr-2 w-full border-2 border-gray-400 rounded-xl"
            placeholder="> Type message"
            value={content}
            name="content"
            type="text"
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          {content && (
            <button
              onClick={handleSendMessage}
              className="bg-red-400 py-2 px-4 rounded-xl"
            >
              Send
            </button>
          )}
        </div>
      </>
    );
  }
};

export default Message;
