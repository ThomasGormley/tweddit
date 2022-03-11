import { formatDistanceToNow } from 'date-fns';
import locale from 'date-fns/locale/en-GB';

const formatDistanceLocale: { [key: string]: string } = {
    lessThanXSeconds: '{{count}}s',
    xSeconds: '{{count}}s',
    halfAMinute: '30s',
    lessThanXMinutes: '{{count}}m',
    xMinutes: '{{count}}m',
    aboutXHours: '{{count}}h',
    xHours: '{{count}}h',
    xDays: '{{count}}d',
    aboutXWeeks: '{{count}}w',
    xWeeks: '{{count}}w',
    aboutXMonths: '{{count}}m',
    xMonths: '{{count}}m',
    aboutXYears: '{{count}}y',
    xYears: '{{count}}y',
    overXYears: '{{count}}y',
    almostXYears: '{{count}}y',
};

function formatDistance(
    token: string,
    count: string,
    options: { [key: string]: string | number },
) {
    options = options || {};
    const result = formatDistanceLocale[token].replace('{{count}}', count);

    if (options.addSuffix) {
        if (options.comparison > 0) {
            return 'in ' + result;
        } else {
            return result + ' ago';
        }
    }

    return result;
}

export default function formatTimeDistanceToNowShortSuffix(
    date: Date | number,
) {
    return formatDistanceToNow(date, {
        locale: {
            ...locale,
            formatDistance,
        },
    });
}
