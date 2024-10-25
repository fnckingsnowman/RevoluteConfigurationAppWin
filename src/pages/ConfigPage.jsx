// src/pages/ConfigPage.jsx
import React from 'react';

const ConfigPage = ({ configName }) => {
  return (
    <div className="p-6 flex flex-col items-center">
      {/* Dynamic title based on configName prop */}
      <h1 className="text-3xl font-bold mb-4">{configName} Page</h1>
      <p className="mb-8">Edit your configurations for {configName} here.</p>

      {/* Image and input fields */}
      <div className="relative">
        <img
          src="/path/to/your/image.jpg" // Replace with the correct path to your image
          alt="Config Example"
          className="w-64 h-64"
        />

        {/* Left Rotation input at the top left */}
        <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2">
          <label className="block text-white mb-1" htmlFor="leftRotation">Left Rotation</label>
          <input
            type="text"
            id="leftRotation"
            className="border border-gray-300 p-1 rounded"
            placeholder="Enter value"
          />
        </div>

        {/* Right Rotation input at the top right */}
        <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
          <label className="block text-white mb-1" htmlFor="rightRotation">Right Rotation</label>
          <input
            type="text"
            id="rightRotation"
            className="border border-gray-300 p-1 rounded"
            placeholder="Enter value"
          />
        </div>
      </div>

      {/* Increments and Dead Zone input boxes below the image */}
      <div className="mt-8 flex space-x-8">
        {/* Increments input */}
        <div>
          <label className="block text-white mb-1" htmlFor="increments">Increments</label>
          <input
            type="text"
            id="increments"
            className="border border-gray-300 p-1 rounded"
            placeholder="Enter value"
          />
        </div>

        {/* Dead Zone input */}
        <div>
          <label className="block text-white mb-1" htmlFor="deadZone">Dead Zone</label>
          <input
            type="text"
            id="deadZone"
            className="border border-gray-300 p-1 rounded"
            placeholder="Enter value"
          />
        </div>
      </div>
    </div>
  );
};

export default ConfigPage;
