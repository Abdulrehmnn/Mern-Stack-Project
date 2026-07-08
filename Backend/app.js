const express = require("express");
const cors = require("cors");

const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./src/swagger/swagger");

const taskRoutes = require("./src/routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Health check route (Vercel deployment verify karne ke liye)
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Task API is running",
    docs: "/api-docs",
  });
});

app.use("/api/tasks", taskRoutes);

// Swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

module.exports = app;