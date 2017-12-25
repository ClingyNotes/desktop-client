import Queue, { queueDefaultOptions } from "../../../src/js/backend/queue/queue";
import MessageType from '../../../src/js/constants/messages';

describe("Queue", () => {
    describe("with default options", () => {
        it('should call the callback immediately with the queued item', (done) => {
            const q = new Queue();
            let cb;
            cb = jest.fn((a, b) => {
                expect(cb).toBeCalledWith(null, { id: "id1", type: MessageType.SYNC });
                done();
            });
            const stat = q.enqueue({ id: "id1", type: MessageType.SYNC }, cb);
            expect(stat.success).toBeTruthy();
        });
    });

    describe('with non-default options', () => {
        it('shoudl process #conurrent jobs at once', (done) => {
            const concurrency = 2;
            const processor = (task, cb) => {
                setTimeout(() => cb(null, task), task.timeout);
            }
            const qopts = Object.assign({}, queueDefaultOptions, { concurrency, processor });
            const q = new Queue(qopts);
            let stat = q.enqueue({ id: 1, type: MessageType.SYNC, timeout: 100 })
            expect(stat.success).toBeTruthy();
            stat = q.enqueue({ id: 2, type: MessageType.SYNC, timeout: 100 })
            expect(stat.success).toBeTruthy();
            stat = q.enqueue({ id: 3, type: MessageType.SYNC, timeout: 100 })
            expect(stat.success).toBeTruthy();
            stat = q.enqueue({ id: 4, type: MessageType.SYNC, timeout: 200 })
            expect(stat.success).toBeTruthy();
            stat = q.enqueue({ id: 5, type: MessageType.SYNC, timeout: 200 })
            expect(stat.success).toBeTruthy();

            expect(q.size()).toBe(5);
            let set1 = 0;
            setTimeout(() => {
                // Capture the number of pending items after the {concurrency} items are queued.
                set1 = q.size();
            }, 50);
            setTimeout(() => {
                expect(set1).toEqual(3);//the message should be process 2 at a time.
                expect(q.size()).toEqual(0);
                done();
            }, 510);
        });

    });

    describe('enqueue()', () => {
        it('should fail if message type not present', () => {
            const q = new Queue();
            const stat = q.enqueue({ id: 1 });

            expect(stat).toMatchObject({
                success: false,
                msg: "Message is invalid",
            });
        });

        it('should fail if message type is invalid', () => {
            const q = new Queue();
            const stat = q.enqueue({ id: 1, type: 'invalid' });

            expect(stat).toMatchObject({
                success: false,
                msg: "Message is invalid",
            });
        });

        it('should fail if message id not present', () => {
            const q = new Queue();
            const stat = q.enqueue({ type: MessageType.SYNC });

            expect(stat).toMatchObject({
                success: false,
                msg: "Message is invalid",
            });
        });
    });
});