import React, { useState } from 'react';
import { useWebSocket } from '../context/WebSocketContext';

const WorkoutForm = () => {
  const { socket } = useWebSocket();
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (socket) {
      const newWorkout = { title, load, reps };
      socket.send(JSON.stringify({ type: 'CREATE_WORKOUT', data: newWorkout }));
      setTitle('');
      setLoad('');
      setReps('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>Load:</label>
      <input type="number" value={load} onChange={(e) => setLoad(e.target.value)} />
      <label>Reps:</label>
      <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} />
      <button type="submit">Add Workout</button>
    </form>
  );
};

export default WorkoutForm;
