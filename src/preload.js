// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    startScan: () => ipcRenderer.invoke('start-scan'),
    stopScan: () => ipcRenderer.invoke('stop-scan'),
    onDeviceDiscovered: (callback) => ipcRenderer.on('device-discovered', (event, device) => callback(device))
});
