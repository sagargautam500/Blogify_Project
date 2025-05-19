const express = require("express");
const multer = require("multer");

const {
  getSignup,
  postSignup,
  getSignin,
  postSignin,
  getLogout,
  getProfileImage,
} = require("../controller/user_controller");
const { signupValidation } = require("../middleware/userValidation");

const userRouter = express.Router();


const storage=multer.memoryStorage();
const upload = multer({ storage: storage});



userRouter.get("/signup", getSignup);
userRouter.post("/signup",upload.single("profileImage"),signupValidation, postSignup);
userRouter.get("/signin", getSignin);
userRouter.post("/signin", postSignin);
userRouter.get('/logout',getLogout);
userRouter.get('/profile-image/:id',getProfileImage);

module.exports = userRouter;
