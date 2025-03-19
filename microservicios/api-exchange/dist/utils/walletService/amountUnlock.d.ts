export interface TUnlockBalance {
    token: string;
    toWallet?: string;
    amount: number;
    takerFee: number;
    blockId: string;
    description: string;
}
/**
 *
 * @param amount amount of listing
 * @param blockId id for service balance lock (loanAdId)
 * @param description receipt description
 * @param takerFee fee of taker
 * @param token token received from app
 * @param toWallet wallet destination
 */
export declare function unlockBalance(body: TUnlockBalance): Promise<any>;
//# sourceMappingURL=amountUnlock.d.ts.map