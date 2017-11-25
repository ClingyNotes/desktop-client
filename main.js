import {BrowserWindow, app} from 'electron';

app.on('ready', () => {
    let win = new BrowserWindow({width:400, height:500, backgroundColor: 'green', frame:false, title: 'Clingy Notes'});
    win.on('closed', () => {
        win = null;
    });
});