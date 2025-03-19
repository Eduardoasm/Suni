"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirstAndLastDayOfWeekOfMonth = void 0;
function getFirstAndLastDayOfWeekOfMonth(startDate) {
    const year = new Date(startDate).getFullYear();
    const month = new Date(startDate).getMonth() + 1;
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const firstDayOfWeekOfMonth = new Date(firstDayOfMonth);
    firstDayOfWeekOfMonth.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay() + 1);
    firstDayOfWeekOfMonth.setUTCHours(0);
    firstDayOfWeekOfMonth.setUTCMinutes(0);
    const lastDayOfMonth = new Date(year, month, 0);
    const lastDayOfWeekOfMonth = new Date(lastDayOfMonth);
    lastDayOfWeekOfMonth.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay() + 1));
    lastDayOfWeekOfMonth.setUTCHours(23, 59, 59);
    const weeks = {};
    const currentDate = new Date(firstDayOfWeekOfMonth);
    while (currentDate <= lastDayOfWeekOfMonth) {
        const weekStart = new Date(currentDate);
        const weekEnd = new Date(currentDate);
        weekEnd.setDate(weekEnd.getDate() + 6);
        const week = `${weekStart.toISOString().slice(0, 10)} - ${weekEnd
            .toISOString()
            .slice(0, 10)}`;
        weeks[week] = [];
        currentDate.setDate(currentDate.getDate() + 7);
    }
    return {
        firstDayOfWeekOfMonth,
        lastDayOfWeekOfMonth,
        weeks,
    };
}
exports.getFirstAndLastDayOfWeekOfMonth = getFirstAndLastDayOfWeekOfMonth;
//# sourceMappingURL=firstAndLastDayWeekMonth.js.map