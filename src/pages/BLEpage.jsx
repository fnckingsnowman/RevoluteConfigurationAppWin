import React, { useEffect } from 'react';

const BLEpage = () => {
  useEffect(() => {
    // Add event listeners for BLE scan buttons
    const startScanBtn = document.getElementById('startScanBtn');
    const stopScanBtn = document.getElementById('stopScanBtn');
    const resultsDiv = document.getElementById('results');

    if (startScanBtn) {
      startScanBtn.addEventListener('click', () => {
        console.log('Starting BLE scan...');
        window.api.startScan();
      });
    } else {
      console.warn('startScanBtn not found in BLEpage');
    }

    if (stopScanBtn) {
      stopScanBtn.addEventListener('click', () => {
        console.log('Stopping BLE scan...');
        window.api.stopScan();
      });
    } else {
      console.warn('stopScanBtn not found in BLEpage');
    }

    if (window.api && resultsDiv) {
      window.api.onDeviceDiscovered(device => {
        const deviceHTML = `
          <div>
            <h2>${device.name}</h2>
            <p>UUID: ${device.uuid}</p>
            <p>RSSI: ${device.rssi}</p>
            <h3>Services:</h3>
            <ul>
              ${device.services.map(service => `
                <li>
                  <strong>Service UUID:</strong> ${service.uuid}
                  <ul>
                    ${service.characteristics.map(char => `<li>Characteristic UUID: ${char}</li>`).join('')}
                  </ul>
                </li>
              `).join('')}
            </ul>
          </div>
        `;
        resultsDiv.insertAdjacentHTML('beforeend', deviceHTML);
      });
    } else {
      console.warn('resultsDiv or window.api not available in BLEpage');
    }

    // Cleanup event listeners on unmount
    return () => {
      if (startScanBtn) {
        startScanBtn.removeEventListener('click', () => window.api.startScan());
      }
      if (stopScanBtn) {
        stopScanBtn.removeEventListener('click', () => window.api.stopScan());
      }
    };
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">BLE Connect Page</h1>
      <button className="w-40 bg-gray-800 text-white p-2" id="startScanBtn">
        Start BLE Scan
      </button>
      <button className="w-40 bg-gray-800 text-white p-2" id="stopScanBtn">
        Stop BLE Scan
      </button>
      <div id="results"></div>
    </div>
  );
};

export default BLEpage;
