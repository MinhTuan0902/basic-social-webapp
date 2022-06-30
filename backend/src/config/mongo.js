const mongoose = require("mongoose");
const { MONGO_URI } = require("../environment");

const connectDatabase = async () => {
  try {
    mongoose.connect(MONGO_URI).then(() => {
      console.log("Database connected successfully");
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = { connectDatabase };
