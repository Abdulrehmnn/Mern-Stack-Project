const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");

// NEW - Vercel ya local dono par sahi URL
const getServerUrl = () => {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return `http://localhost:${process.env.PORT || 3000}`;
};

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task API",
      version: "1.0.0",
      description: "Simple Task Management API",
    },
    servers: [
      {
        url: getServerUrl(),
      },
      // OLD - Sirf localhost ke liye tha
      // {
      //   url: "http://localhost:3000",
      // },
    ],
  },
  // NEW - __dirname se reliable path (Vercel par bhi kaam karega)
  apis: [path.join(__dirname, "../routes/*.js")],
  // OLD
  // apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;