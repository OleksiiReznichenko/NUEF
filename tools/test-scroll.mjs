import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { runInNewContext } from 'node:vm';

const source = readFileSync(resolve(import.meta.dirname, '../assets/js/script.js'), 'utf8');
const demoStyle = readFileSync(resolve(import.meta.dirname, '../assets/css/demo.css'), 'utf8');
const demoScss = readFileSync(resolve(import.meta.dirname, '../assets/scss/layout/_demo.scss'), 'utf8');
assert.equal(demoStyle, demoScss, 'Compiled demo CSS must match its plain-SCSS source');
assert.match(demoStyle, /body\s*\{\s*overflow-x: clip;\s*overflow-y: visible;/,
  'The body must not create a competing vertical scroll context');
assert.match(demoStyle, /height: 100svh;/, 'Mobile scenes must use stable viewport heights');
assert.match(source, /anticipatePin: 1/, 'Header pin needs scroll-anticipation');

function prepare({ width = 1440, height = 900, coarse = false, reducedMotion = false, library = true } = {}) {
  const calls = [];
  const window = {
    innerWidth: width,
    innerHeight: height,
    matchMedia(query) {
      return { matches: query.includes('pointer: coarse') ? coarse : reducedMotion };
    },
    gsap: {},
    ScrollTrigger: {},
  };
  if (library) window.SmoothScroll = (options) => calls.push(options);
  const gsap = { registerPlugin(plugin) { calls.push(['plugin', plugin]); } };
  const context = { window, gsap, ScrollTrigger: window.ScrollTrigger,
    document: { addEventListener() {} }, navigator: {}, console };
  runInNewContext(source, context, { filename: 'script.js' });
  const Animations = runInNewContext('AppAnimations', context);
  return { app: Object.create(Animations.prototype), calls };
}

const desktop = prepare();
desktop.app._librariesPluginsInit();
assert.equal(desktop.calls.length, 2, 'SmoothScroll and ScrollTrigger initialize on desktop');
assert.equal(desktop.calls[0].animationTime, 600);
assert.equal(desktop.calls[0].touchpadSupport, true);
assert.equal(desktop.app._scrollDistance('header'), 1175);
assert.equal(desktop.app._scrollDistance('disc'), 1377);
assert.equal(desktop.app._scrollDistance('phone'), 1539);
assert.equal(desktop.app._scrollDistance('studio'), 2187);

const mobile = prepare({ width: 375, height: 800, coarse: true });
mobile.app._librariesPluginsInit();
assert.equal(mobile.calls.length, 1, 'Touch devices keep native scrolling');
assert.equal(mobile.app._scrollDistance('header'), 828);
assert.equal(mobile.app._scrollDistance('studio'), 1656);

const reduced = prepare({ reducedMotion: true });
reduced.app._librariesPluginsInit();
assert.equal(reduced.calls.length, 1, 'Reduced-motion preference disables smooth wheel override');

const offline = prepare({ library: false });
offline.app._librariesPluginsInit();
assert.equal(offline.calls.length, 1, 'Missing CDN script falls back without crashing');

console.log('Scroll checks passed: original wheel settings, desktop/mobile pacing, reduced-motion and CDN fallback.');
