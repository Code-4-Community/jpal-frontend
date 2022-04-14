/**
 * Formats a date in the following format: Month (String) Day (Number), Year(Number)
 * Example : 09/02/2002 -> September 2, 2002
 */
const dateFormatter = (date: Date): string =>
  date.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export default dateFormatter;
