const { app, BrowserWindow, ipcMain, Menu, screen } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');

const pkg = require('./package.json');
const APP_VERSION = pkg.version;

app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

if (process.platform === 'win32') {
    app.setAppUserModelId('com.xeldaralz.vortexsms');
}

let mainWindow;

function createWindow() {
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize;
    
    const windowWidth = 1000;
    const windowHeight = 800;
    const x = Math.floor((screenWidth - windowWidth) / 2);
    const y = Math.floor((screenHeight - windowHeight) / 2);

    mainWindow = new BrowserWindow({
        width: windowWidth,
        height: windowHeight,
        x: x,
        y: y,
        minWidth: 900,
        minHeight: 700,
        backgroundColor: '#0a0a0a',
        icon: path.join(__dirname, 'assets', process.platform === 'win32' ? 'icon.ico' : 'icon.png'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#0a0a0a',
            symbolColor: '#00ff88',
            height: 32
        },
        frame: false,
        transparent: false,
        show: false
    });

    Menu.setApplicationMenu(null);
    mainWindow.loadFile('index.html');

    let windowShown = false;
    const showWindow = () => {
        if (!windowShown && mainWindow && !mainWindow.isDestroyed()) {
            windowShown = true;
            mainWindow.show();
            mainWindow.focus();
            
            const displays = screen.getAllDisplays();
            const windowBounds = mainWindow.getBounds();
            const isOnVisibleDisplay = displays.some(display => {
                const { x, y, width, height } = display.bounds;
                return !(windowBounds.x + windowBounds.width < x || 
                        windowBounds.x > x + width ||
                        windowBounds.y + windowBounds.height < y ||
                        windowBounds.y > y + height);
            });
            
            if (!isOnVisibleDisplay) {
                const primaryDisplay = screen.getPrimaryDisplay();
                const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize;
                const newX = Math.floor((screenWidth - windowBounds.width) / 2);
                const newY = Math.floor((screenHeight - windowBounds.height) / 2);
                mainWindow.setPosition(newX, newY);
            }
        }
    };

    mainWindow.once('ready-to-show', showWindow);
    setTimeout(showWindow, 3000);

    if (process.argv.includes('--dev')) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(() => {
    createWindow();
    initUpdater();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.handle('minimize-window', () => mainWindow?.minimize());
ipcMain.handle('maximize-window', () => {
    if (mainWindow?.isMaximized()) {
        mainWindow.unmaximize();
    } else {
        mainWindow?.maximize();
    }
});
ipcMain.handle('close-window', () => mainWindow?.close());
ipcMain.handle('is-maximized', () => mainWindow?.isMaximized() ?? false);

const { faker } = require('@faker-js/faker');
global.faker = faker;

const bomber = require('./src/core/bomber');

ipcMain.handle('start-bombing', async (event, { phone, amount, delay }) => {
    return await bomber(phone, amount, delay, (log) => {
        mainWindow?.webContents.send('bombing-log', log);
    });
});

ipcMain.handle('get-service-stats', () => bomber.getServiceStats());
ipcMain.handle('get-version', () => APP_VERSION);

function initUpdater() {
    if (process.argv.includes('--dev')) {
        console.log('Dev mode: AutoUpdater disabled');
        return;
    }

    autoUpdater.autoDownload = false;
    autoUpdater.autoInstallOnAppQuit = true;

    setTimeout(() => {
        autoUpdater.checkForUpdates().catch(() => {
            console.log('Auto-update check failed (releases may not exist)');
        });
    }, 3000);

    autoUpdater.on('checking-for-update', () => {
        mainWindow?.webContents.send('update-status', { status: 'checking' });
    });

    autoUpdater.on('update-available', (info) => {
        mainWindow?.webContents.send('update-status', {
            status: 'available',
            version: info.version
        });
    });

    autoUpdater.on('update-not-available', () => {
        mainWindow?.webContents.send('update-status', { status: 'not-available' });
    });

    autoUpdater.on('error', (err) => {
        const errorMsg = err.message || '';
        
        if (errorMsg.includes('404') || errorMsg.includes('Not Found') || errorMsg.includes('ENOENT')) {
            console.log('No releases found on GitHub');
            mainWindow?.webContents.send('update-status', { status: 'not-available' });
            return;
        }
        
        let errorMessage = 'Unknown error occurred';
        if (errorMsg.includes('network') || errorMsg.includes('ENOTFOUND') || errorMsg.includes('ECONNREFUSED')) {
            errorMessage = 'Network error: Please check your internet connection';
        } else if (errorMsg.includes('rate limit') || errorMsg.includes('403')) {
            errorMessage = 'GitHub rate limit exceeded. Please try again later';
        } else if (errorMsg) {
            errorMessage = errorMsg;
        }
        
        mainWindow?.webContents.send('update-status', {
            status: 'error',
            error: errorMessage
        });
    });

    autoUpdater.on('download-progress', (progressObj) => {
        mainWindow?.webContents.send('update-progress', {
            percent: progressObj.percent,
            transferred: progressObj.transferred,
            total: progressObj.total
        });
    });

    autoUpdater.on('update-downloaded', () => {
        mainWindow?.webContents.send('update-status', { status: 'downloaded' });
    });
}

ipcMain.handle('check-for-updates', async () => {
    if (process.argv.includes('--dev')) {
        return { status: 'dev-mode' };
    }
    
    try {
        return await autoUpdater.checkForUpdates();
    } catch (error) {
        mainWindow?.webContents.send('update-status', {
            status: 'error',
            error: error.message || 'Failed to check for updates'
        });
        throw error;
    }
});

ipcMain.handle('download-update', async () => {
    if (process.argv.includes('--dev')) {
        return { status: 'dev-mode' };
    }
    
    try {
        return await autoUpdater.downloadUpdate();
    } catch (error) {
        mainWindow?.webContents.send('update-status', {
            status: 'error',
            error: error.message || 'Failed to download update'
        });
        throw error;
    }
});

ipcMain.handle('quit-and-install', () => {
    autoUpdater.quitAndInstall(false, true);
});
