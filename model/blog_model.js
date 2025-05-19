const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    blogImageUrl: String,
    category: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// ✅ Define Virtual: blog => comments[]
blogSchema.virtual("comments", {
  ref: "Comment", // Model to use
  localField: "_id", // Field on Blog
  foreignField: "blogId", // Field on Comment
});

const Blog = mongoose.model("Blog", blogSchema); // singular model name is good
module.exports = Blog;
