import url from 'url';
import path from 'path';

import './src/assets/stylesheets/main.scss';

import {BrowserWindow, app} from 'electron';

console.log(`App is starting at ${__dirname}`);
app.on('ready', () => {
    let win = new BrowserWindow({width:400, height:500, center: true, frame:true, title: 'Clingy Notes', useContentSize:true});
    win.on('closed', () => {
        win = null;
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
      }))
    win.webContents.openDevTools();
});
