import cq from "concurrent-queue";
import { isValidMessage } from "../../constants/messages";

export const queueDefaultOptions = {
    capacity: Infinity,
    size: Infinity,
    concurrency: 5,
    logger: () => { }, // Logs the enqueue and deque operations.
    processor: (task, cb) => { cb(null, task) },
};

export default class Queue {
    constructor(options = queueDefaultOptions) {
        this.queue = this._setup(options);
    }

    _setup(opts) {
        let q = cq();
        q = q.limit({
            concurrency: opts.concurrency,
            maxSize: opts.capacity,
            softMaxSize: opts.size,
        }).process(opts.processor);
        return q;
    }

    enqueue(msg, onProcess = () => { }) {
        if (isValidMessage(msg)) {
            this.queue(msg, onProcess);
            return { success: true };
        }
        return {
            success: false,
            msg: "Message is invalid",
        };
    }

    // returns the number of pending items
    size() {
        return this.queue.size;
    }

}