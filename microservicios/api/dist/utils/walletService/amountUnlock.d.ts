export interface TUnlockBalance {
    token: string;
    toWalletId: string;
    amount: number;
    destServiceFee: number;
    blockId: string;
}
/**
 *
 * @param token token received from app
 * @param toWalletId wallet id that receives amount
 * @param amount blocked amount
 * @param destServiceFee fee to take from destination
 * @param blockId blocked amount id
 */
export declare function unlockBalance(body: TUnlockBalance): Promise<any>;
//# sourceMappingURL=amountUnlock.d.ts.map