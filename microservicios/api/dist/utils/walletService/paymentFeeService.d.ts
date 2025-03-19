export interface TLockBalance {
    token: string;
    walletId: string;
    fee: number;
    service: string;
}
/**
 *
 * @param token token received from app
 * @param walletId wallet user received from app
 * @param fee fee of user for the service
 * @param service service of the fee
 */
export declare function paymentServiceFee(body: TLockBalance): Promise<any>;
//# sourceMappingURL=paymentFeeService.d.ts.map