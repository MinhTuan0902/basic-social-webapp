const mongoose = require("mongoose");
const { Types, model, Schema } = mongoose;

const ReactionSchema = new Schema(
  {
    postId: { type: Types.ObjectId, ref: "Post", required: true, unique: true },
    userList: [{ type: Types.ObjectId, ref: "User", default: [] }],
  },
  { timestamps: true }
);

const Reaction = model("Reaction", ReactionSchema);

module.exports = { Reaction };
