// require('babel-polyfill');
const electron = require('electron');
const { app, BrowserWindow, Menu, globalShortcut, /*autoUpdater,*/ dialog } = electron;
const path = require('path');
const Spreadsheets = require('./app/Spreadsheets');
const Splashscreen = require('@trodi/electron-splashscreen');

let win = null;
let forceQuit = false;

app.on('window-all-closed', () => {
    if (process.platform != 'darwin')
        app.quit();
});

app.on('ready', () => {
    win = Splashscreen.initSplashScreen({
        windowOpts: { width: 750, height: 675 },
        templateUrl: path.join(__dirname, "./resources/icon.svg"),
        delay: 0,
        minVisible: 1500,
        splashScreenOpts: {
            width: 256,
            height: 256,
            transparent: true
        },
    });

    win.loadURL('file://' + path.join(__dirname, './app/index.html'));
    const template = [
        {
            label: 'Application',
            submenu: [
                {
                    role: 'about'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'quit'
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {
                    role: 'undo',
                },
                {
                    role: 'redo',
                },
                {
                    type: 'separator'
                },
                {
                    role: 'cut'
                },
                {
                    role: 'copy'
                },
                {
                    role: 'paste'
                }
            ]
        }
    ];
    Menu.setApplicationMenu(Menu.buildFromTemplate(template));

    win.on('close', (e) => {
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

    Spreadsheets.init(win);

    // const server = 'https://hazel-server-ezczncogdc.now.sh';
    // const feed = `${server}/update/${process.platform}/${app.getVersion()}`;
    // autoUpdater.setFeedURL(feed)
    // autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    //     const dialogOpts = {
    //         type: 'info',
    //         buttons: ['Restart', 'Later'],
    //         title: 'Application Update',
    //         message: process.platform === 'win32' ? releaseNotes : releaseName,
    //         detail: 'A new version has been downloaded. Restart the application to apply the updates.'
    //     };

    //     dialog.showMessageBox(dialogOpts, (response) => {
    //         if (response === 0)
    //             autoUpdater.quitAndInstall();
    //     })
    // });
    // autoUpdater.on('error', (message) => {
    //     console.error('There was a problem updating the application');
    //     console.error(message);
    // });
    // autoUpdater.on('checking-for-update', () => {
    //     console.log('checking-for-update');
    // });
    // setInterval((function callback() {
    //     autoUpdater.checkForUpdates();
    //     return callback;
    // }()), 600000);
});

app.on('before-quit', () => {
    forceQuit = true;
});

app.on('activate', () => {
    win.show();
});