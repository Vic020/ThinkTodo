const {app, BrowserWindow, globalShortcut} = require('electron');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        titleBarStyle: 'hiddenInset',
        show: false
    });

    win.loadFile("index.html");

    win.once('ready-to-show', () => {
        win.show()
    });

    win.webContents.openDevTools();

    win.on('close', (event) => {
        console.log("windows close");
        win.hide();
        win.setSkipTaskbar(true);
        event.preventDefault();
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
    if (process.platform != 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (win == null) {
        createWindow()
    }
});

app.on('will-quit', () => {
    // 注销快捷键
    globalShortcut.unregister('CommandOrControl+Shift+O');

    // 注销所有快捷键
    globalShortcut.unregisterAll()
});

app.on('quit', () => {
    app.quit()
});