/**
 * Formats time to string. Used to unify time format across the app
 * @param {Date} dateObj Date object to format
 * @returns string, wich represents specified date
 */
export function formatTime(dateObj) {
  return dateObj.toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });
}
