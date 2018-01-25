'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

let mainWindow = null;

app.on('window-all-closed', function() {
    if (process.platform != 'darwin')
      app.quit();
});

app.on('ready', function() {

  mainWindow = new BrowserWindow({width: 750, height: 675});
  mainWindow.loadURL('file://' + __dirname + '/main.html');
  Menu.setApplicationMenu(null);

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
