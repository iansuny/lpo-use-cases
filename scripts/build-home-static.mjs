// Post-process the Astro build into a self-contained static Horizon Bank
// landing page (index.html + style.css + app.js) with NO demo overlay / gear.
//
// Usage: npm run build && node scripts/build-home-static.mjs
// Output: home-static/

import { readFile, writeFile, mkdir, copyFile, access } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = 'dist';
const OUT = 'home-static';
const BASE = '/lpo-use-cases';

const exists = async (p) => {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
};

const html = await readFile(join(DIST, 'index.html'), 'utf8');

// Locate the built CSS bundle referenced in <head>.
const cssMatch = html.match(/href="([^"]*\/_astro\/[^"]+\.css)"/);
if (!cssMatch) throw new Error('Could not find the built CSS link in dist/index.html');
const cssFile = cssMatch[1].split('/_astro/')[1];
const css = await readFile(join(DIST, '_astro', cssFile), 'utf8');

let out = html;

// 1. Remove the DemoOverlay island (the gear button + all use-case overlays).
out = out.replace(/<astro-island[\s\S]*?<\/astro-island>/g, '');

// 2. Remove Astro's hydration runtime + any other inline scripts — the static
//    landing page needs none of them.
out = out.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');

// 3. Drop the now-unused astro-island helper style.
out = out.replace(/<style>astro-island[\s\S]*?<\/style>/g, '');

// 4. Point the stylesheet at our local copy.
out = out.replace(
  /<link rel="stylesheet"[^>]*href="[^"]*\/_astro\/[^"]+\.css"[^>]*>/,
  '<link rel="stylesheet" href="style.css" />',
);

// 5. Make base-path asset URLs relative (favicon, etc.).
out = out.replaceAll(`${BASE}/`, '');
out = out.replaceAll(BASE, '');

// 6. Reference our small enhancement script.
out = out.replace('</body>', '  <script src="app.js"></script>\n</body>');

const appJs = `// Static Horizon Bank landing page — smooth in-page anchor scrolling.
document.addEventListener('click', function (e) {
  var a = e.target.closest('a[href^="#"]');
  if (!a) return;
  var id = a.getAttribute('href').slice(1);
  if (!id) return;
  var el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
`;

await mkdir(OUT, { recursive: true });
await writeFile(join(OUT, 'index.html'), out);
await writeFile(join(OUT, 'style.css'), css);
await writeFile(join(OUT, 'app.js'), appJs);

// Copy the favicon if present.
if (await exists(join(DIST, 'favicon.svg'))) {
  await copyFile(join(DIST, 'favicon.svg'), join(OUT, 'favicon.svg'));
}

const kb = (s) => (Buffer.byteLength(s) / 1024).toFixed(1) + ' KB';
console.log('\n✅ Static home page → ' + OUT + '/');
console.log('   index.html: ' + kb(out));
console.log('   style.css:  ' + kb(css));
console.log('   app.js:     ' + kb(appJs));
