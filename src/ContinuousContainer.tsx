import * as React from 'react';
import { useEffect, useRef } from 'react';
import { useContinuousState } from './useContinuousState';

interface LazyContainerProps<T> {
  /**
   * Value to be used
   */
  value: T;
  /**
   * timeout for the "past" propagation in "false" case
   * or a function, to control propagation for all cases
   */
  timeout: number | ((t: T) => number);

  /**
   * causes layout reflow between steps
   */
  reflow?: boolean;

  /**
   * the children render function
   * @param was - past
   * @param is - present
   * @param will - future
   * @param ref - ref to reflow element
   */
  children(was: T, is: T, will: T, ref: React.RefObject<HTMLElement>): React.ReactElement | null | false;
}

export function ContinuousContainer<T>({
  value,
  reflow = true,
  timeout,
  children,
}: LazyContainerProps<T>): React.ReactElement | null {
  const ref = useRef<any>(null);

  const [past, preset, future] = useContinuousState(value, timeout);

  // and reflow in between
  useEffect(() => {
    if (reflow && ref.current) {
      // tslint:disable-next-line
      ref.current.offsetHeight; // trigger reflow
    }
  }, [reflow, past, preset, future]);

  return children(past, preset, future, ref) as any;
}
