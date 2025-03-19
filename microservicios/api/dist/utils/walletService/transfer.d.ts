export interface ITransfer {
    amount: number;
    fromWalletId: string;
    toWalletId: string;
}
export declare function transfer(body: ITransfer, token: string): Promise<any>;
//# sourceMappingURL=transfer.d.ts.map