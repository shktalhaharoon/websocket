const Workout = require('./models/workoutModel');
function handleWorkoutEvents(socket) {
  
  // GET all workouts
  socket.on('getWorkouts', async () => {
    try {
      const workouts = await Workout.find({});
      // Send the fetched workouts to the client
      socket.emit('workoutsData', workouts);
    } catch (error) {
      console.error('Error fetching workouts:', error);
      socket.emit('error', 'Error fetching workouts');
    }
  });

  // POST (Create) a new workout
  socket.on('createWorkout', async (newWorkoutData) => {
    const { title, reps, load } = newWorkoutData;

    try {
      const newWorkout = await Workout.create({ title, reps, load });
      // Send the newly created workout back to the client
      socket.emit('workoutCreated', newWorkout);
    } catch (error) {
      console.error('Error creating workout:', error);
      socket.emit('error', 'Error creating workout');
    }
  });

  // PUT (Update) a workout
  socket.on('updateWorkout', async ({ id, updatedData }) => {
    const { title, reps, load } = updatedData;

    try {
      const updatedWorkout = await Workout.findByIdAndUpdate(id, { title, reps, load }, { new: true });
      // Send the updated workout back to the client
      socket.emit('workoutUpdated', updatedWorkout);
    } catch (error) {
      console.error('Error updating workout:', error);
      socket.emit('error', 'Error updating workout');
    }
  });

  // DELETE a workout
  socket.on('deleteWorkout', async (id) => {
    try {
      await Workout.findByIdAndDelete(id);
      // Notify the client that the workout was deleted
      socket.emit('workoutDeleted', id);
    } catch (error) {
      console.error('Error deleting workout:', error);
      socket.emit('error', 'Error deleting workout');
    }
  });
}

module.exports = handleWorkoutEvents;
