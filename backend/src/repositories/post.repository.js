const { Post } = require("../models/post.model");

const PostRepository = {
  getAllPosts: async () => {
    const posts = await Post.find({}).populate("userId");
    return posts;
  },

  getPostById: async (id) => {
    const post = await Post.findById(id);
    if (post) {
      return post;
    }
    return null;
  },

  getPostsOfUser: async (userId) => {
    const posts = await Post.find({ userId }).sort({ createdAt: -1 });
    return posts;
  },

  createPost: async (userId, caption, image) => {
    const newPost = await Post.create({ userId, caption, image });
    return newPost;
  },

  updatePost: async (userId, postId, caption) => {
    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId, userId },
      { $set: { caption } },
      { new: true }
    );
    return updatedPost;
  },

  deletePost: async (userId, postId) => {
    const deletedPost = await Post.findOneAndDelete({ userId, _id: postId });
    return deletedPost;
  },
};

module.exports = { PostRepository };
