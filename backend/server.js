const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require("path");
const app = express();
const server = http.createServer(app); 


app.use(express.json());


app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST']
}));


const workoutRoutes = require('./routes/workouts');


app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});


app.use('/api/workouts', workoutRoutes);


const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST','DELETE','UPDATE']
  }
});


io.on('connection', (socket) => {
  console.log('Client connected via WebSocket');


  socket.on('message', (data) => {
    console.log('Received:', data);
  
    socket.emit('message', `Server received: ${data}`);
  });

 
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});


mongoose.connect(process.env.MONG_URI)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.log(error);
  });


const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
require("./cron");