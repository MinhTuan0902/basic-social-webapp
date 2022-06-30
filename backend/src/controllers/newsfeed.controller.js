const { Post } = require("../models/post.model");
const { FollowRepository } = require("../repositories/follow.repository");
const { PostRepository } = require("../repositories/post.repository");

const getMyNewsfeed = async (req, res) => {
  try {
    const userId = req.userId;

    const userFollowing = await FollowRepository.getFollowing(userId);
    let userFollowingStringArray = userFollowing.following.map((userId) =>
      userId.toString()
    );
    userFollowingStringArray.push(userId);

    const newsfeed = await Post.find({
      userId: { $in: userFollowingStringArray },
    }).sort({ createdAt: -1 });

    return res.status(200).json({ newsfeed });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = { getMyNewsfeed };
