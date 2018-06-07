// require('babel-polyfill');
const electron = require('electron');
const { app, BrowserWindow, Menu, globalShortcut, ipcMain, dialog, /*autoUpdater*/ } = electron;
const path = require('path');
const Updater = require('./app/Updater')
const Spreadsheets = require('./app/Spreadsheets');

let win = null;
let forceQuit = false;

app.on('window-all-closed', () => {
    if (process.platform != 'darwin')
        app.quit();
});

app.on('ready', () => {
    let splashWin = new BrowserWindow({
        width: 256,
        height: 263,
        transparent: true,
        frame: false,
        center: true,
        show: false
    });
    splashWin.loadURL('file://' + path.join(__dirname, "./app/splash/splash.html"));
    win = new BrowserWindow({
        width: 750,
        height: 675,
        show: false
    });
    const update = async () => {
        try {
            splashWin.show();
            splashWin.webContents.send('status', 'アップデートを確認中');
            splashWin.webContents.send('all', 1);
            const update = await Updater.updateRequired();
            splashWin.webContents.send('complete');
            if (update) {
                if (Updater.downloadRequired()) {
                    splashWin.webContents.send('status', 'ダウンロード中');
                    splashWin.webContents.send('all', Updater.getDownloadAmount());
                    await Updater.download(() => splashWin.webContents.send('complete'));
                }
                if (Updater.deleteRequired()) {
                    splashWin.webContents.send('status', '不要なファイルの消去中');
                    splashWin.webContents.send('all', Updater.getDeleteAmount());
                    await Updater.delete(() => splashWin.webContents.send('complete'));
                }
            }
            splashWin.webContents.send('status', '初期化中');
            splashWin.webContents.send('all', 1);
            await Spreadsheets.init(win).then(() => splashWin.webContents.send('complete'));
            splashWin.webContents.send('allDone');
            splashWin.webContents.send('status', '準備完了');
            win.loadURL('file://' + path.join(__dirname, './app/index.html'));
        } catch (err) {
            console.error(err);
            splashWin.webContents.send('error');
            splashWin.webContents.send('status', 'エラーが発生しました');
            dialog.showMessageBox(splashWin, {
                type: 'error',
                message: 'エラーが発生しました',
                detail: err.stack,
                buttons: ['リトライ', '終了']
            }, (res) => {
                if (res === 0)
                    update();
                else
                    app.exit(1);
            });
        }
    }
    splashWin.webContents.on("did-finish-load", update);
    win.webContents.on("did-finish-load", () => {
        splashWin.close();
        splashWin = null;
        win.show();
    });

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

    const updateChecker = setInterval(async () => {
        if (await Updater.updateRequired()) {
            dialog.showMessageBox({
                type: 'info',
                buttons: ['再起動', '後で'],
                title: 'アップデートがあります'
            }, (res) => {
                if (res === 0) {
                    app.relaunch();
                    app.exit();
                }
            });
            clearInterval(updateChecker);
        }
    }, 600000);

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