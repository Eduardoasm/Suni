export interface TLockBalance {
    token?: string;
    wallet?: string;
    amount?: number;
    makerFee?: number;
}
/**
 *
 * @param token token received from app
 * @param wallet wallet received from app
 * @param amount amount of listing
 * @param makerFee fee of maker
 */
export declare function balanceLock(body: TLockBalance): Promise<any>;
//# sourceMappingURL=userBalanceLock.d.ts.map