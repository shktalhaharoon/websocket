// External Libraries
const React = require('react');
const ReactDOM = require('react-dom/client');
require('./index.css');

// Application Components
const App = require('./App');

// Context Providers
const { WorkoutsContextProvider } = require('./context/WorkoutContext');
const { ThemeProvider } = require('./context/theme');
const { WebSocketProvider } = require('./context/WebSocketContext');

// Create root and render the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  React.createElement(React.StrictMode, null, 
    React.createElement(ThemeProvider, null, 
      React.createElement(WebSocketProvider, null, 
        React.createElement(WorkoutsContextProvider, null, 
          React.createElement(App)
        )
      )
    )
  )
);
