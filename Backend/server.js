require("dotenv").config();

const app = require("./app");

const connectDB = require("./src/config.js/db");

connectDB();

const PORT = process.env.PORT || 5000;

// OLD - Vercel par app.listen() kaam nahi karta (serverless functions)
// app.listen(PORT, () => {
//   console.log(`Server Running on Port ${PORT}`);
// });

// NEW - Sirf local development ke liye (npm start / npm run dev)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
  });
}