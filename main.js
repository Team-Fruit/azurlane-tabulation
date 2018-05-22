require('babel-polyfill');
const electron = require('electron');
const { app, BrowserWindow, Menu, globalShortcut } = electron;
const path = require('path');
const Spreadsheets = require('./app/Spreadsheets');
const Splashscreen = require('@trodi/electron-splashscreen');

let win = null;
let forceQuit = false;

app.on('window-all-closed', function () {
    if (process.platform != 'darwin')
        app.quit();
});

app.on('ready', function () {
    win = Splashscreen.initSplashScreen({
        windowOpts: { width: 750, height: 675 },
        templateUrl: path.join(__dirname, "../resources/icon.png"),
        delay: 0,
        minVisible: 1500,
        splashScreenOpts: {
            height: 256,
            width: 256,
            transparent: true,
        },
    });

    win.loadURL('file://' + path.join(__dirname, '../app/index.html'));
    Menu.setApplicationMenu(null);
    Spreadsheets.init(win);

    win.on('close', function (e) {
        if (forceQuit || process.platform != 'darwin') {
            win = null;
        } else {
            e.preventDefault();
            win.hide();
        }
    });

    globalShortcut.register(process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I', () => {
        win.toggleDevTools();
    });
});

app.on('before-quit', function () {
    forceQuit = true;
});

app.on('activate', function () {
    win.show();
});

