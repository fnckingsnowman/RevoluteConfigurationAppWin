// src/pages/ConfigPage.jsx
import React from 'react';

const ConfigPage = ({ configName }) => {
  return (
    <div className="p-6 flex flex-col items-center">
      {/* Dynamic title based on configName prop */}
      <h1 className="text-3xl font-bold mb-4">{configName} Page</h1>
      <p className="mb-8">Edit your configurations for {configName} here.</p>

      
    </div>
      
  );
};

export default ConfigPage;
