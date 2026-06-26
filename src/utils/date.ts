import { format, parse, getDay } from 'date-fns';

/**
 * Returns today's date in YYYY-MM-DD format
 */
export const getTodayDateString = (): string => {
  return format(new Date(), 'yyyy-MM-dd');
};

/**
 * Formats a Date object into YYYY-MM-DD
 */
export const formatDateToKey = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

/**
 * Formats a YYYY-MM-DD string into a user-friendly format e.g. "26 Jun 2026"
 */
export const formatDisplayDate = (dateStr: string): string => {
  try {
    const parsed = parse(dateStr, 'yyyy-MM-dd', new Date());
    return format(parsed, 'dd MMM yyyy');
  } catch (error) {
    return dateStr;
  }
};

/**
 * Parses YYYY-MM-DD date string back to Date object
 */
export const parseDateFromKey = (dateStr: string): Date => {
  return parse(dateStr, 'yyyy-MM-dd', new Date());
};

/**
 * Gets day of week (0 = Sunday, 1 = Monday, ..., 6 = Saturday) from a YYYY-MM-DD string
 */
export const getDayOfWeek = (dateStr: string): number => {
  const parsed = parseDateFromKey(dateStr);
  return getDay(parsed);
};
