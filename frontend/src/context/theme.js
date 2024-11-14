import React, { createContext, useState, useEffect } from "react";

// Create a context to manage the theme
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check if there's a saved theme in localStorage, default to 'light'
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    // Save the theme to localStorage whenever it changes
    localStorage.setItem('theme', theme);
    // Update the document body with the current theme
    document.body.className = theme;
  }, [theme]);

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
