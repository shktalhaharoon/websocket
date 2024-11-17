const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require("path");
const app = express();
const server = http.createServer(app);

// Import the WebSocket handler for workout events
const handleWorkoutEvents = require('./webSocketHandler');

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST']
}));

// Database Connection
mongoose.connect(process.env.MONG_URI)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.log(error);
  });

// Setting up WebSocket Server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE']
  }
});

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('Client connected via WebSocket');
  
  // Attach workout event handlers to the socket
  handleWorkoutEvents(socket);

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

require("./cron");
