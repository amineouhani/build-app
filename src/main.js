import { BrowserWindow, app } from 'electron';
const config = require('./settings.json');

let mainWindow;

const windowSettings = {
    width: config.width,
    height: config.height,
    backgroundColor: config.backgroundColor,
    useContentSize: config.contentSize,
    resizable: config.resizable,
    center: config.isCenter,
    alwaysOnTop: config.alwaysTop,
    frame: config.frame,
    title: config.title,
    webPreferences: {
        nodeIntegration: config.nodeIntegration,
        plugins: config.usePlugin,
        thickFrame: config.thickFrame
    },
};
const onWindow = () => {
    createWindow();
};
const createWindow = () => {
    if (mainWindow) {
        mainWindow.close();
    }

    windowSettings.frame = config.allowFrame;
    mainWindow = new BrowserWindow(windowSettings);
    switch (config.multipleBuild) {
        case "Message":
            mainWindow.loadURL('https://messages.google.com/');
            break;
        case "Instagram":
            mainWindow.loadURL('https://www.instagram.com/');
            break;
        case "Linkedin":
            mainWindow.loadURL('https://linkedin.com/');
            break;
    }
    mainWindow.webContents.on('did-finish-load', () => {});
};
app.on('ready', onWindow);