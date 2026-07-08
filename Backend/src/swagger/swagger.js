const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task API",
      version: "1.0.0",
      description: "Simple Task Management API",
    },
    // Runtime par /api-docs/swagger.json request host se set hota hai
    servers: [{ url: "/" }],
  },
  // NEW - __dirname se reliable path (Vercel par bhi kaam karega)
  apis: [path.join(__dirname, "../routes/*.js")],
  // OLD
  // apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;