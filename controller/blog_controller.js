const fs = require("fs");
const path = require("path");
const Blog = require("../model/blog_model");
const Comment = require("../model/comment_model");

exports.getAddBlog = (req, res) => {
  res.render("add_blog", { error: "", blog: "" });
};

exports.getEditBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.render("add_blog", { error: "", blog });
};

exports.getBlogs = async (req, res) => {
  
    if (!req.user) {
      return res.status(400).render("signin", {
        error: "sign in first",
        email:'',
      });
    }
    const userId = req.user._id;
    const blogs = await Blog.find({ createdBy: userId }).sort({ createdAt: -1 });
 
  // console.log(blogs);
  res.render("blogs", { blogs });
};

exports.getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("createdBy")
      .populate({
        path: "comments",
        populate: { path: "createdBy", select: "fullName profileImageUrl" },
      });

    if (!blog) {
      return res.status(404).send("Blog not found");
    }

    res.render("blog", { blog });
  } catch (err) {
    console.log("Blog Details Error:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.postAddBlog = async (req, res) => {
  try {
    const { title, category, content } = req.body;

    // Check required fields
    if (!title || !content || !req.file) {
      return res.render("add_blog", {
        error: "Title, content, and image are required.",
        blog: { title, category, content },
      });
    }

    // const blogImageUrl = req.file.path.replace(/\\/g, "/"); // Normalize Windows path
    const blogImageUrl = `/uploads/${req.file.filename}`; //But the browser needs a public path, e.g. /uploads/filename.jpg, not a full OS path.

    await Blog.create({
      title,
      category,
      content,
      blogImageUrl,
      createdBy: req.user._id,
    });

    res.redirect("/blogs");
  } catch (err) {
    console.error("Blog creation error:", err);
    res.render("add_blog", {
      error: "An error occurred while creating the blog.",
      blog: req.body,
    });
  }
};
exports.postUpdateBlog = async (req, res) => {
  try {
    const { title, category, content } = req.body;
    const blogId = req.params.id; // Get blog ID from URL
    const blog=await Blog.findById(blogId);

    // Build update data object
    const updateData = {
      title,
      category,
      content,
    };

    // Check if a new image was uploaded
    if (req.file) {
       if (blog.blogImageUrl) {
      const imagePath = path.join(__dirname, "../public", blog.blogImageUrl); // full path
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting image:", err.message);
        } else {
          console.log("Image deleted:");
        }
      });
    }
      updateData.blogImageUrl = `/uploads/${req.file.filename}`;
    }

    // Update the blog
    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: blogId, createdBy: req.user._id }, // Ensure user owns the blog
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res
        .status(404)
        .render("404", { message: "Blog not found or unauthorized." });
    }

    res.redirect("/blogs");
  } catch (err) {
    console.error("Blog update error:", err);
    res.render("add_blog", {
      error: "An error occurred while updating the blog.",
      blog: { ...req.body, _id: req.params.id }, // So the form keeps values
    });
  }
};

exports.postComment = async (req, res) => {
  const content = req.body.content;
  const blogId = req.params.Id;
  const user = req.user;
  if (!user) {
    return res.render("signin", {
      error: "⚠️ Please sign in to comment on a post.",
      email: "",
    });
  }
  await Comment.create({
    content,
    blogId,
    createdBy: user._id,
  });
  res.redirect(`/blogs/${blogId}`);
};



exports.getDeleteBlog = async (req, res) => {
  try {
    const blogId = req.params.Id;

    const blog = await Blog.findById(blogId);

    // Optional: Check ownership
    // if (blog.createdBy.toString() !== req.user._id.toString()) {
    //   return res.status(403).render("error", { message: "Unauthorized action." });
    // }

    // 🧹 Delete the blog image file from uploads folder
    if (blog.blogImageUrl) {
      const imagePath = path.join(__dirname, "../public", blog.blogImageUrl); // full path
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting image:", err.message);
        } else {
          console.log("Image deleted:");
        }
      });
    }

    // ❌ Delete the blog from DB
    await Blog.findByIdAndDelete(blogId);

    res.redirect("/blogs");
  } catch (err) {
    console.error("Delete blog error:", err);
  }
};
