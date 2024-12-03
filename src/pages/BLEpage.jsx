import React, { useEffect, useState } from 'react';

const BLEpage = () => {
  const [device, setDevice] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Handle incoming device info
    const handleDeviceDiscovered = (deviceInfo) => {
      console.log('Device discovered:', deviceInfo);
      setDevice(deviceInfo); // Set the state to display the device info
    };

    // Register for the device-discovered event
    window.api.onDeviceDiscovered(handleDeviceDiscovered);

    // Cleanup when the component unmounts
    return () => {
      window.api.onDeviceDiscovered(() => {}); // Removing the event listener
    };
  }, []);

  const handleConnect = async () => {
    if (!device) return;
    try {
      console.log('Attempting to connect to device:', device);
      const connected = await window.api.connectToDevice(device.uuid); // Replace with your backend logic
      if (connected) {
        setIsConnected(true);
        console.log('Connected to device');
      }
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  const handleDisconnect = async () => {
    if (!device) return;
    try {
      console.log('Attempting to disconnect from device:', device);
      const disconnected = await window.api.disconnectFromDevice(device.uuid); // Replace with your backend logic
      if (disconnected) {
        setIsConnected(false);
        console.log('Disconnected from device');
      }
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-slate-600">
      <h1 className="text-3xl text-white font-bold mb-6">Bluetooth Connect Page</h1>
      <div className="flex gap-3 mb-6">
        <button
          className="w-40 bg-gray-800 text-white p-2 rounded-lg shadow hover:bg-gray-500 transition"
          onClick={() => window.api.startScan()}
        >
          Start BLE Scan
        </button>
        <button
          className="w-40 bg-gray-800 text-white p-2 rounded-lg shadow hover:bg-gray-500 transition"
          onClick={() => window.api.stopScan()}
        >
          Stop BLE Scan
        </button>
      </div>

      <div className="mt-4">
        <h2 className="text-xl text-white font-semibold mb-4">Filtered Device:</h2>
        {device ? (
          <div className="flex items-center text-white p-4 bg-slate-500 rounded-lg shadow-md border border-gray-500">
            {/* Device Image */}
            <img
              src="public/images/B1.png" // Replace with the actual image path
              alt="Device"
              className="w-20 h-20 object-cover rounded-lg mr-4"
            />
            {/* Device Information */}
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2">{device.name || 'Unnamed Device'}</h3>
              <p className="text-sm text-white"><strong>UUID:</strong> {device.uuid}</p>
              <p className="text-sm text-white"><strong>RSSI:</strong> {device.rssi}</p>
              <p className="text-sm text-white">
                <strong>Advertised UUIDs:</strong>{' '}
                {device.serviceUuids?.length ? device.serviceUuids.join(', ') : 'None'}
              </p>
              <p className="text-sm text-white"><strong>Manufacturer Data:</strong> {device.manufacturerData || 'None'}</p>
            </div>
            {/* Connect/Disconnect Button */}
            <button
              className={`ml-4 px-4 py-2 rounded-lg text-white ${
                isConnected ? 'bg-red-600 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-500'
              }`}
              onClick={isConnected ? handleDisconnect : handleConnect}
            >
              {isConnected ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        ) : (
          <p className="text-gray-400">No matching device found yet.</p>
        )}
      </div>
    </div>
  );
};

export default BLEpage;
