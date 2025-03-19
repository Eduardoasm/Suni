/**
 * function to search wallet in the wallet services from WAU
 * @param {string} token received token from app
 * @param {string} walletId wallet received from app
 * @returns wallet that exists
 */
export interface IWallet {
    name: string;
    wallet: string;
    balance: number;
    balanceInUSDC: number;
    blockedBalance: number;
    blockedBalanceInUSDC: number;
    availableBalance: number;
    availableBalanceInUSDC: number;
    currency: string;
}
export declare function getUserWallet(token: string, walletId: string): Promise<any>;
//# sourceMappingURL=userWallet.d.ts.map