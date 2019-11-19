(window.webpackJsonp = window.webpackJsonp || []).push([
  [3],
  {
    OpRp: function(n, e, t) {
      'use strict';
      t.r(e),
        t.d(e, '_frontmatter', function() {
          return r;
        }),
        t.d(e, 'default', function() {
          return d;
        });
      t('5hJT'), t('W1QL'), t('K/PF'), t('t91x'), t('75LO'), t('PJhk');
      var o = t('SAVP'),
        i = t('TjRS'),
        u = t('mXGw'),
        l = t('ZFoC'),
        a = t('0rX0');
      t('aD51');
      function s() {
        return (s =
          Object.assign ||
          function(n) {
            for (var e = 1; e < arguments.length; e++) {
              var t = arguments[e];
              for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (n[o] = t[o]);
            }
            return n;
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
          value: { name: '_frontmatter', filename: 'src/ContinuousContainer.mdx' },
        });
      var b = { _frontmatter: r },
        c = i.a;
      function d(n) {
        var e = n.components,
          t = (function(n, e) {
            if (null == n) return {};
            var t,
              o,
              i = {},
              u = Object.keys(n);
            for (o = 0; o < u.length; o++) (t = u[o]), e.indexOf(t) >= 0 || (i[t] = n[t]);
            return i;
          })(n, ['components']);
        return Object(o.b)(
          c,
          s({}, b, t, { components: e, mdxType: 'MDXLayout' }),
          Object(o.b)('h1', { id: 'continuous-container' }, 'Continuous Container'),
          Object(o.b)(
            'p',
            null,
            'Renderless container with a ',
            Object(o.b)('em', { parentName: 'p' }, 'Continuous'),
            ' State'
          ),
          Object(o.b)(l.d, { of: a.a, mdxType: 'Props' }),
          Object(o.b)('h1', { id: 'common-case---yes-or-no' }, 'Common case - YES or NO'),
          Object(o.b)(
            'p',
            null,
            "Let's imagine you have a switch. Which controls visibility of something, but you\nalso want to add some animation."
          ),
          Object(o.b)('p', null, "Let's handle these cases separately: "),
          Object(o.b)(
            l.c,
            {
              __position: 1,
              __code:
                '() => {\n  const [on, setOn] = useState(false)\n\n  return (\n    <div>\n      <button onClick={() => setOn(on => !on)}>Toggle</button>\n\n      <p>\n        the following content would be __instanly__ hidden or shown\n        {on && <div>shown</div>}\n        {!on && <div>hidden</div>}\n      </p>\n    </div>\n  )\n}',
              __scope: {
                props: t,
                DefaultLayout: i.a,
                useState: u.useState,
                Playground: l.c,
                Props: l.d,
                ContinuousContainer: a.a,
              },
              mdxType: 'Playground',
            },
            function() {
              var n = Object(u.useState)(!1),
                e = n[0],
                t = n[1];
              return Object(o.b)(
                'div',
                null,
                Object(o.b)(
                  'button',
                  {
                    onClick: function() {
                      return t(function(n) {
                        return !n;
                      });
                    },
                  },
                  'Toggle'
                ),
                Object(o.b)(
                  'p',
                  null,
                  'the following content would be __instanly__ hidden or shown',
                  e && Object(o.b)('div', null, 'shown'),
                  !e && Object(o.b)('div', null, 'hidden')
                )
              );
            }
          ),
          Object(o.b)('br', null),
          Object(o.b)('br', null),
          Object(o.b)(
            'h1',
            { id: 'improved-case---yesnowas-just-a-second-ago' },
            'Improved case - YES/NO/WAS JUST A SECOND AGO'
          ),
          Object(o.b)('p', null, "Now let's imagine you dont want to render Content when it's not visible."),
          Object(o.b)(
            'p',
            null,
            'Ok, "when it\'s not visible"? - ',
            Object(o.b)('em', { parentName: 'p' }, 'AnimationTimeout'),
            ' after being hidden'
          ),
          Object(o.b)(
            l.c,
            {
              __position: 3,
              __code:
                "() => {\n  const [on, setOn] = useState(false)\n\n  return (\n    <div>\n      <button onClick={() => setOn(on => !on)}>Toggle</button>\n\n      <p>\n        the following content would be __instanly__ shown, but hidden in a\n        timeout\n        <ContinuousContainer value={on} timeout={3000}>\n          {(past, present, future) => (\n            <>\n              <ul>\n                <li>past - {String(past)} - going to be delayed by 3s</li>\n                <li>present - {String(present)}</li>\n                <li>future - {String(future)}</li>\n              </ul>\n\n              {// display if it\n              // - was displayed <300ms ago\n              // - is displayed\n              // - would be displayed next tick\n\n              past || present || future ? (\n                <div> {present ? 'is shown now' : 'still have to show'}</div>\n              ) : (\n                <div>hidden</div>\n              )}\n            </>\n          )}\n        </ContinuousContainer>\n      </p>\n    </div>\n  )\n}",
              __scope: {
                props: t,
                DefaultLayout: i.a,
                useState: u.useState,
                Playground: l.c,
                Props: l.d,
                ContinuousContainer: a.a,
              },
              mdxType: 'Playground',
            },
            function() {
              var n = Object(u.useState)(!1),
                e = n[0],
                t = n[1];
              return Object(o.b)(
                'div',
                null,
                Object(o.b)(
                  'button',
                  {
                    onClick: function() {
                      return t(function(n) {
                        return !n;
                      });
                    },
                  },
                  'Toggle'
                ),
                Object(o.b)(
                  'p',
                  null,
                  'the following content would be __instanly__ shown, but hidden in a timeout',
                  Object(o.b)(a.a, { value: e, timeout: 3e3, mdxType: 'ContinuousContainer' }, function(n, e, t) {
                    return Object(o.b)(
                      React.Fragment,
                      null,
                      Object(o.b)(
                        'ul',
                        null,
                        Object(o.b)('li', null, 'past - ', String(n), ' - going to be delayed by 3s'),
                        Object(o.b)('li', null, 'present - ', String(e)),
                        Object(o.b)('li', null, 'future - ', String(t))
                      ),
                      n || e || t
                        ? Object(o.b)('div', null, ' ', e ? 'is shown now' : 'still have to show')
                        : Object(o.b)('div', null, 'hidden')
                    );
                  })
                )
              );
            }
          ),
          Object(o.b)(
            'p',
            null,
            'You dont have to use ',
            Object(o.b)('inlineCode', { parentName: 'p' }, 'future'),
            ' in all the cases. You will figure out the right cases by your own'
          )
        );
      }
      d &&
        d === Object(d) &&
        Object.isExtensible(d) &&
        !d.hasOwnProperty('__filemeta') &&
        Object.defineProperty(d, '__filemeta', {
          configurable: !0,
          value: { name: 'MDXContent', filename: 'src/ContinuousContainer.mdx' },
        }),
        (d.isMDXComponent = !0);
    },
  },
]);
//# sourceMappingURL=component---src-continuous-container-mdx-ac8979f7a2f65d254853.js.map
