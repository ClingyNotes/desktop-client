import url from 'url';
import path from 'path';
import { BrowserWindow, app } from 'electron';

import defaultConfig from '../backend/config/app';

import AppWindow from '../backend/appWindow';

import '../../assets/stylesheets/main.scss';

console.log(`App is starting at ${__dirname}`);

export default class App {
    constructor(config = defaultConfig) {
        this.config = config;
        // TODO: validate config
    }

    setup() {
        app.on('ready', () => {
            const {
                window: {
                    width, height, center, frame
                }
            } = this.config;
            const win = new AppWindow(app, this.config)
        });
    }
};
