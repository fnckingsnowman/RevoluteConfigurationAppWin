// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar.jsx';
import Settings from './pages/Settings.jsx';
import ConfigPage from './pages/ConfigPage.jsx';
import Discover from './pages/Discover.jsx';
import Panel from './pages/Panel.jsx';

const App = () => {
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

  // Function to reorder tabs
  const handleReorderTabs = (reorderedTabs) => {
    setConfigTabs(reorderedTabs);
  };

  return (
    <div className="flex">
      <Router>
        <Sidebar
          configTabs={configTabs}
          onAddTab={handleAddTab}
          onDeleteTab={handleDeleteTab}
          onRenameTab={handleRenameTab}
          onReorderTabs={handleReorderTabs} // Pass the reorder function
        />

        <div className="flex-1 p-6">
          <Routes>
            <Route path="/settings" element={<Settings />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/panel" element={<Panel />} />

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
