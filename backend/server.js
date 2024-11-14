const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { WebSocketServer } = require("ws");
const workoutRoutes = require("./routes/workouts");
const webSocketHandler = require("./webSocketHandler");
const path = require("path");

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware to parse JSON requests
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// REST API routes (optional if you still need them)
app.use("/api/workouts", workoutRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONG_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Database connection error:", error));

// Start HTTP server for WebSocket server integration
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Initialize WebSocket server on the same HTTP server
const wss = new WebSocketServer({ server });
webSocketHandler(wss);

console.log("WebSocket server is set up and ready for connections.");

// Import and initialize the cron job
require("./cron");
