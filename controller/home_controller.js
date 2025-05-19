const Blog=require('../model/blog_model');
const Comment = require('../model/comment_model');

exports.getHomePage = async (req, res) => {
  try {
    // const blogs = await Blog.find({})
    //   .populate("createdBy")
    //   .populate({
    //     path: "comments",
    //     populate: { path: "createdBy", select: "fullName profileImageUrl" },
    //   })
    //   .sort({ createdAt: -1 });

    const blogs = await Blog.find({})
      .populate("createdBy")
      .sort({ createdAt: -1 })
      .lean(); // lean() makes rendering faster and lighter

    // Attach latest 1 comment manually to each blog
    for (let blog of blogs) {
      const latestComment = await Comment.find({ blogId: blog._id })
        .sort({ createdAt: -1 })
        .limit(1)
        .populate("createdBy", "fullName profileImageUrl")
        .lean();

      blog.latestComment = latestComment[0]; // undefined if no comment
    }


    res.render("home", { blogs });
  } catch (err) {
    console.log("Home Page Error:", err);
    res.status(500).send("Internal Server Error");
  }
};


// Search Controller
exports.getSearch=async (req, res) => {
  const query = req.query.q;

  try {
    const results = await Blog.find({
      title: { $regex: query, $options: 'i' }, // case-insensitive search
    }).populate("createdBy");
    res.render('search-results', { results, query });
  } catch (err) {
    res.status(500).send('Error while searching');
  }
};


