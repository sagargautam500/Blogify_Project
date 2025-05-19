const { validationResult } = require("express-validator");
const User = require("../model/user-model");
const { createTokenForUser } = require("../services/authentication");

// Render Signup Page
exports.getSignup = (req, res) => {
  // console.log(req.cookies.token)
  // console.log(req.user);
  res.render("signup", { error: "", userData: "" });
};

/// Handle Signup Form Submission
exports.postSignup = async (req, res) => {
  // console.log(req.file);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("signup", {
      error: errors
        .array()
        .map((err) => err.msg)
        .join("<br>"),
      userData: req.body,
    });
  }

  if (req.file && !req.file.mimetype.startsWith("image/")) {
    return res.status(400).render("signup", {
      error: "Only image files are allowed",
      userData: req.body,
    });
  }

  const { fullName, email, password, role } = req.body;

  try {
    const userData = {
      fullName,
      email: email.trim().toLowerCase(),
      password,
      role,
    };

    // If image is uploaded, attach it
    if (req.file) {
      userData.profileImage = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    await User.create(userData);

    res.redirect("/user/signin");
  } catch (err) {
    let errorMsg = "Something went wrong";

    if (err.code === 11000) {
      errorMsg = "Email already exists";
    }

    res.status(400).render("signup", {
      error: errorMsg,
      userData: req.body,
    });
  }
};

// get profile image
exports.getProfileImage = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user || !user.profileImage || !user.profileImage.data) {
    return res.redirect("/images/defaultProfile.jpg");
  }

  res.set("Content-Type", user.profileImage.contentType);
  res.send(user.profileImage.data);
};

// Render Signin Page
exports.getSignin = (req, res) => {
  res.render("signin", { error: "", email: "" });
};

// Handle Signin Form Submission
exports.postSignin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.trim().toLowerCase() });

    if (!user) {
      return res.status(400).render("signin", {
        error: "Invalid email or password",
        email,
      });
    }

    const isMatch = await user.validatePassword(password);

    if (!isMatch) {
      return res.status(400).render("signin", {
        error: "Invalid email or password",
        email,
      });
    }

    // At this point, user is authenticated
    // You can use session, JWT, or any login logic here
    const token = createTokenForUser(user);
    res.cookie("token", token); //token save as a cookie
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).render("signin", {
      error: "Internal Server Error",
      email,
    });
  }
};

exports.getLogout = (req, res) => {
  // Clear the cookie named 'token'
  res.clearCookie("token");

  // Optionally, redirect to login or home page
  res.redirect("/user/signin");
};
