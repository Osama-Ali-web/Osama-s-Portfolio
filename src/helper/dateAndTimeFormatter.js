export function dateAndTimeFormatter(dateString) {
  try {
    // Create a Date object directly from the input string
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date value");
    }

    // Create a formatter for date and time
    const formatter = new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Use 24-hour time format
      timeZone: "UTC", // Ensure it interprets the date as UTC
    });

    return formatter.format(date);
  } catch (error) {
    console.error(error);
    return "Invalid date value";
  }
}
