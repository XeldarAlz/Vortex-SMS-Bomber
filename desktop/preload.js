const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
    maximizeWindow: () => ipcRenderer.invoke('maximize-window'),
    closeWindow: () => ipcRenderer.invoke('close-window'),
    isMaximized: () => ipcRenderer.invoke('is-maximized'),

    startBombing: (phone, amount, delay) => 
        ipcRenderer.invoke('start-bombing', { phone, amount, delay }),
    
    onBombingLog: (callback) => {
        ipcRenderer.on('bombing-log', (event, log) => callback(log));
    },
    
    removeBombingLogListener: () => {
        ipcRenderer.removeAllListeners('bombing-log');
    },

    getServiceStats: () => ipcRenderer.invoke('get-service-stats'),
    
    getVersion: () => ipcRenderer.invoke('get-version'),

    checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),
    downloadUpdate: () => ipcRenderer.invoke('download-update'),
    quitAndInstall: () => ipcRenderer.invoke('quit-and-install'),
    
    onUpdateStatus: (callback) => {
        ipcRenderer.on('update-status', (event, data) => callback(data));
    },
    
    onUpdateProgress: (callback) => {
        ipcRenderer.on('update-progress', (event, data) => callback(data));
    },
    
    removeUpdateListeners: () => {
        ipcRenderer.removeAllListeners('update-status');
        ipcRenderer.removeAllListeners('update-progress');
    }
});

