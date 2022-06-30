const { UserRepository } = require("../repositories/user.repository");
const { ProfileRepository } = require("../repositories/profile.repository");
const { FollowRepository } = require("../repositories/follow.repository");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { isValidObjectId } = mongoose;

const {
  BCRYPT_SALT,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_TIMEOUT,
} = require("../environment");

const UserController = {
  register: async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;

    try {
      if (!username || !email || !password || !repeatPassword) {
        return res
          .status(400)
          .json({ message: "Hãy điền đầy đủ thông tin đăng ký tài khoản mới" });
      }

      const existedUsername = await UserRepository.getUserByUsername(username);
      if (existedUsername) {
        return res
          .status(400)
          .json({ message: "Tên tài khoản đã được sử dụng" });
      }

      const existedEmail = await UserRepository.getUserByEmail(email);
      if (existedEmail) {
        return res.status(400).json({ message: "Email đã được sử dụng" });
      }

      if (password !== repeatPassword) {
        return res.status(400).json({ message: "Mật khẩu không trùng khớp" });
      }
      const hashedPassword = bcrypt.hashSync(password, BCRYPT_SALT);
      const newUser = await UserRepository.createUser(
        username,
        email,
        hashedPassword
      );

      const newProfile = await ProfileRepository.createProfile(
        newUser._id,
        username,
        ""
      );

      const newFollow = await FollowRepository.createFollow(newUser._id);

      return res.status(200).json({
        message: "Đăng ký tài khoản mới thành công",
        newUser,
        newProfile,
        newFollow,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Hãy điền đầy đủ thông tin đăng nhập" });
      }

      const user = await UserRepository.getUserByUsername(username);
      if (!user) {
        return res.status(404).json({ message: "Tên tài khoản không tồn tại" });
      }

      const isCorrectPassword = bcrypt.compareSync(password, user.password);
      if (isCorrectPassword) {
        const accessToken = jwt.sign(
          { userId: user._id },
          JWT_ACCESS_TOKEN_SECRET,
          { algorithm: "HS256", expiresIn: JWT_ACCESS_TOKEN_TIMEOUT }
        );

        const profile = await ProfileRepository.getProfileByUserId(user._id);

        return res.status(200).json({
          message: "Đăng nhập thành công",
          accessToken,
          // userData: { user, profile },
          userData: { user: { _id: user._id } },
        });
      }
      return res.status(400).json({ message: "Mật khẩu không chính xác" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await UserRepository.getUsers();
      return res.status(200).json({ users });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  get: async (req, res) => {
    res.send("work");
  },

  followUser: async (req, res) => {
    const requestMaker = req.userId; // current user who makes the follow request
    const requestReceiver = req.params.userId; // user who receives the follow request

    try {
      if (isValidObjectId(requestReceiver)) {
        const requestMakerFollow = await FollowRepository.getFollow(
          requestMaker
        );
        const requestReceiverFollow = await FollowRepository.getFollow(
          requestReceiver
        );

        if (
          requestMakerFollow.following.includes(requestReceiver) &&
          requestReceiverFollow.followers.includes(requestMaker)
        ) {
          return res
            .status(400)
            .json({ message: "Bạn đã theo dõi người dùng này rồi" });
        }

        requestMakerFollow.following.push(requestReceiver);
        requestReceiverFollow.followers.push(requestMaker);

        await requestMakerFollow.save();
        await requestReceiverFollow.save();

        return res
          .status(200)
          .json({ message: "Theo dõi người dùng thành công" });
      }
      return res.status(400).json({ message: "Id người dùng không hợp lệ" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  unfollowUser: async (req, res) => {
    const requestMaker = req.userId;
    const requestReceiver = req.params.userId;

    try {
      if (isValidObjectId(requestReceiver)) {
        const requestMakerFollow = await FollowRepository.getFollow(
          requestMaker
        );
        const requestReceiverFollow = await FollowRepository.getFollow(
          requestReceiver
        );

        if (
          requestMakerFollow.following.includes(requestReceiver) &&
          requestReceiverFollow.followers.includes(requestMaker)
        ) {
          requestMakerFollow.following.splice(
            requestMakerFollow.following.indexOf(requestReceiver),
            1
          );
          requestReceiverFollow.followers.splice(
            requestReceiverFollow.followers.indexOf(requestMaker),
            1
          );

          await requestMakerFollow.save();
          await requestReceiverFollow.save();

          return res
            .status(200)
            .json({ message: "Hủy theo dõi người dùng thành công" });
        }
        return res
          .status(400)
          .json({ message: "Bạn chưa theo dõi người dùng này" });
      }
      return res.status(400).json({ message: "Id người dùng không hợp lệ" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getFollowOfUser: async (req, res) => {
    const userId = req.params.userId;

    try {
      if (isValidObjectId(userId)) {
        const follow = await FollowRepository.getFollow(userId);
        return res.status(200).json({ follow });
      }
      return res.status(400).json({ message: "Id người dùng không hợp lệ" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = { UserController };
