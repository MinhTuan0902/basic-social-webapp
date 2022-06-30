const { isValidObjectId } = require("mongoose");
const { cloudinary } = require("../config/cloudinary");
const { ProfileRepository } = require("../repositories/profile.repository");

const ProfileController = {
  update: async (req, res) => {
    const userId = req.userId;
    const { name, story } = req.body;

    try {
      if (!name) {
        return res
          .status(400)
          .json({ message: "Name is required field to update profile." });
      }

      const updatedProfile = await ProfileRepository.updateProfile(
        userId,
        name,
        story
      );

      return res.status(200).json({
        message: "Profile updated successfully",
        updatedProfile,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getMyProfile: async (req, res) => {
    const userId = req.userId;

    try {
      const myProfile = await ProfileRepository.getProfileByUserId(userId);
      return res.status(200).json({ myProfile });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getUserProfile: async (req, res) => {
    const userId = req.query.userId;

    try {
      if (isValidObjectId(userId)) {
        const profile = await ProfileRepository.getProfileByUserId(userId);
        if (profile) {
          return res.status(200).json({ profile });
        }
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }
      return res.status(400).json({ message: "Id người dùng không hợp lệ" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  updateAvatar: async (req, res) => {
    const userId = req.userId;
    const image = req.file;

    try {
      if (image) {
        cloudinary.uploader.upload(image.path);
        const updatedProfile = await ProfileRepository.updateAvatar(
          userId,
          image.path
        );
        return res.status(200).json({
          message: "Avatar updated successfully",
          updatedProfile,
        });
      }
      return res.status(400).json({ message: "Image not found" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getAvatar: async (req, res) => {
    const userId = req.userId;
    try {
      const avatar = await ProfileRepository.getAvatarOfUser(userId);
      return res.status(200).json(avatar);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getAllProfiles: async (req, res) => {
    try {
      const profiles = await ProfileRepository.getAllProfiles();
      return res.status(200).json({ profiles });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = { ProfileController };
