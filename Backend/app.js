const express = require("express");
const cors = require("cors");

// OLD - Vercel par swagger-ui-express static files kaam nahi karti
// const swaggerUI = require("swagger-ui-express");
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

// OLD - Vercel serverless par JS files HTML return karti hain (SwaggerUIBundle error)
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// NEW - CDN se Swagger UI (Vercel + local dono par kaam karega)
// Server URL request ke host se set karo taake Swagger same origin par API call kare
app.get("/api-docs/swagger.json", (req, res) => {
  const protocol =
    req.headers["x-forwarded-proto"]?.split(",")[0]?.trim() || req.protocol;
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const dynamicSpec = {
    ...swaggerSpec,
    servers: [{ url: `${protocol}://${host}` }],
  };

  res.setHeader("Content-Type", "application/json");
  res.send(dynamicSpec);
});

const swaggerHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Task API - Swagger UI</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css" />
  <style>
    html { box-sizing: border-box; overflow-y: scroll; }
    *, *:before, *:after { box-sizing: inherit; }
    body { margin: 0; background: #fafafa; }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js"></script>
  <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = function () {
      window.ui = SwaggerUIBundle({
        url: "/api-docs/swagger.json",
        dom_id: "#swagger-ui",
        deepLinking: true,
        presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
        plugins: [SwaggerUIBundle.plugins.DownloadUrl],
        layout: "StandaloneLayout",
      });
    };
  </script>
</body>
</html>`;

app.get("/api-docs", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send(swaggerHtml);
});

app.get("/api-docs/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send(swaggerHtml);
});

module.exports = app;