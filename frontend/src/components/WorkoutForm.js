import { useState } from 'react';
import { useWebSocket } from '../context/WebSocketContext';

const WorkoutForm = () => {
  const { socket } = useWebSocket();
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (socket) {
      const newWorkout = { title, load, reps };
      socket.send(JSON.stringify({ type: 'CREATE_WORKOUT', data: newWorkout }));
      setTitle('');
      setLoad('');
      setReps('');
    } else {
      setError('WebSocket is not connected');
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
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
