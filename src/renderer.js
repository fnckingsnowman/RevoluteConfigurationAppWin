/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * For security considerations when enabling Node.js integration, visit:
 * https://electronjs.org/docs/tutorial/security
 */

import "./global.css";
import "./index.jsx";

console.log(
  '👋 This message is being logged by "renderer.js", included via webpack'
);

// Wait for the DOM to be fully loaded before accessing elements
document.addEventListener('DOMContentLoaded', () => {
  const startScanBtn = document.getElementById('startScanBtn');
  const stopScanBtn = document.getElementById('stopScanBtn');
  const resultsDiv = document.getElementById('results');

  // Ensure the elements exist before adding event listeners
  if (startScanBtn) {
    startScanBtn.addEventListener('click', () => {
      window.api.startScan();
    });
  } else {
    console.warn('startScanBtn element not found');
  }

  if (stopScanBtn) {
    stopScanBtn.addEventListener('click', () => {
      window.api.stopScan();
    });
  } else {
    console.warn('stopScanBtn element not found');
  }

  // Handle discovered devices
  if (resultsDiv) {
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
    console.warn('results element not found');
  }
});
