import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000'); // Connect to the WebSocket server

function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState({
    title: '',
    reps: '',
    load: '',
  });

  // Listen for workout updates from the server
  useEffect(() => {
    // Listen for fetched workouts from the server
    socket.on('workoutsFetched', (data) => {
      setWorkouts(data);
    });

    // Listen for a new workout being created
    socket.on('workoutCreated', (data) => {
      setWorkouts((prevWorkouts) => [...prevWorkouts, data]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off('workoutsFetched');
      socket.off('workoutCreated');
    };
  }, []);

  // Handle creating a new workout
  const handleCreateWorkout = () => {
    // Emit the new workout data to the server
    socket.emit('createWorkout', newWorkout);
    setNewWorkout({ title: '', reps: '', load: '' }); // Clear the form after submission
  };

  return (
    <div>
      <h1>Workout List</h1>
      <div>
        <input
          type="text"
          value={newWorkout.title}
          onChange={(e) => setNewWorkout({ ...newWorkout, title: e.target.value })}
          placeholder="Workout Title"
        />
        <input
          type="number"
          value={newWorkout.reps}
          onChange={(e) => setNewWorkout({ ...newWorkout, reps: e.target.value })}
          placeholder="Reps"
        />
        <input
          type="number"
          value={newWorkout.load}
          onChange={(e) => setNewWorkout({ ...newWorkout, load: e.target.value })}
          placeholder="Load (kg)"
        />
        <button onClick={handleCreateWorkout}>Create Workout</button>
      </div>

      <div>
        <h2>Workouts</h2>
        <ul>
          {workouts.map((workout, index) => (
            <li key={index}>
              {`${workout.title} - Reps: ${workout.reps} - Load: ${workout.load} kg`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
