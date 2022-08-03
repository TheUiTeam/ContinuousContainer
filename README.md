<div align="center">
🧒 - 👨‍🦱 - 👨‍🦳
  <h1>Continuous Container</h1>
  <br/>
  Something with known past, present, and the future 
  <br/>
  a `useState` aware of continuous nature of time
  <br/>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@theuiteam/continuous-container">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@theuiteam/continuous-container?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Types" href="https://www.npmjs.com/package/@theuiteam/continuous-container">
    <img alt="Types" src="https://img.shields.io/npm/types/@theuiteam/continuous-container?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@theuiteam/continuous-container?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i @theuiteam/continuous-container</pre>
<hr>


</div>

## Idea

This is almost `react transition group`, but for state management...

Why people [react transition group](https://github.com/reactjs/react-transition-group)? Because it 1) **takes a pause**
between steps letting classNames be applied and 2) **keeps children** after you remove them, to perform a fade
animation.

We are doing the same, but using state.

It's all about tracking what the value `would be`, what is `right now`, and what it `was`.
We call this ContinuousState

### ContinuousState

- `future` - the next value. The value you just set.
- `present` - to be synchronized with the `future` "later"
- `past` - to be synchronized with the `present` "later"

and

- `defined` - an indication that any of future, past or present are truthy.

# API

## useContinuousState(value, options)

- `value` - a value to assign to the `future`
- `options`
  - `delayPresent` - time in ms between `future` becoming `present`
  - `delayPast` - time in ms between `present` becoming `past`. For transitions, it usually equals to exist animation duration
  - `initialValue` - a value to be set as initial to the `past` and `present`. `future` is always equal to the `value` given as a first arg

## useScatteredContinuousState(value, options)

Call signature is equal to `useContinuousState`, returns an object with extra property `DefinePresent`. See example below.

## Usage

### Problem statement

Let's imagine you have a switch. Which controls visibility of something, but you also want to add some animation.

Let's handle these cases separately:

```typescript jsx
const App = () => {
    const [on, setOn] = useState(false);

    return (
        <div>
            <button onClick={() => setOn(on => !on)}>Toggle</button>
            // would be instanly hidden and shown
            {on && <Content/>}
            // would be animated, but would be ALWAYS rendered
            <ContentWithAnimation visible={on}/>}
        </div>
    );
};
```

Now let's imagine you want to **not render Content** _when_ it's not visible and not required.

Ok, "when is this _when_"?

- render `ContentWithAnimation` when it is _about_ to be displayed
- render `ContentWithAnimation` when it is displayed
- render `ContentWithAnimation` when it is no longer visible, but still animating toward hidden state

```typescript jsx
import { ContinuousContainer, useContinuousState } from '@theuiteam/continuous-container';

const App = () => {
  const [on, setOn] = useState(false);
  const continuousState = useContinuousState(on);

  return (
    <div>
      <button onClick={() => setOn((on) => !on)}>Toggle</button>
      {/*render if any of past/preset/future is set to true*/}
      {continuousState.defined && (
        <ContentWithAnimation visible={continuousState.present} />
        // wire the "present" state
      )}
      {/* or */}
      <ContinuousContainer value={on} timeout={300}>
        {
          ({past, present, future}) => (past || present || future) && <ContentWithAnimation visible={present} />
          // ^^ use the "present" value
        }
      </ContinuousContainer>
    </div>
  );
};
```

## Scattered

There are more sophisticated situations, when **setting up** something to display does not mean "display". Lazy loading
is a good case

```tsx
const App = () => {
  const continuousState = useContinuousState(on);
  return continuousState.defined && <LazyLoadedContentWithAnimation visible={continuousState.present} />;
};
```

In such case ContinuousState will update from `future` to `present` before `LazyLoadedContentWithAnimation` component is
loaded, breaking a connection between states.

In order to handle this problem one might need to _tap_ into rendering process using `useScatteredContinuousState`

```tsx
const continuousState = useScatteredContinuousState(on);
return (
  continuousState.defined && (
    <Suspense>
      <LazyLoadedContentWithAnimation visible={continuousState.present}>
        <continuousState.DefinePresent />
        {/*this component will advance ContinuousState once rendered*/}
      </LazyLoadedContentWithAnimation>
    </Suspense>
  )
);
```

For readability purposes we recommend putting DefinePresent to a separate slot different from `children`.

```tsx
<LazyLoadedContentWithAnimation visible={continuousState.present} effector={<continuousState.DefinePresent />} />
```

###### ⚠️⚠️⚠️⚠️⚠️⚠️⚠️

The following code will NOT work as `DefinePresent` will be rendered instantly, even if suspense will be in fallback

```tsx
<Suspense>
  // will not be rendred until ready
  <LazyLoadedContentWithAnimation visible={continuousState.present} />
  // will be rendered too early
  <continuousState.DefinePresent />
</Suspense>
```

# See also

- [Phased](https://github.com/theKashey/recondition#phased) Container from a `recondition` library

# License

MIT
