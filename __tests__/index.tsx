import * as React from 'react';
import {useContinuousState, useScatteredContinuousState} from '../src';
import {render, fireEvent, act} from '@testing-library/react';
import {FC, lazy, Suspense, useState} from 'react';

describe('useContinuousState', () => {
    describe('initialization', () => {
        it('control flow - default', () => {
            const stateCallback = jest.fn();
            const TestSuite = () => {
                const state = useContinuousState(true);
                stateCallback(state.past, state.present, state.future);

                return null;
            };

            render(<TestSuite/>);
            expect(stateCallback).toHaveBeenCalledTimes(1);
            expect(stateCallback).toHaveBeenNthCalledWith(1, true, true, true);
        });
        it('control flow - init true', () => {
            const stateCallback = jest.fn();
            const TestSuite = () => {
                const state = useContinuousState(true, {initialValue: true});
                stateCallback(state.past, state.present, state.future);

                return null;
            };

            render(<TestSuite/>);
            expect(stateCallback).toHaveBeenCalledTimes(1);
            expect(stateCallback).toHaveBeenNthCalledWith(1, true, true, true);
        });
        it('control flow - init false', () => {
            const stateCallback = jest.fn();
            const TestSuite = () => {
                const state = useContinuousState(true, {initialValue: false});
                stateCallback(state.past, state.present, state.future);

                return null;
            };

            render(<TestSuite/>);
            expect(stateCallback).toHaveBeenCalledTimes(2);
            expect(stateCallback).toHaveBeenNthCalledWith(1, false, false, false);
            expect(stateCallback).toHaveBeenNthCalledWith(2, false, false, true);
        });
    });

    describe('advance', () => {
        const advance = () => {
            act(() => {
                jest.advanceTimersByTime(1)
            })
        };

        it('off-on-off', () => {
            jest.useFakeTimers();

            const TestSuite = () => {
                const [on, setOn] = useState(false);
                const state = useContinuousState(on);

                return (
                    <button onClick={() => setOn(!on)}>
                        toggle {state.past ? 't' : 'f'}
                        {state.present ? 't' : 'f'}
                        {state.future ? 't' : 'f'}
                    </button>
                );
            };

            const probe = render(<TestSuite/>);
            expect(probe.baseElement.innerHTML).toMatchInlineSnapshot(`"<div><button>toggle fff</button></div>"`);
            // -> on
            fireEvent.click(probe.getByText('toggle fff'));
            expect(probe.baseElement.innerHTML).toMatchInlineSnapshot(`"<div><button>toggle fft</button></div>"`);
            // -> advance | set present
            advance();
            expect(probe.baseElement.innerHTML).toMatchInlineSnapshot(`"<div><button>toggle ftt</button></div>"`);

            // -> off
            fireEvent.click(probe.getByText('toggle ftt'));
            expect(probe.baseElement.innerHTML).toMatchInlineSnapshot(`"<div><button>toggle ftf</button></div>"`);
            // -> advance | set present
            advance();
            expect(probe.baseElement.innerHTML).toMatchInlineSnapshot(`"<div><button>toggle tff</button></div>"`);
        });

        it('scattered', async () => {
            jest.useFakeTimers();

            let resolve:any;
            const lazyPromise = new Promise<{default:FC<any>}>(r => {
                resolve=r;
            })

            const LazyComponent = lazy(() => lazyPromise)

            const TestSuite = () => {
                const [on, setOn] = useState(false);
                const state = useScatteredContinuousState(on);

                return (
                    <>
                        <button onClick={() => setOn(!on)}>
                            toggle {state.past ? 't' : 'f'}
                            {state.present ? 't' : 'f'}
                            {state.future ? 't' : 'f'}
                        </button>
                        {state.defined && (
                            <Suspense fallback="loading">
                                <LazyComponent effector={<state.DefinePresent/>}/>
                            </Suspense>
                        )}
                    </>
                );
            };

            const probe = render(<TestSuite/>);
            expect(probe.baseElement.innerHTML).toMatchInlineSnapshot(`"<div><button>toggle fff</button></div>"`);
            // -> on
            fireEvent.click(probe.getByText('toggle fff'));
            expect(probe.baseElement.innerHTML).toMatchInlineSnapshot(`"<div><button>toggle fft</button>loading</div>"`);
            // -> advance | set present
            advance();
            expect(probe.baseElement.innerHTML).toMatchInlineSnapshot(`"<div><button>toggle fft</button>loading</div>"`);
            // -> resolve
            resolve({default: ({effector}: any) => <>resolved{effector}</>});
            expect(probe.baseElement.innerHTML).toMatchInlineSnapshot(`"<div><button>toggle fft</button>loading</div>"`);
            // wait for lazy
            await act(async () => {});

            expect(probe.baseElement.innerHTML).toMatchInlineSnapshot(`"<div><button>toggle fft</button>resolved</div>"`);
            advance();
            expect(probe.baseElement.innerHTML).toMatchInlineSnapshot(`"<div><button>toggle ftt</button>resolved</div>"`);
        })
    });
});
