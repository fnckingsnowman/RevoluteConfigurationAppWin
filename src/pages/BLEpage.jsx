import React, { useEffect, useState } from 'react';

const BLEpage = () => {
  const [device, setDevice] = useState(null);

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

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">BLE Connect Page</h1>
      <button
        className="w-40 bg-gray-800 text-white p-2"
        onClick={() => window.api.startScan()}
      >
        Start BLE Scan
      </button>
      <button
        className="w-40 bg-gray-800 text-white p-2"
        onClick={() => window.api.stopScan()}
      >
        Stop BLE Scan
      </button>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Filtered Device:</h2>
        {device ? (
          <div>
            <p><strong>Name:</strong> {device.name}</p>
            <p><strong>UUID:</strong> {device.uuid}</p>
            <p><strong>RSSI:</strong> {device.rssi}</p>
            <p><strong>Advertised UUIDs:</strong> {device.serviceUuids.join(', ')}</p>
            <p><strong>Manufacturer Data:</strong> {device.manufacturerData}</p>
          </div>
        ) : (
          <p>No matching device found yet.</p>
        )}
      </div>
    </div>
  );
};

export default BLEpage;
