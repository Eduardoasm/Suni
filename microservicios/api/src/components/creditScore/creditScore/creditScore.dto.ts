import { CreditScoreTC } from './creditScore.model';
import { ProviderEnum } from '../creditScoreValues';

export const CreditScoreTypeName = CreditScoreTC.getTypeName();
export const CreditScoreType = CreditScoreTC.getType();
export const CreditScoreTypePlural =
  CreditScoreTC.getTypePlural().getTypeName();
export const CreditScoreTypeNotNull = CreditScoreTC.getTypeNonNull();

export type TGetClientWithCreditScoreInput = {
  id: string;
};

export const GetClientWithCreditScoreInput = `
  input GetClientWithCreditScoreInput {
    id: String!
  }
`;

export type TCreditScoreValues = {
  referenceNumber: string;
  value: number;
  provider: ProviderEnum;
};

export type TCreateCreditScore = {
  values: TCreditScoreValues;
};

export const CreateCreditScoreUserInput = `
  input CreateCreditScore {
    values: creditScoreValues
  }

  input creditScoreValues {
    referenceNumber: String
    value: Float
    provider: String
  }
`;

export type TGetCreditScoreUser = {
  userId: string;
  startDate: Date;
  endDate: Date;
};

export const GetCreditScoreUserInput = `
  input GetCreditScore {
    userId: String
    startDate: Date
    endDate: Date
  }
`;

export const GetClientsWithCreditScoreType = `
  type GetClientsWithCreditScoreType {
    clients: [ClientsCSType]
  }
  type ClientsCSType {
    client: ClientCSType
    currentCreditScore: CurrentCreditScoreType
    historicalCreditScore: ${CreditScoreTypeName}
  }
  type ClientCSType {
    id: String
    name: String
    lastname: String
    email: String
    password: String
    biometric: String
    phone: Int
    status: Boolean
    business_id: String
    cashier_business_owner_id: String
    confirm_email: Boolean
    reset_status_pass: Boolean
    verific_code: String
    terms: Boolean
    code_reference: String
    created_at: String
    closed_at: String
    close_code: String
    country: String
    agreedToDataCollection: Boolean
    dni_type: String
    dni_value: String
    metamapStatus: MetamapStatusType
  }

  type CurrentCreditScoreType {
    credoLab: CreditScoreValueType
    suni: CreditScoreValueType
  }

  type CreditScoreValueType {
    range: Int
    referenceNumber: String
    value: Float
    provider: String
    _id: String
    createdAt: Date
    updatedAt: Date
  }

  type MetamapStatusType {
    id: String
    user_id: String
    status: String
    dni_firstName: String
    dni_lastName: String
    dni_type: String
    dni_value: String
    country: String
  }
`;

export const GetClientWithCreditScoreType = `
  type GetClientWithCreditScoreType {
    client: ClientCSType
    currentCreditScore: CurrentCreditScoreType
    historicalCreditScore: ${CreditScoreTypeName}
  }
`;
