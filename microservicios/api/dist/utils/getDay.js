"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDay = void 0;
function getDay(date, dayOfTheWeek, mondayOrSunday) {
    date = new Date(date); // eslint-disable-line no-param-reassign
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -mondayOrSunday : dayOfTheWeek);
    return new Date(date.setDate(diff));
}
exports.getDay = getDay;
//# sourceMappingURL=getDay.js.map