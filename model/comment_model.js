const { default: mongoose, Schema } = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    content: { type: String, required: true },
    blogId: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
