"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPreviousCreditLimits = void 0;
const tslib_1 = require("tslib");
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
const transactionService = tslib_1.__importStar(require("../../components/transaction/transaction.service"));
function getPreviousCreditLimits(userId) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const date = new Date();
        const oldMonth = new Date(date.setMonth(date.getMonth() - 13)); // se restan -13 ya que se hace la busqueda desde los 12 meses anteriores
        // sin tomar el mes actual
        const userCreditLimits = [];
        const previousMonths = [];
        for (let i = 0; i <= 11; i += 1) {
            // loop para buscar los 12 meses anteriores en numeros
            const month = new Date(oldMonth.setMonth(oldMonth.getMonth() + 1)).getMonth() + 1;
            const year = new Date(oldMonth.setMonth(oldMonth.getMonth())).getFullYear();
            const firstDayOfMonth = (0, dayjs_1.default)()
                .year(year)
                .month(month)
                .startOf('month')
                .format();
            const lastDayOfMonth = (0, dayjs_1.default)()
                .year(year)
                .month(month)
                .endOf('month')
                .format();
            const timeStamp = {
                firstDayOfMonth,
                lastDayOfMonth,
                month,
            };
            previousMonths.push(timeStamp);
        }
        for (let j = 0; j <= previousMonths.length; j += 1) {
            // loop para buscar las transacciones de acuerdo a los meses anteriores
            const userTransaction = yield transactionService.find({
                from: userId,
                // updatedAt: {
                //   // se realiza la busqueda mediante el updatedAt ya que al modificarse en "loanConcluded no se haran mas modificaciones"
                //   // ya que termina el contrato, y se hace la busqueda entre el primer y ultimo dia de el mes para tomar la ultima transaction
                //   $gte: new Date(previousMonths[i].firstDayOfMonth),
                //   $lte: new Date(previousMonths[i].lastDayOfMonth),
                // },
                type: 'payment',
                event: 'loanConcluded',
            });
            userCreditLimits.push({
                month: previousMonths[j].month,
                borrowerCreditLimit: userTransaction[0].borrowerCreditLimit,
            });
        }
        console.log('soy user creditlimis', userCreditLimits);
        return userCreditLimits;
    });
}
exports.getPreviousCreditLimits = getPreviousCreditLimits;
//# sourceMappingURL=previousCreditLimits.js.map