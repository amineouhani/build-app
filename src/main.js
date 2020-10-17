import { BrowserWindow, Menu, app } from 'electron';
import path from 'path';
const config = require('./settings.json');

app.commandLine.appendSwitch('widevine-cdm-path', path.join(__dirname, 'lib/widewine-cdm/1.4.8.903/widevinecdmadapter.plugin'));
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.903');

let mainWindow;

const menuTemplate = [{
    submenu: [{
        label: 'Reload',
        accelerator: 'Command+R',
        click: (mainWindow) => {
            if (mainWindow) {
                mainWindow.reload();
            }
        },
    }],
}];

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
const activateApp = () => {
    createWindow();
    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
};
const createWindow = () => {
    if (mainWindow) {
        mainWindow.close();
    }

    windowSettings.frame = config.allowFrame;
    mainWindow = new BrowserWindow(windowSettings);
    mainWindow.loadURL('https://messages.google.com/');
    mainWindow.webContents.on('did-finish-load', () => {});
};
app.on('ready', activateApp);