// Build a compact self-contained widget fragment of the landing page.
// The page is almost entirely inline-styled; the only Tailwind classes are the
// 5 on <body>, which we inline — so the 28KB Tailwind bundle is dropped.
import { readFile, writeFile } from 'node:fs/promises';

const html = await readFile('home-static/index.html', 'utf8');
const appJs = await readFile('home-static/app.js', 'utf8');

const headStyles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n');
const bodyMatch = html.match(/<body([^>]*)>([\s\S]*?)<\/body>/);
const bodyInner = bodyMatch[2].replace(/<script src="app.js"><\/script>/, '');

// Inline the body's Tailwind utilities (min-h-screen bg-white text-gray-900 flex flex-col).
const wrapperStyle =
  "min-height:100vh;background:#fff;color:#111827;display:flex;flex-direction:column;" +
  "font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;";

const widget =
  `<style>\n${headStyles}\n</style>\n` +
  `<div style="${wrapperStyle}">${bodyInner}</div>\n` +
  `<script>${appJs}</script>`;

await writeFile('home-static/_widget.html', widget);
console.log(JSON.stringify({ widgetSize: widget.length }));
