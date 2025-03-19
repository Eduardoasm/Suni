import { IUserAuth } from '../../types/user';
export declare function getUserCreditHistory(user: IUserAuth): Promise<{
    creditsReceived: number;
    creditsPaidOnTime: number;
    creditsPaidLate: number;
}>;
//# sourceMappingURL=userCreditHistory.d.ts.map