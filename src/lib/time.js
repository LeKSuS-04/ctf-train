export function formatTime(dateObj) {
  return dateObj.toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });
}
