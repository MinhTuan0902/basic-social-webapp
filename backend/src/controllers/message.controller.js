const { MessageRepository } = require("../repositories/message.repository");

const MessageController = {
  getAllMessages: async (req, res) => {
    const userId = req.userId;
    const receiver = req.query.receiver;
    try {
      const messages = await MessageRepository.getMessageFromConversation(
        userId,
        receiver
      );
      return res.status(200).json({ messages });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  createMessage: async (req, res) => {
    const userId = req.userId;
    const receiver = req.query.receiver;
    const { content } = req.body;
    try {
      if (userId === receiver) {
        return res.status(200).json({
          message: "Action is invalid, can not send message to yourself.",
        });
      }
      if (content) {
        const newMessage = await MessageRepository.createMessage(
          userId,
          receiver,
          content
        );
        return res.status(200).json({ newMessage });
      }
      return res
        .status(400)
        .json({ message: "Can not create message without content" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = { MessageController };
