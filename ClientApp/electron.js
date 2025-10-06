const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let backendProcess;

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // We'll create this later if needed
    },
  });

  // Load the React app.
  // In development, we'll load from the Vite dev server.
  // In production, we'll load the built index.html file.
  const startUrl = process.env.ELECTRON_START_URL || `file://${path.join(__dirname, './dist/index.html')}`;
  mainWindow.loadURL(startUrl);

  // Open the DevTools in development.
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
}

// Start the backend server when the app is ready.
app.whenReady().then(() => {
  // Path to the backend executable. This assumes a certain build structure.
  // We will adjust this in the package.json scripts.
  const backendPath = path.join(__dirname, '../Web/bin/Release/net8.0/Web');

  if (app.isPackaged) {
    backendProcess = spawn(backendPath);

    backendProcess.stdout.on('data', (data) => {
      console.log(`Backend stdout: ${data}`);
    });

    backendProcess.stderr.on('data', (data) => {
      console.error(`Backend stderr: ${data}`);
    });
  }

  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Kill the backend process when the app quits.
app.on('will-quit', () => {
  if (backendProcess) {
    backendProcess.kill();
  }
});