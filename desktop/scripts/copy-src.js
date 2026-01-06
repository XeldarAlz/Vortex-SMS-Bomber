const fs = require('fs');
const path = require('path');

// Copy src directory from parent to desktop/src
const srcSource = path.join(__dirname, '..', '..', 'src');
const srcDest = path.join(__dirname, '..', 'src');

if (!fs.existsSync(srcSource)) {
    console.error('Error: src directory not found at', srcSource);
    process.exit(1);
}

// Remove existing src directory if it exists
if (fs.existsSync(srcDest)) {
    fs.rmSync(srcDest, { recursive: true, force: true });
}

// Copy src directory
fs.cpSync(srcSource, srcDest, { recursive: true });
console.log('✓ Copied src directory to desktop/src for build');

