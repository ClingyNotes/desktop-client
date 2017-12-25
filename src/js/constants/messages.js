const MessageTypes = {
    NEW_WINDOW: 'NEW_WINDOW',
    SYNC: 'SYNC',
    GROUP: 'GROUP',
    ARCHIVE: 'ARCHIVE',
    ON_TOP: 'ON_TOP',
    PASSWORD: 'PASSWORD',
    CLOSE: 'CLOSE',
    CHECKLIST: 'CHECKLIST',
};

export default MessageTypes;

export function isValidMessage(msg) {
    return msg && MessageTypes[msg.type] && msg.id && true;
}
