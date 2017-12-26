import uuid4 from 'uuid';

import AppWindow from '../appWindow';
import defaultWindowConfig from "../config/app";

export default class NewWindow {
    // add invalid data type as the default to the constructor
    constructor(opts = defaultWindowConfig, data) {
        this.data = data;
        this.opts = opts;
    }

    process() {
        return new Promise((res, rej) => {
            const win = new AppWindow(this.opts);
            res(win.getInstance());
        });
    }
}