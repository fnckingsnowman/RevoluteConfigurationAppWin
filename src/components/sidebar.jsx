// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCog, FaPlus } from 'react-icons/fa';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemType = 'CONFIG_TAB';

const Sidebar = ({ configTabs, onAddTab, onDeleteTab, onRenameTab, onReorderTabs }) => {
  const [contextMenu, setContextMenu] = useState(null);
  const [renamingTab, setRenamingTab] = useState(null);

  const handleRightClick = (e, index) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, index });
  };

  const handleRenameSubmit = (e, index) => {
    e.preventDefault();
    onRenameTab(index, e.target[0].value);
    setRenamingTab(null);
  };

  const handleClickOutside = (e) => {
    if (contextMenu || renamingTab !== null) {
      setContextMenu(null);
      setRenamingTab(null);
    }
  };

  const moveTab = (dragIndex, hoverIndex) => {
    const reorderedTabs = [...configTabs];
    const [draggedTab] = reorderedTabs.splice(dragIndex, 1);
    reorderedTabs.splice(hoverIndex, 0, draggedTab);
    onReorderTabs(reorderedTabs);
  };

  const Tab = ({ tab, index }) => {
    const [{ isDragging }, drag] = useDrag({
      type: ItemType,
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const [, drop] = useDrop({
      accept: ItemType,
      hover: (item) => {
        if (item.index !== index) {
          moveTab(item.index, index);
          item.index = index;
        }
      },
    });

    return (
      <div
        ref={(node) => drag(drop(node))}
        onContextMenu={(e) => handleRightClick(e, index)}
        className={`flex justify-between items-center hover:bg-gray-700 px-4 py-2 rounded cursor-pointer mb-2 ${ // Added mb-2 for extra space
          isDragging ? 'opacity-50' : ''
        }`}
      >
        <Link to={`/config-${index + 1}`} className="flex-1">
          {tab}
        </Link>
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div onClick={handleClickOutside} className="h-screen bg-gray-800 text-white w-64 flex flex-col justify-between relative">
        <div>
          <div className="p-6 text-2xl font-bold">Revolute Configuration</div>

          <nav className="flex flex-col space-y-4 px-4">
            <Link to="/discover" className="px-4 py-2 hover:bg-gray-700 rounded">
              Discover
            </Link>
            <Link to="/panel" className="px-4 py-2 hover:bg-gray-700 rounded">
              Surface Dial Panel
            </Link>

            <hr className="border-t border-gray-400 my-4 mx-4" />

            <div className="overflow-y-auto max-h-[calc(100vh-21rem)] ">
              {configTabs.map((tab, index) => (
                <div key={index} className="relative group">
                  {renamingTab === index ? (
                    <form
                      onSubmit={(e) => handleRenameSubmit(e, index)}
                      className="flex items-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="text"
                        defaultValue={tab}
                        className="bg-gray-900 text-white p-1 rounded"
                        autoFocus
                      />
                    </form>
                  ) : (
                    <Tab tab={tab} index={index} />
                  )}
                </div>
              ))}
            </div>
          </nav>
        </div>

        <div className="p-6 flex items-center justify-between">
          <button onClick={onAddTab} className="hover:bg-gray-700 p-2 rounded inline-block">
            <FaPlus size={24} />
          </button>

          <Link to="/settings" className="hover:bg-gray-700 p-2 rounded inline-block">
            <FaCog size={24} />
          </Link>
        </div>

        {contextMenu && (
          <div
            style={{ top: contextMenu.y, left: contextMenu.x }}
            className="absolute bg-gray-900 text-white rounded shadow-md w-32 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                onDeleteTab(contextMenu.index);
                setContextMenu(null);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-700"
            >
              Delete Tab
            </button>
            <button
              onClick={() => {
                setRenamingTab(contextMenu.index);
                setContextMenu(null);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-700"
            >
              Rename Tab
            </button>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default Sidebar;
