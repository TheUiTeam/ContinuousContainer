import * as React from 'react';

import {useContinuousState} from '../hooks/state';
import {ContinuousState} from "../hooks/state";

type LazyContainerProps<T> = {
    /**
     * Value to be used
     */
    value: T;
    /**
     * timeout for the "past" propagation
     */
    exitTimeout: number | ((t: T) => number);

    /**
     * the render function
     */
    children(state: ContinuousState<T>): React.ReactElement | null;
}

/**
 *
 * @param value
 * @param timeout
 * @param children
 * @constructor
 */
export function ContinuousContainer<T>({
                                           value,
                                           exitTimeout,
                                           children,
                                       }: LazyContainerProps<T>): React.ReactElement | null {
    return children(useContinuousState(value, {delayPast: exitTimeout}));
}
