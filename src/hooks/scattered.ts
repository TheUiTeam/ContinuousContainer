import { useCallback, useEffect } from 'react';

import { useContinuousStateBase } from './base';
import { getTimeValue, type TimeConfiguration } from './utils';

export type EmptyDelayComponent<T> = (props: {
    timeout?: TimeConfiguration<T>;
}) => null;

export type ScatteredContinuousState<T> = {
    defined: boolean;
    past: T;
    present: T;
    future: T;
    DefinePresent: EmptyDelayComponent<T>;
};

/**
 * Special version of {@link useContinuousState} "scattered" in space and time.
 * One has to `<DefinePresent/>` in order to move from "past" into present state
 */
export const useScatteredContinuousState = <T>(
    value: T,
    options: {
        delayPast?: TimeConfiguration<T>;
        initialValue?: T;
    } = {},
): ScatteredContinuousState<T> => {
    const { definePresent, ...state } = useContinuousStateBase(
        value,
        options,
    );
    const { future } = state;

    const DefinePresent: EmptyDelayComponent<T> = useCallback(
        ({ timeout = 0 }) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useEffect(() => {
                const timer = setTimeout(() => {
                    definePresent();
                }, getTimeValue(timeout, future));

                return () => {
                    clearTimeout(timer);
                };
                // eslint-disable-next-line react-hooks/exhaustive-deps
            }, [definePresent]);

            return null;
        },
        [future, definePresent],
    );

    return {
        ...state,
        DefinePresent,
    };
};
