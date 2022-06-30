const { Follow } = require("../models/follow.model");

const FollowRepository = {
  getFollowers: async (userId) => {
    const followers = await Follow.findOne({ userId }).select("followers -_id");
    return followers;
  },

  getFollowing: async (userId) => {
    const following = await Follow.findOne({ userId }).select("following -_id");
    return following;
  },

  getFollow: async (userId) => {
    const follow = await Follow.findOne({ userId });
    return follow;
  },

  createFollow: async (userId) => {
    const newFollow = await Follow.create({ userId });
    return newFollow;
  },
};

module.exports = { FollowRepository };
