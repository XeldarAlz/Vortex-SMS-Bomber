export function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = String(text);
    return div.innerHTML;
}

export function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
        : { r: 0, g: 255, b: 136 };
}

export function gradientText(text, startColor, endColor) {
    const start = hexToRgb(startColor);
    const end = hexToRgb(endColor);
    let result = '';

    for (let i = 0; i < text.length; i++) {
        const ratio = i / Math.max(text.length - 1, 1);
        const r = Math.round(start.r + (end.r - start.r) * ratio);
        const g = Math.round(start.g + (end.g - start.g) * ratio);
        const b = Math.round(start.b + (end.b - start.b) * ratio);
        result += `<span style="color: rgb(${r},${g},${b})">${escapeHtml(text[i])}</span>`;
    }
    return result;
}

export function colorSpan(text, color, { bold = false, glow = false } = {}) {
    const classes = [bold ? 'term-bold' : '', glow ? 'term-glow-primary' : ''].filter(Boolean).join(' ');
    return `<span style="color: ${color}" class="${classes}">${escapeHtml(String(text))}</span>`;
}

