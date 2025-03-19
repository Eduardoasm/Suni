export interface TLockBalance {
    token: string;
    walletId: string;
    amount: number;
    expiresAt: Date;
    serviceFee: number;
}
/**
 *
 * @param token token received from app
 * @param walletId wallet received from app
 * @param amount amount to block
 * @param expiresAt block expiration date
 * @param serviceFee fee to take from wallet
 */
export declare function balanceLock(body: TLockBalance): Promise<any>;
//# sourceMappingURL=userBalanceLock.d.ts.map