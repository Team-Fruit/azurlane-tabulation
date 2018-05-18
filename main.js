const electron = require('electron');
const { app, BrowserWindow, Menu } = electron;
const Spreadsheet = require('./app/Spreadsheets');

let win = null;
let forceQuit = false;

app.on('window-all-closed', function () {
    if (process.platform != 'darwin')
        app.quit();
});

app.on('will-quit', function () {
    win = null;
});

app.on('ready', function () {
    win = new BrowserWindow({ width: 750, height: 675 });
    win.loadURL('file://' + __dirname + '/app/index.html');
    Menu.setApplicationMenu(null);
    Spreadsheet.init(win);

    win.on('unresponsive', function () {
        const options = {
            type: 'info',
            title: '応答なし',
            message: 'プロセスの応答がありません。',
            buttons: ['再読み込み', '閉じる']
        };
        dialog.showMessageBox(options, function (index) {
            if (index === 0)
                win.reload();
            else
                win.close();
        });
    });

    win.webContents.on('crashed', function () {
        const options = {
            type: 'info',
            title: 'クラッシュ',
            message: 'プロセスがクラッシュしました。申し訳ありません。',
            buttons: ['再読み込み', '閉じる']
        };
        dialog.showMessageBox(options, function (index) {
            if (index === 0)
                win.reload();
            else
                win.close();
        });
    });

    win.on('close', function (e) {
        if (!forceQuit) {
            e.preventDefault();
            win.hide();
        }
    });
});

app.on('before-quit', function () {
    forceQuit = true;
});

app.on('activate', function () {
    console.log('activate');
    win.show();
});

