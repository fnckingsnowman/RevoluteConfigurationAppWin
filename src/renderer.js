/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import "./global.css";
import "./index.jsx";

console.log(
  '👋 This message is being logged by "renderer.js", included via webpack'
);

document.getElementById('startScanBtn').addEventListener('click', () => {
  window.api.startScan();
});

document.getElementById('stopScanBtn').addEventListener('click', () => {
  window.api.stopScan();
});

window.api.onDeviceDiscovered(device => {
  const resultsDiv = document.getElementById('results');
  let deviceHTML = `
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
