const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

let win = null;

app.on('window-all-closed', function () {
    if (process.platform != 'darwin')
        app.quit();
});

app.on('ready', function () {
    win = new BrowserWindow({ width: 750, height: 675 });
    win.loadURL('file://' + __dirname + '/app/index.html');
    win.webContents.openDevTools()
    Menu.setApplicationMenu(null);

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

    win.on('closed', function () {
        win = null;
    });
});

