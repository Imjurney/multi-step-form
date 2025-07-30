const parseLocalDate = (dateStr: string) => {
  if (!dateStr) return undefined;
  const [year, month, day] = dateStr.split('-').map(Number);
  if (!year || !month || !day) return undefined;
  const date = new Date(year, month - 1, day);
  if (isNaN(date.getTime())) return undefined;
  return date;
};

export default parseLocalDate;
