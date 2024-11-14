import { createContext, useContext, useState, useEffect } from 'react';

const WebSocketContext = createContext(null);

// This is the hook that allows components to use the WebSocket context
export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000'); // Replace with your WebSocket server URL
    setSocket(ws);

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
      ws.send(JSON.stringify({ type: 'GET_ALL_WORKOUTS' }));
    };

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      switch (data.type) {
        case 'ALL_WORKOUTS':
          setWorkouts(data.data);
          break;
        case 'NEW_WORKOUT':
          setWorkouts((prev) => [data.data, ...prev]);
          break;
        case 'DELETE_WORKOUT':
          setWorkouts((prev) => prev.filter((w) => w._id !== data.data._id));
          break;
        default:
          console.error('Unknown message type:', data.type);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ socket, workouts }}>
      {children}
    </WebSocketContext.Provider>
  );
};
