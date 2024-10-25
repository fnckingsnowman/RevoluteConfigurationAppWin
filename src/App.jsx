// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar.jsx';
import ExampleConfig from './pages/ExampleConfig.jsx';
import Settings from './pages/Settings.jsx';
import ConfigPage from './pages/ConfigPage.jsx'; // Import the new ConfigPage component

const App = () => {
  // State to track dynamically added configuration tabs
  const [configTabs, setConfigTabs] = useState([]);

  // Function to add a new configuration tab
  const handleAddTab = () => {
    setConfigTabs((prevTabs) => [...prevTabs, `Config ${prevTabs.length + 1}`]);
  };

  // Function to delete a configuration tab
  const handleDeleteTab = (index) => {
    setConfigTabs((prevTabs) => prevTabs.filter((_, i) => i !== index));
  };

  // Function to rename a configuration tab
  const handleRenameTab = (index, newName) => {
    setConfigTabs((prevTabs) => prevTabs.map((tab, i) => (i === index ? newName : tab)));
  };

  return (
    <div className="flex">
      <Router>
        {/* Sidebar on the left */}
        <Sidebar
          configTabs={configTabs}
          onAddTab={handleAddTab}
          onDeleteTab={handleDeleteTab}
          onRenameTab={handleRenameTab}
        />

        {/* Main content area */}
        <div className="flex-1 p-6">
          <Routes>
            {/* Static ExampleConfig and Settings Routes */}
            <Route path="/example-config" element={<ExampleConfig />} />
            <Route path="/settings" element={<Settings />} />

            {/* Dynamically generate routes for each unique config tab */}
            {configTabs.map((tab, index) => (
              <Route
                key={index}
                path={`/config-${index + 1}`}
                element={<ConfigPage configName={tab} />}
              />
            ))}
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
