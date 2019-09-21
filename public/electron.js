const {app, BrowserWindow, globalShortcut} = require('electron');

let win;

function createWindow() {
    win = new BrowserWindow({
        minWidth: 800,
        minHeight: 600,

        webPreferences: {
            nodeIntegration: true
        },
        titleBarStyle: 'hiddenInset',
        show: false
    });

    win.selfOptions = {
        shouldQuit: false
    };

    // win.loadFile("index.html");
    win.loadURL("https://bytedance.feishu.cn/space/doc/doccnDGJ0NSnDs5KTL4pLsbIiTg")

    win.once('ready-to-show', () => {
        win.show()
    });

    // win.webContents.openDevTools();

    win.on('close', (event) => {
        if (!win.selfOptions.shouldQuit) {
            console.log("windows close");
            win.hide();
            event.preventDefault()
        } else {
            console.log("windows quit")
        }

    });

    win.on('closed', () => {

    })
}

function switchWindow() {
    if (win.isVisible()) {
        win.hide()
    } else {
        win.show();
        app.focus()
    }
}

app.on('ready', () => {
    globalShortcut.register('CommandOrControl+Shift+O', () => {
        if (win == null) {
            createWindow()
        }
        switchWindow()
    })
});


app.on('ready', createWindow);

app.on('window-all-closed', () => {
    console.log("window-all-closed");
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (win == null) {
        createWindow()
    }
});

app.on('will-quit', () => {
    console.log("will-quit");
    // 注销快捷键
    globalShortcut.unregister('CommandOrControl+Shift+O');

    // 注销所有快捷键
    globalShortcut.unregisterAll();
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('before-quit', () => {
    win.selfOptions.shouldQuit = true
});

app.on('quit', () => {
    win = null;
    app.quit()
});