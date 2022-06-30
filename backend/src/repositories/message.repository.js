const { Message } = require("../models/message.model");

const MessageRepository = {
  getMessageFromConversation: async (firstUser, secondUser) => {
    const messages = await Message.find({}).or([
      {
        from: firstUser,
        to: secondUser,
      },
      { from: secondUser, to: firstUser },
    ]);
    return messages;
  },

  createMessage: async (sender, receiver, message) => {
    const newMessage = await Message.create({
      from: sender,
      to: receiver,
      content: message,
    });
    return newMessage;
  },

  getLastestMessage: async (firstUser, secondUser) => {
    const lastestMessage = await Message.findOne({})
      .or([
        {
          from: firstUser,
          to: secondUser,
        },
        { from: secondUser, to: firstUser },
      ])
      .sort({ createdAt: -1 });
    return lastestMessage;
  },
};

module.exports = { MessageRepository };
