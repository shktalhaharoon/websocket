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
      // Request all workouts when connection is established
      ws.send(JSON.stringify({ type: 'GET_ALL_WORKOUTS' }));
    };

    ws.onmessage = (message) => {
      try {
        const data = JSON.parse(message.data);

        // Handle different types of messages
        if (data.type === 'ALL_WORKOUTS') {
          // Update the workouts state with data received from the WebSocket
          setWorkouts(data.workouts);
        }
        // Add more conditions here if you handle other message types
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    // Cleanup function to close the WebSocket when the component unmounts
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
