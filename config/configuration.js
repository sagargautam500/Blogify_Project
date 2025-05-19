require("dotenv").config();

const dbPath = process.env.dbPath;
const secret=process.env.jwt_secret;

module.exports = { dbPath,secret };
