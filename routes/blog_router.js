const path = require("path");
const express = require("express");
const { getAddBlog, postAddBlog, getBlogs, getSingleBlog, postComment, getEditBlog, postUpdateBlog, postDeleteBlog, getDeleteBlog } = require("../controller/blog_controller");
const multer = require("multer");

const blogRouter = express.Router();

const uploadPath = path.resolve(__dirname, "../public/uploads");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log(file);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
}); 
const upload = multer({ storage: storage });

blogRouter.get("/addblogs", getAddBlog);
blogRouter.get("/editblogs/:id", getEditBlog);
blogRouter.get("/blogs", getBlogs);
blogRouter.get("/blogs/:id", getSingleBlog);
blogRouter.post("/addblogs", upload.single("blogImage"), postAddBlog);
blogRouter.post("/editblogs/:id", upload.single("blogImage"), postUpdateBlog);
blogRouter.post("/comment/:Id",postComment);
blogRouter.get("/deleteblogs/:Id",getDeleteBlog);

module.exports = blogRouter;