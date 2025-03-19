/**
 * @param userId id from user IS OPTIONAL
 * @param devicesId list of devices from user IS OPTIONAL
 * @param title title of message IS OPTIONAL
 * @param message body of message
 * @param imageUrl url of image for the view IS OPTIONAL
 * @param url url that will visit if the user clicks on the message IS OPTIONAL
 * @param appData object with data if we need send info in push notifications IS OPTIONAL
 */
export interface TSendNotifications {
    token: string;
    userId?: string;
    devicesId?: Array<string>;
    title?: string;
    message: string;
    imageUrl?: string;
    url?: string;
    appData?: any;
}
export declare function sendNotifications(bodyNotifications: TSendNotifications): Promise<import("axios").AxiosResponse<any, any>>;
//# sourceMappingURL=sendNotification.d.ts.map