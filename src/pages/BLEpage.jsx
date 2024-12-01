import React, { useEffect, useState } from 'react';

const BLEpage = () => {
  const [device, setDevice] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('');

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

  // Handle device connection
  const connectToDevice = async () => {
    if (!device) return;
    setIsConnecting(true);
    setConnectionStatus('Connecting...');

    try {
      await window.api.connectToDevice(device.uuid); // Assuming you implement this API in your backend
      setConnectionStatus('Connected');
    } catch (error) {
      console.error('Connection failed:', error);
      setConnectionStatus('Connection failed');
    } finally {
      setIsConnecting(false);
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
            <div className="flex flex-col">
              <h3 className="text-lg font-bold mb-2">{device.name || 'Unnamed Device'}</h3>
              <p className="text-sm text-white"><strong>UUID:</strong> {device.uuid}</p>
              <p className="text-sm text-white"><strong>RSSI:</strong> {device.rssi}</p>
              <p className="text-sm text-white">
                <strong>Advertised UUIDs:</strong>{' '}
                {device.serviceUuids?.length ? device.serviceUuids.join(', ') : 'None'}
              </p>
              <p className="text-sm text-white"><strong>Manufacturer Data:</strong> {device.manufacturerData || 'None'}</p>

              {/* Connection Status and Button */}
              <div className="mt-4">
                {connectionStatus && (
                  <p className="text-sm text-yellow-200">{connectionStatus}</p>
                )}
                <button
                  onClick={connectToDevice}
                  className="mt-2 w-32 bg-green-600 text-white p-2 rounded-lg shadow hover:bg-green-500 transition"
                  disabled={isConnecting}
                >
                  {isConnecting ? 'Connecting...' : 'Connect'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-400">No matching device found yet.</p>
        )}
      </div>
    </div>
  );
};

export default BLEpage;
