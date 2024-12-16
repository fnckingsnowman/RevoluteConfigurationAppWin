// src/pages/ConfigPage.jsx
import React from 'react';

const ConfigPage = ({ configName }) => {
  return (
    <div className="bg-slate-600 flex flex-col items-center h-full">
      {/* Dynamic title based on configName prop */}
      <div className='p-6 flex flex-col items-center text-white'>
        <h1 className="text-3xl font-bold mb-4">{configName} Page</h1>
        <p className="mb-8">Edit your configurations for {configName} here.</p>
      </div>
      {/* here is part of the code that includes the textboxes and stuff */}
    <div className=''>
      <input type="text" class="bg-gray-500 rounded-lg p-2 text-white" placeholder="<-- rotation"></input>
      <input type="text" class="bg-gray-500 rounded-lg p-2 text-white" placeholder="rotation -->"></input>
    </div>
      
      {/* Spacer to push buttons to the bottom */}
      <div className="flex-1"></div>

      {/* Bottom buttons */}
      <div className="flex w-full">
        <button className="w-1/2 bg-gray-800 hover:bg-gray-700 text-white p-4 text-lg font-semibold">
          Export Configurations
        </button>
        <button className="w-1/2 bg-green-600 hover:bg-green-500 text-white p-4 text-lg font-semibold">
          Confirm & Upload Config
        </button>
      </div>
    </div>
  );
};

export default ConfigPage;
