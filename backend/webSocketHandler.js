const Workout = require('./models/workoutModel');

const webSocketHandler = (wss) => {
  wss.on('connection', (ws) => {
    console.log('WebSocket client connected');

    // Send a welcome message to the client
    ws.send(JSON.stringify({ message: 'Connected to WebSocket Server' }));

    // Handle incoming messages from clients
    ws.on('message', async (data) => {
      try {
        const message = JSON.parse(data);

        switch (message.type) {
          case 'GET_ALL_WORKOUTS':
            const workouts = await Workout.find({}).sort({ createdAt: -1 });
            ws.send(JSON.stringify({ type: 'ALL_WORKOUTS', data: workouts }));
            break;

          case 'CREATE_WORKOUT':
            const { title, load, reps } = message.data;
            const newWorkout = await Workout.create({ title, load, reps });
            ws.send(JSON.stringify({ type: 'NEW_WORKOUT', data: newWorkout }));

            // Broadcast the new workout to all connected clients
            wss.clients.forEach((client) => {
              if (client.readyState === client.OPEN) {
                client.send(JSON.stringify({ type: 'NEW_WORKOUT', data: newWorkout }));
              }
            });
            break;

          case 'DELETE_WORKOUT':
            const { id } = message.data;
            const deletedWorkout = await Workout.findOneAndDelete({ _id: id });
            if (deletedWorkout) {
              ws.send(JSON.stringify({ type: 'DELETE_SUCCESS', data: deletedWorkout }));

              // Broadcast the deletion to all clients
              wss.clients.forEach((client) => {
                if (client.readyState === client.OPEN) {
                  client.send(JSON.stringify({ type: 'DELETE_WORKOUT', data: deletedWorkout }));
                }
              });
            }
            break;

          default:
            ws.send(JSON.stringify({ error: 'Invalid message type' }));
        }
      } catch (error) {
        ws.send(JSON.stringify({ error: 'Error processing request' }));
      }
    });

    // Handle WebSocket disconnections
    ws.on('close', () => {
      console.log('WebSocket client disconnected');
    });
  });
};

module.exports = webSocketHandler;
