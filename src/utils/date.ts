import { format, fromUnixTime } from 'date-fns';

export function formatDate(date: Date | number, formatString: string = 'PPP'): string {
  return format(typeof date === 'number' ? fromUnixTime(date) : date, formatString);
}

export function formatTime(date: Date | number, formatString: string = 'h:mm a'): string {
  return format(typeof date === 'number' ? fromUnixTime(date) : date, formatString);
}

export function getDayName(date: Date | number, formatString: string = 'EEEE'): string {
  return format(typeof date === 'number' ? fromUnixTime(date) : date, formatString);
}