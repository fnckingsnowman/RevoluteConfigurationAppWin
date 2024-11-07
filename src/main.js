const { app, Tray, BrowserWindow, shell, ipcMain } = require("electron");
const path = require("path");
const noble = require('@abandonware/noble');
/*
const noble = require('@abandonware/noble');
// The advertising UUID to scan for
const TARGET_ADVERTISING_NAME = 'Revolute';
// The service UUID to look for after connecting
const TARGET_SERVICE_UUID = '00000000000000000000003323de1223';
const PERIPHERAL_UUID = 'd02894667120';
let scanning = false;
*/

let scanning = false;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: "public/icons/favicon.ico",
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      devTools: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });
};


app.on("ready", createWindow);

app.whenReady().then(() => {
  //createWindow();

  ipcMain.handle('start-scan', () => {
      if (!scanning) {
          scanning = true;
          noble.startScanning();
          console.log('Started scanning for BLE devices.');
      }
  });

  ipcMain.handle('stop-scan', () => {
      if (scanning) {
          noble.stopScanning();
          scanning = false;
          console.log('Stopped scanning for BLE devices.');
      }
  });

  const discoveredDevices = new Map();

  noble.on('stateChange', state => {
      if (state === 'poweredOn') {
          if (scanning) {
              noble.startScanning();
          }
      } else {
          noble.stopScanning();
      }
  });

  noble.on('discover', async peripheral => {
      let deviceInfo = {
          name: peripheral.advertisement.localName || 'Unnamed device',
          uuid: peripheral.uuid,
          rssi: peripheral.rssi,
          services: []
      };

      // Check if device is already in the list
      if (discoveredDevices.has(peripheral.uuid)) {
          return; // Device already processed
      }

      discoveredDevices.set(peripheral.uuid, deviceInfo);

      try {
          await peripheral.connectAsync();
          const services = await peripheral.discoverServicesAsync();
          for (const service of services) {
              let serviceInfo = {
                  uuid: service.uuid,
                  characteristics: []
              };

              const characteristics = await service.discoverCharacteristicsAsync();
              for (const characteristic of characteristics) {
                  serviceInfo.characteristics.push(characteristic.uuid);
              }

              deviceInfo.services.push(serviceInfo);
          }

          await peripheral.disconnectAsync();
      } catch (error) {
          deviceInfo.error = error.message;
      }

      // Notify renderer process about new device
      BrowserWindow.getAllWindows().forEach(win => {
          win.webContents.send('device-discovered', deviceInfo);
      });
  });
});

/*
let tray = null;

app.whenReady().then(() => {

  //favicon for system tray
  tray = new Tray(path.join(__dirname, 'public/icons/favicon.ico'));
  const contextMenu = Menu.buildFromTemplate([
      { label: 'Quit', click: () => { app.quit(); } }
  ]);
  tray.setContextMenu(contextMenu);
  tray.setToolTip('Revolute config');

  //createWindow();

  app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
          //createWindow();
      }
  });
});
*/


app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {

  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
