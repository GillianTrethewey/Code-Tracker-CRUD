const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { PORT = 8000 || 8080, BACKEND_URL, CORS_ORIGIN } = process.env;

const app = express();

// Middleware
app.use(
  cors({
    origin: CORS_ORIGIN,
    optionsSuccessStatus: 200,
  })
)

app.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});

app.use(express.json());

// Router
const router = express.Router();

// Routes defined here
try {
  const tasksRouter = require("./routes/tasks");
  // Mount the router
  app.use("/tasks", tasksRouter);
} catch (error) {
  console.error("Error loading tasks router:", error);
}

// Mount the router
app.use("/api", router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
