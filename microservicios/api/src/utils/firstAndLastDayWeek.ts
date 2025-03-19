export function getWeekFromDate(date) {
  const newDate = new Date(date);
  const dayOfWeek = newDate.getDay(); // Obtener el día de la semana del día dado (0 = domingo, 1 = lunes, ..., 6 = sábado)
  const startOfWeek = new Date(newDate); // Copiar el objeto de fecha dado
  startOfWeek.setDate(newDate.getDate() - dayOfWeek); // Restablecer al lunes de la misma semana

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Establecer al domingo de la misma semana
  endOfWeek.setUTCHours(23, 59, 59);

  return {
    startOfWeek,
    endOfWeek,
  };
}
