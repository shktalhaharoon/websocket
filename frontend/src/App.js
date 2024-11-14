import React from 'react';
import { WebSocketProvider } from './context/WebSocketContext';
import { ThemeProvider } from './context/theme';
import WorkoutForm from './components/WorkoutForm';
import WorkoutList from './components/WorkoutList';

const App = () => {
  return (
    <ThemeProvider>
      <WebSocketProvider>
        <div className="App">
          <WorkoutForm />
          <WorkoutList />
        </div>
      </WebSocketProvider>
    </ThemeProvider>
  );
};

export default App;
