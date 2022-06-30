const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const PostSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    caption: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

const Post = model("Post", PostSchema);

module.exports = { Post };
