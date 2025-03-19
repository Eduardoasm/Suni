/**
 * function to search wallet in the wallet services from WAU
 * @param {string} token received token from app
 * @param {string} walletId wallet received from app
 * @returns wallet that exists
 */
export interface IWallet {
    wallet: string;
    name: string;
    balance: number;
    error: string | null;
    business_enabled: string | null;
    type: string;
    blocked_balance: number;
    available_balance: number;
}
export declare function getUserWallet(token: string, walletId: string): Promise<IWallet>;
//# sourceMappingURL=userWallet.d.ts.map