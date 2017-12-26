import { BrowserWindow, app } from 'electron';
import url from 'url';
import path from 'path';
import uuid4 from 'uuid';


export default class AppWindow {
    constructor(app, options) {
        // validate the options
        const result = this._validate(options);
        if (!app) {
            throw new Error('Error: app not supplied');
        }
        if (!result.valid) {
            throw new Error(`Error validating options: ${result.message}`)
        }
        this.getInstance = this.getInstance.bind(this);
        this.app = app;
        this._setup(options);
        this._window = {
            id: uuid4(),
            instance: null,
        };
    }

    _validate(opts = {}) {
        return {
            valid: true,
            // message: if invalid
        };
    }

    _setup(opts) {
        const {
            window: { width, height, center, frame, onTop },
            onCloseCb = () => { }, onCreateCb = () => { }
        } = opts;


        const win = new BrowserWindow({
            width, height, center, frame,
            title: 'Clingy Notes',
            useContentSize: true,
            alwaysOnTop: onTop,
        });

        win.on('closed', () => {
            this._window = null;
            onCloseCb();
        });

        win.loadURL(url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file:',
            slashes: true
        }))

        this._window.instance = this;

        if (process.env.NODE_ENV === 'development') {
            win.webContents.openDevTools();
        }
    }

    getInstance() {
        return this._window;
    }
}