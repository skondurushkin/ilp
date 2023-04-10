import addDays from 'date-fns/addDays';
import addMonths from 'date-fns/addMonths';
import addYears from 'date-fns/addYears';
import toFormat from 'date-fns/format';

interface Period {
    start: string;
    end: string;
}

type Interval = 'hour' | 'day' | 'week' | 'month' | 'year';

// сдвиг даты, Interval с минусом означает сдвиг в прошлое, без минуса - в будущее
type DateShift = Interval | `-${Interval}`;

export function createPeriod(date: Date, shift: DateShift, format?: string): Period {
    const defaultFormat = format || 'yyyy-MM-dd';
    const first = toFormat(date, defaultFormat);
    const second = toFormat(shiftDate(date, shift), defaultFormat);
    return shift.startsWith('-') ? { start: second, end: first } : { start: first, end: second };
}

export function shiftDate(date: Date, shift: DateShift) {
    const past = shift.startsWith('-');
    const interval = past ? (shift.substring(1) as Interval) : (shift as Interval);
    const multiplier = past ? -1 : 1;

    switch (interval) {
        case 'day':
            return addDays(date, multiplier * 1);
        case 'week':
            return addDays(date, multiplier * 7);
        case 'month':
            return addMonths(date, multiplier * 1);
        case 'year':
            return addYears(date, multiplier);
        default:
            throw new Error(`shifting a date to "${shift}" is not supported yet`);
    }
}
