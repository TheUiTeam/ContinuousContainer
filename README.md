<div align="center">
🧒 - 👨‍🦱 - 👨‍🦳
  <h1>Continuous Container</h1>
  <br/>
  Something with known past, present, and the future 
  <br/>
  <br/>
    <a href="https://www.npmjs.com/package/@theuiteam/ContinuousContainer">
      <img src="https://img.shields.io/npm/v/@theuiteam/@theuiteam/ContinuousContainer.svg?style=flat-square" />
    </a>

</div>

## Idea

This is almost `react transition group`, made differently...

Why [react transition group](https://github.com/reactjs/react-transition-group)?
Because it **keeps children** after you remove them, to perform a fade animation,
and we are going the same, but with state.

It's just about tracking what value "would" be, what is "right now", and what is "was".
However, it's actually a bit inverted

- `future` - the next value. The value you given.
- `present` - synchronized with the `future` one "tick" later
- `past` - synchronized with the `present` "timeout" later

## Usage

Let's imagine you have a switch. Which controls visibility of something, but you
also want to add some animation.

Let's handle these cases separately:

```typescript jsx
const App = () => {
  const [on, setOn] = useState(false);

  return (
    <div>
      <button onClick={() => setOn(on => !on)}>Toggle</button>
      // would be instanly hidden and shown
      {on && <Content />}
      // would be animated, but would be ALWAYS rendered
      <ContentWithAnimation visible={on} />}
    </div>
  );
};
```

Now let's imagine you dont want to render Content when it's not visible.

Ok, "when it's not visible"? - AnimationTimeout after being hidden

```typescript jsx
import {ContinuousContainer} from '@theuiteam/ContinuousContainer';

const App = () => {
  const [on, setOn] = useState(false);

  return (
    <div>
      <button onClick={() => setOn(on => !on)}>Toggle</button>

      <ContinuousContainer value={on} timeout={300}>
       {(past, present, future) =>
       // display if it
       // - was displayed <300ms ago
       // - is displayed
       // - would be displayed next time
         (past || present || future) &&
         <ContentWithAnimation visible={present}/>
         // ^^ use the "present" value
       )}
    </div>
  )
}
```

### Additional API

Of course a `hook`

```js
const [past, present, future] = useContinuousState(value, timeout);
```

# License

MIT
