// Vercel serverless entry point
// Local development ke liye: npm start (server.js use hota hai)

require("dotenv").config();

const connectDB = require("../src/config.js/db");
const app = require("../app");

connectDB();

module.exports = app;
