"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeOldToken = exports.removeToken = exports.addToken = void 0;
/**
 * Searches for received token in user devices to update
 * timestamp or add it to array and removes old tokens.
 * @param {string} token Received token from app
 * @param {IDeviceToken[]} deviceTokens Array of user device tokens
 * @returns {IDeviceToken[]} Updated user device tokens
 */
function addToken(token, deviceTokens) {
    if (!token) {
        return deviceTokens;
    }
    const deviceToken = deviceTokens.filter((t) => t.token === token);
    if (!deviceToken) {
        return removeOldToken([...deviceTokens, { token, timestamps: new Date() }]);
    }
    const _deviceToken = deviceToken.map((e) => {
        if (e.token === token) {
            return { token, timestamps: new Date() };
        }
        return e;
    });
    return removeOldToken(_deviceToken);
}
exports.addToken = addToken;
function removeToken(token, deviceTokens) {
    const removeTokenUser = deviceTokens.filter((t) => t.token !== token);
    return removeOldToken(removeTokenUser);
}
exports.removeToken = removeToken;
function removeOldToken(deviceTokens) {
    const time = 2 * 30 * 60 * 60 * 60 * 1000;
    const newDeviceToken = deviceTokens.filter((t) => new Date().getTime() - t.timestamps.getTime() < time);
    return newDeviceToken;
}
exports.removeOldToken = removeOldToken;
//# sourceMappingURL=deviceToken.js.map