export function getCountryFullName(code: string) {
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
