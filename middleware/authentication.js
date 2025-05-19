const { validateToken } = require("../services/authentication");

function checkAuthentication() {
  return (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
      req.user = null; // explicitly unset
      return next();
    }

    try {
      const user = validateToken(token); // should return decoded payload
      req.user = user;
    } catch (error) {
      req.user = null; // clear user on invalid token
    }

    next();
  };
}

module.exports = checkAuthentication;
