// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaCog } from 'react-icons/fa'; // Font Awesome Gear Icon

const Sidebar = () => {
  return (
    <div className="h-screen bg-gray-800 text-white w-64 flex flex-col justify-between">
      <div>
        <div className="p-6 text-2xl font-bold">
          App Title
        </div>
        <nav className="flex flex-col space-y-4 mt-10">
          <Link to="/example-config" className="px-4 py-2 hover:bg-gray-700 rounded">
            Example Config
          </Link>
        </nav>
      </div>

      {/* Settings icon at the bottom */}
      <div className="p-6">
        <Link to="/settings" className="hover:bg-gray-700 p-2 rounded inline-block">
          <FaCog size={24} />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
