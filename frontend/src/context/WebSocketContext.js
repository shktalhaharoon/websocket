import { createContext, useContext, useState, useEffect } from 'react';

const WebSocketContext = createContext(null);

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    // Connect to WebSocket server
    const ws = new WebSocket('ws://localhost:8000');
    setSocket(ws);

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
      ws.send(JSON.stringify({ type: 'GET_ALL_WORKOUTS' }));
    };

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      // Handle received messages
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
