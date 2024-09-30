export function dateFormatter(dateString) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  return formatter.format(Date.parse(dateString));
}
