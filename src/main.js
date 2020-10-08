import { BrowserWindow, Menu, app } from 'electron';
import path from 'path';
const support = require('./supportOS.json');

app.commandLine.appendSwitch('widevine-cdm-path', path.join(__dirname, 'lib/widewine-cdm/1.4.8.903/widevinecdmadapter.plugin'));
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.903');

let mainWindow;

const menuTemplate = [{
    label: 'Message',
    submenu: [{
        label: 'About Application',
        role: 'about',
    }, {
        type: 'separator',
    }, {
        label: 'Hide Message',
        accelerator: 'Command+H',
        role: 'hide',
    }, {
        label: 'Quit Message',
        accelerator: 'Command+Q',
        role: 'quit',
    }],
}, {
    label: 'Edit',
    submenu: [{
        label: 'Undo',
        accelerator: 'Command+Z',
        role: 'undo',
    }, {
        label: 'Redo',
        accelerator: 'Command+Y',
        role: 'redo',
    }, {
        type: 'separator',
    }, {
        label: 'Cut',
        accelerator: 'Command+X',
        role: 'cut',
    }, {
        label: 'Copy',
        accelerator: 'Command+C',
        role: 'copy',
    }, {
        label: 'Paste',
        accelerator: 'Command+V',
        role: 'paste',
    }, {
        label: 'Select All',
        accelerator: 'Command+A',
        role: 'selectall',
    }],
}, {
    label: 'View',
    submenu: [{
        label: 'Reload',
        accelerator: 'Command+R',
        click: (menuItem, mainWindow) => {
            if (mainWindow) {
                mainWindow.reload();
            }
        },
    }],
}, {
    label: 'Window',
    submenu: [{
        label: 'Zoom',
        role: 'zoom',
    }, {
        label: 'Minimize',
        accelerator: 'Command+M',
        role: 'minimize',
    }]
}];

const windowSettings = {
    width: 700,
    height: 500,
    backgroundColor: '#FFF',
    useContentSize: false,
    resizable: true,
    center: true,
    alwaysOnTop: false,
    frame: true,
    title: 'Messages',
    webPreferences: {
        nodeIntegration: false,
        plugins: true,
        thickFrame: true
    },
};
const activateApp = () => {
    createFramelessWindow();
    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
};
const createFramelessWindow = () => {
    if (mainWindow) {
        mainWindow.close();
    }

    windowSettings.frame = true;
    mainWindow = new BrowserWindow(windowSettings);
    mainWindow.loadURL('https://messages.google.com/');
    mainWindow.webContents.on('did-finish-load', () => {});
};
app.on('ready', activateApp);