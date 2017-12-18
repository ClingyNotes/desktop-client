import url from 'url';
import path from 'path';
import { BrowserWindow, app } from 'electron';

import appConfig from '../backend/config/app';

import '../../assets/stylesheets/main.scss';

console.log(`App is starting at ${__dirname}`);

export default class App {
    constructor(config = appConfig) {
        // TODO: validate config
    }

    setup() {
        app.on('ready', () => {
            const {
                window: {
                    width, height, center, frame
                }
            } = config;

            // TODO: create window abstraction
            let win = new BrowserWindow({
                width, height, center, frame,
                title: 'Clingy Notes',
                useContentSize: true,
            });

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
    }
};