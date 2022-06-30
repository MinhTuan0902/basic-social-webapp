const { User } = require("../models/user.model");

const UserRepository = {
  getUserByUsername: async (username) => {
    const user = await User.findOne({ username });
    if (user) {
      return user;
    }
    return null;
  },

  getUserById: async (id) => {
    const user = await User.findById(id);
    if (user) {
      return user;
    }
    return null;
  },

  getUserByEmail: async (email) => {
    const user = await User.findOne({ email });
    if (user) {
      return user;
    }
    return null;
  },

  createUser: async (username, email, password) => {
    const newUser = await User.create({ username, email, password });
    return newUser;
  },

  getUsers: async () => {
    const users = await User.find({}).select("_id");
    return users;
  },
};

module.exports = { UserRepository };
