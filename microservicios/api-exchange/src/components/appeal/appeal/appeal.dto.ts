import { Types } from 'mongoose';
import { AppealReasonEnum, AppealTC } from './appeal.model';
import { IMultimedia } from '../multimedia';
import { TransactionType } from '../../transaction/transaction.dto';

export const AppealTypeName = AppealTC.getTypeName();
export const AppealType = AppealTC.getType();
export const AppealTypePlural = AppealTC.getTypePlural().getTypeName();
export const AppealTypeNonNull = AppealTC.getTypeNonNull();

export type TCreateAppeal = {
  transaction: Types.ObjectId;
  description: string;
  paymentReceipt: Array<IMultimedia>;
  reason: AppealReasonEnum;
};

export const CreateAppealInput = `
  input CreateAppeal {
    transaction: MongoID!
    description: String!
    paymentReceipt: [MultimediaInput]
    reason: String!
  }

  input MultimediaInput {
    src: String
    alt: String
    type: String
  }
`;

// export const AppealType = `
//   type appeal {
//     _id: MongoID
//     createdAt: Date
//     transaction: ${TransactionType}
//     description: String
//     paymentReceipt: [MultimediaType]
//     reason: String
//     finalResultDescription: String
//     status: String
//     appealOwner: User
//     active: Boolean
//   }

//   type MultimediaType {
//     src: String
//     alt: String
//     type: String
//   }

//   type User {
//     id: String
//     name: String
//     lastname: String
//     email: String
//   }
// `;

export type TCancelAppeal = {
  transactionId: Types.ObjectId;
};

export const CancelAppealInput = `
  input CancelAppeal {
    transactionId: MongoID!
  }
`;
