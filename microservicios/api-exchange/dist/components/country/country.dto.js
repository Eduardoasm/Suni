"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryTypeNonNull = exports.CountryTypePlural = exports.CountryType = exports.CountryTypeName = void 0;
const country_model_1 = require("./country.model");
exports.CountryTypeName = country_model_1.CountryTC.getTypeName();
exports.CountryType = country_model_1.CountryTC.getType();
exports.CountryTypePlural = country_model_1.CountryTC.getTypePlural().getTypeName();
exports.CountryTypeNonNull = country_model_1.CountryTC.getTypeNonNull();
//# sourceMappingURL=country.dto.js.map