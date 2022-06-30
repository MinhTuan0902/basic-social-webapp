const { Profile } = require("../models/profile.model");

const ProfileRepository = {
  getProfileByUserId: async (userId) => {
    const profile = await Profile.findOne({ userId });
    if (profile) {
      return profile;
    }
    return null;
  },

  createProfile: async (userId, name, story) => {
    const newProfile = await Profile.create({ userId, name, story });
    return newProfile;
  },

  updateProfile: async (userId, name, story) => {
    const profile = await Profile.findOne({ userId });
    if (profile) {
      profile.name = name;
      profile.story = story;
      await profile.save();
      return profile;
    }
    return null;
  },

  updateAvatar: async (userId, image) => {
    const profile = await Profile.findOne({ userId });
    if (profile) {
      profile.avatar = image;
      await profile.save();
      return profile;
    }
    return null;
  },

  getAvatarOfUser: async (userId) => {
    const avatar = await Profile.findOne({ userId }).select("avatar -_id");
    if (avatar) {
      return avatar;
    }
    return null;
  },

  getAllProfiles: async () => {
    const profiles = await Profile.find({});
    return profiles;
  },
};

module.exports = { ProfileRepository };
