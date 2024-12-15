const { app, BrowserWindow, ipcMain, shell } = require("electron");
const path = require("path");
const noble = require('@abandonware/noble');

// The target 128-bit advertising UUID to scan for
const TARGET_ADVERTISING_UUID = '000015231212efde1523785feabcd133';

let connectedPeripheral = null;

let scanning = false;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
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
  ipcMain.handle('start-scan', () => {
    if (!scanning) {
      scanning = true;
      noble.startScanning([TARGET_ADVERTISING_UUID], false);  // Scan for the specific 128-bit UUID
      console.log('Started scanning for BLE devices with target UUID:', TARGET_ADVERTISING_UUID);
    }
  });

  ipcMain.handle('stop-scan', () => {
    if (scanning) {
      noble.stopScanning();
      scanning = false;
      console.log('Stopped scanning for BLE devices.');
    }
  });

  ipcMain.handle('connect-to-device', async (event, uuid) => {
    console.log(`Attempting to connect to device with UUID: ${uuid}`);
    try {
      const peripheral = noble._peripherals[uuid];
      if (!peripheral) {
        throw new Error('Peripheral not found');
      }
  
      // Use connectAsync to trigger connection and potential pairing
      await peripheral.connectAsync();
      console.log(`Connected to device: ${uuid}`);
  
      // Optional: Discover services to validate the connection further
      const services = await peripheral.discoverServicesAsync();
      console.log(`Discovered services for ${uuid}:`, services.map((s) => s.uuid));
  
      connectedPeripheral = peripheral;
      return true; // Indicate success
    } catch (error) {
      console.error('Failed to connect to device:', error);
      return false; // Indicate failure
    }
  });
  

  ipcMain.handle('disconnect-from-device', async (event, uuid) => {
    console.log(`Attempting to disconnect from device with UUID: ${uuid}`);
    try {
      if (!connectedPeripheral || connectedPeripheral.uuid !== uuid) {
        throw new Error('No connected peripheral matches the UUID');
      }
  
      await connectedPeripheral.disconnectAsync();
      console.log(`Disconnected from device: ${uuid}`);
      connectedPeripheral = null;
      return true; // Indicate success
    } catch (error) {
      console.error('Failed to disconnect from device:', error);
      return false; // Indicate failure
    }
  });
  

  noble.on('stateChange', state => {
    if (state === 'poweredOn') {
      if (scanning) {
        noble.startScanning([TARGET_ADVERTISING_UUID], false);  // Re-initiating scan if powered on
      }
    } else {
      noble.stopScanning();
    }
  });

  noble.on('discover', async peripheral => {
    const { advertisement } = peripheral;

    // Log the raw advertisement data and UUIDs
    console.log('Discovered Peripheral:', peripheral.uuid);
    console.log('Advertisement Data:', advertisement);

    // Check if the device has the target advertising UUID
    let matchFound = false;
    if (advertisement.serviceUuids) {
      advertisement.serviceUuids.forEach((uuid) => {
        console.log('Checking UUID:', uuid);

        // Compare UUIDs (make sure we check the correct 128-bit UUID)
        if (uuid.toLowerCase() === TARGET_ADVERTISING_UUID.toLowerCase()) {
          console.log('Device matches the target advertising UUID:', uuid);
          matchFound = true;
        }
      });
    }

    // If the device doesn't match, return
    if (!matchFound) {
      console.log('Device does not have the target advertising UUID.');
      return;
    }

    // Device has the target UUID; send relevant data to renderer
    const deviceInfo = {
      name: advertisement.localName || 'Unnamed device',
      uuid: peripheral.uuid,
      rssi: peripheral.rssi,
      serviceUuids: advertisement.serviceUuids,
      manufacturerData: advertisement.manufacturerData?.toString('hex') || 'None',
    };

    // Log the discovered device info
    console.log('Discovered Device:', deviceInfo);

    // Send the device info to the renderer process
    BrowserWindow.getAllWindows().forEach((win) => {
      win.webContents.send('device-discovered', deviceInfo);
    });
  });
});

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
