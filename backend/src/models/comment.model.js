const mongoose = require("mongoose");
const { Types, model, Schema } = mongoose;

const CommentSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    postId: { type: Types.ObjectId, ref: "Post", required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Comment = model("Comment", CommentSchema);

module.exports = { Comment };
