export interface TUpdateBlock {
    token: string;
    amount: number;
    makerFee: number;
    blockId: string;
}
/**
 * @param token token received from app
 * @param amount the new amount for block/listing
 * @param makerFee the new makerFee for maker
 * @param blockId id for service balance lock (loanAdId)
 */
export declare function updateBlock(body: TUpdateBlock): Promise<any>;
//# sourceMappingURL=updateLock.d.ts.map