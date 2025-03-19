"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountryFullName = void 0;
function getCountryFullName(code) {
    const countries = {
        ARG: 'Argentina',
        BO: 'Bolivia',
        BRA: 'Brasil',
        CHL: 'Chile',
        COL: 'Colombia',
        CRI: 'Costa Rica',
        ECU: 'Ecuador',
        GTM: 'Guatemala',
        NIC: 'Nicaragua',
        MEX: 'México',
        SLV: 'El Salvador',
        PAN: 'Panamá',
        PER: 'Perú',
        PRY: 'Paraguay',
        VEN: 'Venezuela',
        default: '',
    };
    return countries[code] || countries.default;
}
exports.getCountryFullName = getCountryFullName;
//# sourceMappingURL=country.js.map