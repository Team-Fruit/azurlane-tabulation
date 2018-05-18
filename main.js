const electron = require('electron');
const { app, BrowserWindow, Menu } = electron;
const Spreadsheet = require('./app/Spreadsheets');

let win = null;
let forceQuit = false;

app.on('window-all-closed', function () {
    if (process.platform != 'darwin')
        app.quit();
});

app.on('ready', function () {
    win = new BrowserWindow({ width: 750, height: 675 });
    win.loadURL('file://' + __dirname + '/app/index.html');
    Menu.setApplicationMenu(null);
    Spreadsheet.init(win);

    win.on('close', function (e) {
        if (forceQuit || process.platform != 'darwin') {
            win = null;
        } else {
            e.preventDefault();
            win.hide();
        }
    });
});

app.on('before-quit', function () {
    forceQuit = true;
});

app.on('activate', function () {
    win.show();
});

