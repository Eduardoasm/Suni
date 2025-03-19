import { Types, Document, Model } from 'mongoose';
import { ICurrency } from '../../currency';
import { IPaymentPlan } from '../payment-plan';
import { ILoanRequest } from '../../loanRequest';
import { ILoanOffer } from '../../loanOffer/loanOffer.model';
export type ContractStatusEnum = 'active' | 'concluded';
export interface IContract {
    _id?: any;
    loanRequest?: Types.ObjectId | ILoanRequest;
    loanOffer?: Types.ObjectId | ILoanOffer;
    lender: string;
    borrower: string;
    walletTransactionsCurrency: Types.ObjectId | ICurrency;
    amountInUSDC: number;
    amountReceivedInWalletTransactionsCurrency: number;
    rate: number;
    status: ContractStatusEnum;
    paymentPlan: Array<IPaymentPlan>;
    startDate: Date;
    lenderFeeInUSDC: number;
    lenderFeeInWalletTransactionsCurrency: number;
    borrowerFeeInUSDC: number;
    borrowerFeeInWalletTransactionsCurrency: number;
    referenceNumber: number;
    onDefault: boolean;
    paymentDue: boolean;
    preCancel?: boolean;
    commerce?: string;
    borrowerSelectedWallet?: string;
    lenderSelectedWallet?: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export type ContractDocument = Document<Types.ObjectId, any, IContract> & IContract;
export declare const Contract: Model<IContract, {}, {}, {}, any>;
export declare const ContractTC: import("graphql-compose-mongoose").ObjectTypeComposerWithMongooseResolvers<ContractDocument, any>;
//# sourceMappingURL=contract.model.d.ts.map