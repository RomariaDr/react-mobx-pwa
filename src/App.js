import React from "react";
import './App.scss';
import "react-toggle/style.css";
import ListView from './components/ListView'
import ThemeProvider from './components/ThemeProvider'

function App() {

  return (
    <ThemeProvider>
      <ListView />
    </ThemeProvider>
  );
}

export default App;
