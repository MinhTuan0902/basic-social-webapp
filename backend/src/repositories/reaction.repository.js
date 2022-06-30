const { Reaction } = require("../models/reaction.model");

const ReactionRepository = {
  getReaction: async (postId) => {
    const reaction = await Reaction.findOne({ postId });
    return reaction;
  },

  createReactions: async (postId) => {
    const reactions = await Reaction.create({ postId });
    return reactions;
  },
};

module.exports = { ReactionRepository };
