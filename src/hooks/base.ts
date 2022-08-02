import { useCallback, useEffect, useState } from 'react';

import { getTimeValue, type TimeConfiguration } from './utils';

type BaseContinuousState<T> = {
    defined: boolean;
    past: T;
    present: T;
    future: T;
    definePresent(): void;
};

export const useContinuousStateBase = <T>(
    value: T,
    options: {
        delayPast?: TimeConfiguration<T>;
        initialValue?: T;
    },
): BaseContinuousState<T> => {
    // phased state
    const initialValue =
        'initialValue' in options ? options.initialValue! : value;
    const { delayPast } = options;
    const [past, setPastState] = useState(initialValue);
    const [present, setPresentState] = useState(initialValue);
    const [future, setFutureState] = useState(initialValue);

    // set the future
    useEffect(() => {
        setFutureState(value);
    }, [value]);

    const definePresent = useCallback(
        () => setPresentState(future),
        [setPresentState, future],
    );

    // forget the past
    useEffect(() => {
        const tm = setTimeout(
            setPastState,
            delayPast ? getTimeValue(delayPast, present) : 1,
            present,
        );

        return () => clearTimeout(tm);
    }, [present, delayPast]);

    return {
        defined: Boolean(past) || Boolean(present) || Boolean(future),
        past,
        present,
        future,
        definePresent,
    };
};
