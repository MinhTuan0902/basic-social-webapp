const mongoose = require("mongoose");
const { model, Schema, Types } = mongoose;

const ProfileSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true, unique: true },
    name: { type: String, required: true },
    story: { type: String },
    avatar: {
      type: String,
      default:
        "https://i.pinimg.com/564x/ce/3d/b1/ce3db1c6bf4cf936ff5703f13978cfa9.jpg",
    },
  },
  { timestamps: true }
);

const Profile = model("Profile", ProfileSchema);

module.exports = { Profile };
