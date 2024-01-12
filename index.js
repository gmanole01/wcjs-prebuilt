const os = require('os');
const fs = require('fs');
const path = require('path');

let platform = null;
let arch = null;

if(os.platform() === 'win32') {
    // Windows
    platform = 'win';
    if(os.arch() === 'x64') {
        arch = 'amd64';
    } else if(os.arch() === 'ia32') {
        arch = 'ia32';
    } else {
        throw new Error('Arch not supported!');
    }
} else if(os.platform() === 'darwin') {
    // Darwin
    platform = 'darwin';
    if(os.arch() === 'arm64') {
        arch = 'arm64';
    } else if(os.arch() === 'arm') {
        arch = 'arm';
    } else {
        throw new Error('Arch not supported!');
    }
} else {
    throw new Error('OS not supported!');
}

const relativePath = `lib/${platform}/${arch}/WebChimera.js.node`;
const fullPath = path.resolve(__dirname, relativePath);

if(!fs.existsSync(fullPath)) {
    throw new Error('Native node module not found!');
}

module.exports = require(fullPath);
