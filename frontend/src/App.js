import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
// Pages & Components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { ThemeContext } from './context/theme';
//import WorkoutDetails from './components/WorkoutDetails';
//import WorkoutForm from './components/WorkoutForm';
function App() {
  // Access the current theme and the toggle function from ThemeContext
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    // Apply the current theme as a class to the root div
    <div className={`App ${theme}`}>
      <BrowserRouter>
        <Navbar />
        <header>
        
          {/* Button to toggle between Light and Dark modes */}
          <button className="theme" onClick={toggleTheme}>
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </header>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
