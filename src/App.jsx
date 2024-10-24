import * as React from "react";
import "./App.css";

// src/App.jsx
//import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar.jsx';
import ExampleConfig from './pages/ExampleConfig.jsx';
import Settings from './pages/Settings.jsx';


const App = () => {
  return (
    <div className="flex">
      <Router>
        {/* Sidebar on the left */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/example-config" element={<ExampleConfig />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
