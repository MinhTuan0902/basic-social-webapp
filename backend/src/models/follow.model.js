const mongoose = require("mongoose");
const { model, Types, Schema } = mongoose;

const FollowSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", unique: true, required: true },
    followers: [{ type: Types.ObjectId, ref: "User", default: [] }],
    following: [{ type: Types.ObjectId, ref: "User", default: [] }],
  },
  { timestamps: true }
);

const Follow = model("Follow", FollowSchema);

module.exports = { Follow };
