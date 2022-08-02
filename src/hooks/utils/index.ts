export type TimeConfiguration<T> = number | ((t: T) => number);
export const getTimeValue = <T>(
    timeout: TimeConfiguration<T>,
    value: T,
): number => (typeof timeout === 'function' ? timeout(value) : timeout);
