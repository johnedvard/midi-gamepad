const { app, BrowserWindow } = require("electron");
const midiServer = require("./midiServer/index");

const createWindow = () => {
  midiServer.initMidiInterface();
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile("dist/midi-gamepad/index.html");
};

app.whenReady().then(() => {
  createWindow();
});
