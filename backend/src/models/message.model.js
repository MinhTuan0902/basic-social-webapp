const mongoose = require("mongoose");
const { Types, model, Schema } = mongoose;

const MessageSchema = new Schema(
  {
    from: { type: Types.ObjectId, ref: "User", required: true },
    to: { type: Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Message = model("Message", MessageSchema);

module.exports = { Message };
