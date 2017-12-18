import { BrowserWindow, app } from 'electron';


export default class AppWindow {
    constructor(options) {
        // validate the options
        const result = this._validate(options);
        if (!result.valid) {
            throw new Error(`Error validating options: ${result.message}`)
        }
        this._setup(options);
        this._window = null;
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
            onCloseCb = ()=>{},
        } = opts;


        this._window = new BrowserWindow({
            width, height, center, frame,
            title: 'Clingy Notes',
            useContentSize: true,
            alwaysOnTop: onTop,
        });

        this._window.on('closed', () => {
            this._window = null;
            oncCloseCb();
        });

        this._window.loadURL(url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file:',
            slashes: true
        }))
        
        if (process.env.NODE_ENV === 'development') {
            this._window.webContents.openDevTools();
        }
    }
}