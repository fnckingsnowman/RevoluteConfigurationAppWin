// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCog, FaPlus, FaEllipsisV } from 'react-icons/fa'; // Add icons for settings, add tab, and ellipsis (dropdown)

const Sidebar = ({ configTabs, onAddTab, onDeleteTab, onRenameTab }) => {
  const [dropdownVisible, setDropdownVisible] = useState(null); // Track which tab's dropdown is visible
  const [renamingTab, setRenamingTab] = useState(null); // Track if we are renaming a tab
  const [dropdownHovering, setDropdownHovering] = useState(false); // Track if cursor is hovering over dropdown

  // Toggle the dropdown visibility for a specific tab
  const toggleDropdown = (index) => {
    setDropdownVisible(dropdownVisible === index ? null : index);
  };

  // Handle hiding the dropdown when the user stops hovering
  const handleMouseLeaveDropdown = () => {
    if (!dropdownHovering) {
      setDropdownVisible(null); // Hide dropdown if the cursor is no longer over the dropdown
    }
  };

  // Handle renaming input and form submission
  const handleRenameSubmit = (e, index) => {
    e.preventDefault();
    onRenameTab(index, e.target[0].value);
    setRenamingTab(null); // Close the renaming input after submitting
  };

  return (
    <div className="h-screen bg-gray-800 text-white w-64 flex flex-col justify-between">
      <div>
        <div className="p-6 text-2xl font-bold">
          App Title
        </div>

        {/* Example Config Tab + Dynamically Generated Tabs */}
        <nav className="flex flex-col space-y-4 mt-10">
          <Link to="/example-config" className="px-4 py-2 hover:bg-gray-700 rounded">
            Example Config
          </Link>

          {/* Dynamically generated configuration tabs */}
          {configTabs.map((tab, index) => (
            <div key={index} className="relative group">
              {renamingTab === index ? (
                // If renaming, show an input field to rename the tab
                <form onSubmit={(e) => handleRenameSubmit(e, index)} className="flex items-center">
                  <input
                    type="text"
                    defaultValue={tab}
                    className="bg-gray-900 text-white p-1 rounded"
                  />
                </form>
              ) : (
                // Normal tab display
                <div className="flex justify-between items-center hover:bg-gray-700 p-2 rounded">
                  <Link to={`/config-${index + 1}`} className="flex-1">
                    {tab}
                  </Link>

                  {/* Ellipsis icon for dropdown menu, visible on hover */}
                  <button
                    onClick={() => toggleDropdown(index)}
                    className="invisible group-hover:visible hover:bg-gray-600 rounded p-1"
                  >
                    <FaEllipsisV size={16} />
                  </button>

                  {/* Dropdown menu */}
                  {dropdownVisible === index && (
                    <div
                      className="absolute right-0 top-full mt-2 bg-gray-900 text-white rounded shadow-md w-32"
                      onMouseEnter={() => setDropdownHovering(true)}
                      onMouseLeave={() => {
                        setDropdownHovering(false);
                        handleMouseLeaveDropdown();
                      }}
                    >
                      <button
                        onClick={() => onDeleteTab(index)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-700"
                      >
                        Delete Tab
                      </button>
                      <button
                        onClick={() => setRenamingTab(index)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-700"
                      >
                        Rename Tab
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Add Tab Button and Settings Icon */}
      <div className="p-6 flex items-center justify-between">
        {/* Add Tab button */}
        <button
          onClick={onAddTab}
          className="hover:bg-gray-700 p-2 rounded inline-block"
        >
          <FaPlus size={24} />
        </button>

        {/* Settings Icon */}
        <Link to="/settings" className="hover:bg-gray-700 p-2 rounded inline-block">
          <FaCog size={24} />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
