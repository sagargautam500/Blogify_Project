require("dotenv").config();

const dbPath = process.env.dbPath;
const secret = process.env.jwt_secret;
const PORT = process.env.PORT || 3000;

module.exports = { dbPath, secret, PORT };
