"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMyLoanOffersInput = exports.CancelLoanOfferInput = exports.LoanOfferTypeNotNull = exports.LoanOfferTypePlural = exports.LoanOfferType = exports.LoanOfferTypeName = void 0;
const loanOffer_model_1 = require("./loanOffer.model");
exports.LoanOfferTypeName = loanOffer_model_1.LoanOfferTC.getTypeName();
exports.LoanOfferType = loanOffer_model_1.LoanOfferTC.getType();
exports.LoanOfferTypePlural = loanOffer_model_1.LoanOfferTC.getTypePlural().getTypeName();
exports.LoanOfferTypeNotNull = loanOffer_model_1.LoanOfferTC.getTypeNonNull();
exports.CancelLoanOfferInput = `
  input CancelLoanOffer {
    _id: MongoID!
  }
`;
exports.GetMyLoanOffersInput = `
  input GetMyLoanOffers {
    page: Int!
    perPage: Int!
    status: String
    startDate: Date
    endDate: Date
  }
`;
//# sourceMappingURL=loanOffer.dto.js.map