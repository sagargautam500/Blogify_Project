const path = require("path");
const express = require("express");
const { default: mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const homeRouter = require("./routes/home_router");
const userRouter = require("./routes/user_router");
const checkAuthentication = require("./middleware/authentication");
const blogRouter = require("./routes/blog_router");
const { dbPath } = require("./config/configuration");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

// app.use('/uploads',express.static(path.join(__dirname, "public/uploads")));
app.use('/images',express.static(path.resolve("public/images")));
app.use('/uploads',express.static(path.resolve("public/uploads")));

app.use(checkAuthentication());
// ✅ Then set locals.user globally 
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});
  
app.use(homeRouter);
app.use(blogRouter);
app.use("/user", userRouter);


mongoose
  .connect(dbPath)
  .then(() => {
    console.log("database connected...");
  })
  .catch((err) => {
    console.log("Error occur while database connect:", err);
  });
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
