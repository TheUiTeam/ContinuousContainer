(window.webpackJsonp = window.webpackJsonp || []).push([
  [2],
  {
    '7OsV': function(e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, '_frontmatter', function() {
          return r;
        }),
        n.d(t, 'default', function() {
          return u;
        });
      n('5hJT'), n('W1QL'), n('K/PF'), n('t91x'), n('75LO'), n('PJhk');
      var a = n('SAVP'),
        i = n('TjRS');
      n('aD51');
      function o() {
        return (o =
          Object.assign ||
          function(e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
            }
            return e;
          }).apply(this, arguments);
      }
      var r = {};
      void 0 !== r &&
        r &&
        r === Object(r) &&
        Object.isExtensible(r) &&
        !r.hasOwnProperty('__filemeta') &&
        Object.defineProperty(r, '__filemeta', {
          configurable: !0,
          value: { name: '_frontmatter', filename: 'README.md' },
        });
      var s = { _frontmatter: r },
        l = i.a;
      function u(e) {
        var t = e.components,
          n = (function(e, t) {
            if (null == e) return {};
            var n,
              a,
              i = {},
              o = Object.keys(e);
            for (a = 0; a < o.length; a++) (n = o[a]), t.indexOf(n) >= 0 || (i[n] = e[n]);
            return i;
          })(e, ['components']);
        return Object(a.b)(
          l,
          o({}, s, n, { components: t, mdxType: 'MDXLayout' }),
          Object(a.b)(
            'div',
            { align: 'center' },
            '🧒 - 👨‍🦱 - 👨‍🦳',
            Object(a.b)('h1', null, 'Continuous Container'),
            Object(a.b)('br', null),
            'Something with known past, present, and the future',
            Object(a.b)('br', null),
            Object(a.b)('br', null),
            Object(a.b)(
              'a',
              { href: 'https://www.npmjs.com/package/@theuiteam/ContinuousContainer' },
              Object(a.b)('img', {
                src: 'https://img.shields.io/npm/v/@theuiteam/@theuiteam/ContinuousContainer.svg?style=flat-square',
              })
            )
          ),
          Object(a.b)('h2', { id: 'idea' }, 'Idea'),
          Object(a.b)(
            'p',
            null,
            'This is almost ',
            Object(a.b)('inlineCode', { parentName: 'p' }, 'react transition group'),
            ', made differently...'
          ),
          Object(a.b)(
            'p',
            null,
            'Why ',
            Object(a.b)(
              'a',
              o({ parentName: 'p' }, { href: 'https://github.com/reactjs/react-transition-group' }),
              'react transition group'
            ),
            '?\nBecause it ',
            Object(a.b)('strong', { parentName: 'p' }, 'keeps children'),
            ' after you remove them, to perform a fade animation,\nand we are going the same, but with state.'
          ),
          Object(a.b)(
            'p',
            null,
            'It\'s just about tracking what value "would" be, what is "right now", and what is "was".\nHowever, it\'s actually a bit inverted'
          ),
          Object(a.b)(
            'ul',
            null,
            Object(a.b)(
              'li',
              { parentName: 'ul' },
              Object(a.b)('inlineCode', { parentName: 'li' }, 'future'),
              ' - the next value. The value you given.'
            ),
            Object(a.b)(
              'li',
              { parentName: 'ul' },
              Object(a.b)('inlineCode', { parentName: 'li' }, 'present'),
              ' - synchronized with the ',
              Object(a.b)('inlineCode', { parentName: 'li' }, 'future'),
              ' one "tick" later'
            ),
            Object(a.b)(
              'li',
              { parentName: 'ul' },
              Object(a.b)('inlineCode', { parentName: 'li' }, 'past'),
              ' - synchronized with the ',
              Object(a.b)('inlineCode', { parentName: 'li' }, 'present'),
              ' "timeout" later'
            )
          ),
          Object(a.b)('h2', { id: 'usage' }, 'Usage'),
          Object(a.b)(
            'p',
            null,
            "Let's imagine you have a switch. Which controls visibility of something, but you\nalso want to add some animation."
          ),
          Object(a.b)('p', null, "Let's handle these cases separately:"),
          Object(a.b)(
            'pre',
            null,
            Object(a.b)(
              'code',
              o({ parentName: 'pre' }, { className: 'language-typescript', metastring: 'jsx', jsx: !0 }),
              'const App = () => {\n  const [on, setOn] = useState(false);\n\n  return (\n    <div>\n      <button onClick={() => setOn(on => !on)}>Toggle</button>\n      // would be instanly hidden and shown\n      {on && <Content />}\n      // would be animated, but would be ALWAYS rendered\n      <ContentWithAnimation visible={on} />}\n    </div>\n  );\n};\n'
            )
          ),
          Object(a.b)('p', null, "Now let's imagine you dont want to render Content when it's not visible."),
          Object(a.b)('p', null, 'Ok, "when it\'s not visible"? - AnimationTimeout after being hidden'),
          Object(a.b)(
            'pre',
            null,
            Object(a.b)(
              'code',
              o({ parentName: 'pre' }, { className: 'language-typescript', metastring: 'jsx', jsx: !0 }),
              'import {ContinuousContainer} from \'@theuiteam/ContinuousContainer\';\n\nconst App = () => {\n  const [on, setOn] = useState(false);\n\n  return (\n    <div>\n      <button onClick={() => setOn(on => !on)}>Toggle</button>\n\n      <ContinuousContainer value={on} timeout={300}>\n       {(past, present, future) =>\n       // display if it\n       // - was displayed <300ms ago\n       // - is displayed\n       // - would be displayed next time\n         (past || present || future) &&\n         <ContentWithAnimation visible={present}/>\n         // ^^ use the "present" value\n       )}\n    </div>\n  )\n}\n'
            )
          ),
          Object(a.b)('h3', { id: 'additional-api' }, 'Additional API'),
          Object(a.b)('p', null, 'Of course a ', Object(a.b)('inlineCode', { parentName: 'p' }, 'hook')),
          Object(a.b)(
            'pre',
            null,
            Object(a.b)(
              'code',
              o({ parentName: 'pre' }, { className: 'language-js' }),
              'const [past, present, future] = useContinuousState(value, timeout);\n'
            )
          ),
          Object(a.b)('h1', { id: 'license' }, 'License'),
          Object(a.b)('p', null, 'MIT')
        );
      }
      u &&
        u === Object(u) &&
        Object.isExtensible(u) &&
        !u.hasOwnProperty('__filemeta') &&
        Object.defineProperty(u, '__filemeta', {
          configurable: !0,
          value: { name: 'MDXContent', filename: 'README.md' },
        }),
        (u.isMDXComponent = !0);
    },
  },
]);
//# sourceMappingURL=component---readme-md-056fa342a1c58032d70b.js.map
