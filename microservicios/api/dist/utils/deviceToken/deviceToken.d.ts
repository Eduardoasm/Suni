import { IDeviceToken } from '../../components/user/deviceToken';
/**
 * Searches for received token in user devices to update
 * timestamp or add it to array and removes old tokens.
 * @param {string} token Received token from app
 * @param {IDeviceToken[]} deviceTokens Array of user device tokens
 * @returns {IDeviceToken[]} Updated user device tokens
 */
export declare function addToken(token: string, deviceTokens: IDeviceToken[]): IDeviceToken[];
export declare function removeToken(token: string, deviceTokens: IDeviceToken[]): IDeviceToken[];
export declare function removeOldToken(deviceTokens: IDeviceToken[]): IDeviceToken[];
//# sourceMappingURL=deviceToken.d.ts.map