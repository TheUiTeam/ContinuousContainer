import {useEffect} from 'react';

import {useContinuousStateBase} from './base';
import {getTimeValue, type TimeConfiguration} from './utils';

export type ContinuousState<T> = {
    defined: boolean;
    past: T;
    present: T;
    future: T;
};

/**
 * returns 3 values representing 1) the past, 2) present and 3) future values letting you better understand change in time
 * @example
 * ```tsx
 *  const state = useContinuousState(isEnabled);
 *  // isEnabled == true?
 *  // state.defined -> true
 *  // state.past -> false
 *  // state.present -> false
 *  // state.future -> true ⬅️
 *
 *  const state = useContinuousState(isEnabled, {initialState:isEnabled});
 *  // state.past == state.present == true
 *  ```
 */
export const useContinuousState = <T>(
    value: T,
    options: {
        delayPast?: TimeConfiguration<T>;
        delayPresent?: TimeConfiguration<T>;
        initialValue?: T;
    } = {},
): ContinuousState<T> => {
    const {definePresent, ...state} = useContinuousStateBase(
        value,
        options,
    );
    const {delayPresent = 1} = options;
    const {future} = state;

    useEffect(() => {
            // remember the present

            const timeout = setTimeout(
                definePresent,
                getTimeValue(delayPresent, future),
                future,
            );

            return () => clearTimeout(timeout);
        },
        [definePresent, future],
    );

    return state;
};
