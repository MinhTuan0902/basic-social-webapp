const { isValidObjectId } = require("mongoose");
const { cloudinary } = require("../config/cloudinary");
const { CommentRepository } = require("../repositories/comment.repository");
const { PostRepository } = require("../repositories/post.repository");
const { ReactionRepository } = require("../repositories/reaction.repository");
const { ProfileRepository } = require("../repositories/profile.repository");

const PostController = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await PostRepository.getAllPosts();
      return res.status(200).json({ posts });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getPost: async (req, res) => {
    const postId = req.params.postId;

    try {
      if (isValidObjectId(postId)) {
        const post = await PostRepository.getPostById(postId);
        if (post) {
          const author = await ProfileRepository.getProfileByUserId(
            post.userId
          );
          return res.status(200).json({ post, author });
        }
        return res.status(404).json({ message: "Bài viết không tồn tại" });
      }
      return res.status(400).json({ message: "Id bài viết không hợp lệ" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getMyPosts: async (req, res) => {
    const userId = req.userId;

    try {
      const myPosts = await PostRepository.getPostsOfUser(userId);
      return res.status(200).json({ myPosts });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getPostsOfUser: async (req, res) => {
    const userId = req.query.userId;

    try {
      if (isValidObjectId(userId)) {
        const posts = await PostRepository.getPostsOfUser(userId);
        return res.status(200).json({ posts });
      }
      return res.status(400).json({ message: "Id người dùng không hợp lệ" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  createPost: async (req, res) => {
    const userId = req.userId;
    const { caption } = req.body;
    const image = req.file;

    try {
      if (!caption) {
        return res
          .status(400)
          .json({ message: "Tiêu đề là thông tin bắt buộc" });
      }

      if (image) {
        cloudinary.uploader.upload(image.path);
        const newPost = await PostRepository.createPost(
          userId,
          caption,
          image.path
        );
        const reactions = await ReactionRepository.createReactions(newPost._id);

        return res
          .status(200)
          .json({ message: "Tạo bài viết mới thành công", newPost });
      } else {
        const newPost = await PostRepository.createPost(userId, caption, "");
        const reactions = await ReactionRepository.createReactions(newPost._id);

        return res
          .status(200)
          .json({ message: "Tạo bài viết mới thành công", newPost });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // TODO
  // write function for update and delete a post
  // only update caption
  updatePost: async (req, res) => {
    const userId = req.userId;
    const postId = req.params.postId;
    const { caption } = req.body;

    try {
      if (isValidObjectId(postId)) {
        const post = await PostRepository.getPostById(postId);
        if (post) {
          if (!caption) {
            return res
              .status(400)
              .json({ message: "Tiêu đề là thông tin bắt buộc" });
          }

          const updatedPost = await PostRepository.updatePost(
            userId, // author
            post._id,
            caption
          );
          return res
            .status(200)
            .json({ message: "Cập nhật bài viết thành công", updatedPost });
        }
        return res
          .status(404)
          .json({ message: "Không tìm thấy bài viết với Id tương ứng" });
      }
      return res.status(400).json({ message: "Id bài viết không hợp lệ" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  deletePost: async (req, res) => {
    const userId = req.userId;
    const postId = req.params.postId;

    try {
      if (isValidObjectId(postId)) {
        const post = await PostRepository.getPostById(postId);
        if (post) {
          const deletedPost = await PostRepository.deletePost(userId, postId);
          return res
            .status(200)
            .json({ message: "Xóa bài viết thành công", deletedPost });
        }
        return res
          .status(404)
          .json({ message: "Không tìm thấy bài viết với Id tương ứng" });
      }
      return res.status(400).json({ message: "Id bài viết không hợp lệ" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // TODO
  setReaction: async (req, res) => {
    const userId = req.userId;
    const postId = req.params.postId;

    try {
      if (isValidObjectId(postId)) {
        const reactions = await ReactionRepository.getReaction(postId);
        if (reactions.userList.includes(userId)) {
          return res.status(400).json({
            message:
              "Không thể thực hiện yêu cầu, bạn đã thích bài viết này rồi",
          });
        }

        reactions.userList.push(userId);
        await reactions.save();

        return res.status(200).json({ message: "Bạn vừa thích bài viết này" });
      }
      return res.status(400).json({ message: "Id bài viết không hợp lệ" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  removeReaction: async (req, res) => {
    const userId = req.userId;
    const postId = req.params.postId;

    try {
      if (isValidObjectId(postId)) {
        const reactions = await ReactionRepository.getReaction(postId);
        if (reactions.userList.includes(userId)) {
          reactions.userList.splice(reactions.userList.indexOf(userId), 1);
          await reactions.save();
          return res
            .status(200)
            .json({ message: "Bỏ thích bài viết thành công" });
        }
        return res.status(400).json({
          message: "Không thể thực hiện yêu cầu, bạn chưa thích bài viết này",
        });
      }
      return res.status(400).json({ message: "Id bài viết không hợp lệ" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getReactions: async (req, res) => {
    const postId = req.params.postId;

    try {
      if (isValidObjectId(postId)) {
        const reactions = await ReactionRepository.getReaction(postId);
        return res.status(200).json({ reactions });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getComments: async (req, res) => {
    const postId = req.params.postId;

    try {
      if (isValidObjectId(postId)) {
        const comments = await CommentRepository.getComments(postId);
        return res.status(200).json({ comments });
      }
      return res.status(400).json({ message: "Id bài viết không hợp lệ" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  createComment: async (req, res) => {
    const userId = req.userId;
    const postId = req.params.postId;
    const { content } = req.body;

    try {
      if (isValidObjectId(postId)) {
        if (content) {
          const newComment = await CommentRepository.createComment(
            userId,
            postId,
            content
          );
          return res
            .status(200)
            .json({ message: "Tạo bình luận mới thành công", newComment });
        }
        return res.status(400).json({
          message: "Không thể tạo bình luận, nội dung không được để trống",
        });
      }
      return res.status(400).json({ message: "Id bài viết không hợp lệ" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  updateComment: async (req, res) => {
    const userId = req.userId;
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const { content } = req.body;

    try {
      if (isValidObjectId(postId) && isValidObjectId(commentId)) {
        if (content) {
          const updatedComment = await CommentRepository.updateComment(
            userId,
            postId,
            commentId,
            content
          );
          return res.status(200).json({
            message: "Cập nhật bình luận thành công",
            updatedComment: updatedComment,
          });
        }
        return res.status(400).json({
          message:
            "Cập nhật bình luận không thành công, nội dung là thông tin bắt buộc",
        });
      }
      return res
        .status(400)
        .json({ message: "Id bài viết/bình luận không hợp lệ" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  deleteComment: async (req, res) => {
    const userId = req.userId;
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    try {
      if (isValidObjectId(postId) && isValidObjectId(commentId)) {
        const deletedComment = await CommentRepository.deleteComment(
          userId,
          postId,
          commentId
        );
        return res
          .status(200)
          .json({ message: "Xóa bình luận thành công", deletedComment });
      }
      return res
        .status(400)
        .json({ message: "Id bài viết/bình luận không hợp lệ" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = { PostController };
