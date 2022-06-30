const { Comment } = require("../models/comment.model");

const CommentRepository = {
  getComments: async (postId) => {
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
    return comments;
  },

  createComment: async (userId, postId, content) => {
    const newComment = await Comment.create({ userId, postId, content });
    return newComment;
  },

  updateComment: async (userId, postId, commentId, content) => {
    const updatedComment = await Comment.findOneAndUpdate(
      {
        userId,
        postId,
        _id: commentId,
      },
      { $set: { content } },
      { new: true }
    );
    return updatedComment;
  },

  deleteComment: async (userId, postId, commentId) => {
    const deletedComment = await Comment.findOneAndDelete({
      userId,
      postId,
      _id: commentId,
    });
    return deletedComment;
  },

  getOneComment: async (userId, postId, commentId) => {
    const comment = await Comment.findOne({ userId, postId, _id: commentId });
    return comment;
  },
};

module.exports = { CommentRepository };
