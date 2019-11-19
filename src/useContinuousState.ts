import { useEffect, useState } from 'react';

/**
 * returns 3 values, the past, present and future, representing the change of a given `value`
 * @param value - current value
 * @param timeout - the speed of change for the past (timeout between present and past)
 */
export function useContinuousState<T>(value: T, timeout: number | ((t: T) => number)) {
  // phased state
  const [past, setPastState] = useState(value);
  const [present, setPresentState] = useState(value);
  const [future, setFutureState] = useState(value);

  // set the future
  useEffect(() => {
    setFutureState(value);
  }, [value]);

  // remember the present
  useEffect(() => {
    setPresentState(future);
  }, [future]);

  // forget the past
  useEffect(() => {
    const tm = setTimeout(
      () => setPastState(present),
      typeof timeout === 'function' ? timeout(present) : (!!present ? 1 : timeout) || 1
    );

    return () => clearTimeout(tm);
  }, [present]);

  return [past, present, future];
}
