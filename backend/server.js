const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require("path");
// Express app
const app = express();
const server = http.createServer(app); // Create HTTP server for WebSockets

// Middleware
app.use(express.json());

// Step 1: Enable CORS for your Express app
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST']
}));

// Routes
const workoutRoutes = require('./routes/workouts');

// Middleware for logging
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Use the workout routes
app.use('/api/workouts', workoutRoutes);

// Step 2: Set up Socket.IO with CORS handling
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Allow frontend URL
    methods: ['GET', 'POST']
  }
});

// Step 3: WebSocket logic
io.on('connection', (socket) => {
  console.log('Client connected via WebSocket');

  // Handle incoming messages
  socket.on('message', (data) => {
    console.log('Received:', data);
    // Emit a response message back to the client
    socket.emit('message', `Server received: ${data}`);
  });

  // Cleanup on disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONG_URI)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.log(error);
  });

// Step 4: Listen on your desired port
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
require("./cron");