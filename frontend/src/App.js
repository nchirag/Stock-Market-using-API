import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Home';
import Apps from './Stock';
import "./index.css";


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/start" element={<Apps />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;