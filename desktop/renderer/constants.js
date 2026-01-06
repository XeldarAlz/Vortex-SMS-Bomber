export const palette = {
    primary: '#00ff88',
    secondary: '#00d4ff',
    accent: '#ff00ff',
    success: '#00ff88',
    warning: '#ffaa00',
    error: '#ff4444',
    info: '#00d4ff',
    muted: '#888888'
};

export const phonePattern = /^5\d{9}$/;

export const timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
});

