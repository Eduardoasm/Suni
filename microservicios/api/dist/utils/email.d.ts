import * as postmark from 'postmark';
import 'dayjs/locale/es';
import { IUser } from '../components/user/user';
interface BrowserDetectInfo {
    name?: string;
    version?: string;
    versionNumber?: number;
    mobile?: boolean;
    os?: string;
}
export declare function sendWelcomeEmail(user: IUser): Promise<postmark.Models.MessageSendingResponse>;
interface ResetPasswordOptions {
    user: IUser;
    os: BrowserDetectInfo;
    url: string;
}
export declare function sendResetPasswordEmail({ user, os, url, }: ResetPasswordOptions): Promise<postmark.Models.MessageSendingResponse>;
export {};
//# sourceMappingURL=email.d.ts.map