import type { DyScriptConfig } from '../config-schemas';

export function generateDyScriptScript(config: DyScriptConfig): string {
  return `// ==UserScript==
// @name         DY Test - Client Site
// @namespace    https://github.com/iansun/lpo-use-cases
// @version      1.0
// @description  Inject DynamicYield scripts for testing
// @match        ${config.matchUrl}
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
  'use strict';
  console.log('Script implemented.');

  // Preconnect links
  var domains = [
    'https://cdn.dynamicyield.com',
    'https://st.dynamicyield.com',
    'https://rcom.dynamicyield.com'
  ];
  domains.forEach(function(href) {
    var link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = href;
    document.head.appendChild(link);
  });

  // DY config
  window.DY = window.DY || {};
  // window.DY.recommendationContext = { type: '{page type}', data: ['data'] };

  // Load DY scripts via fetch + eval (inject JS directly)
  var scripts = [
    'https://cdn.dynamicyield.com/api/${config.sessionId}/api_dynamic.js',
    'https://cdn.dynamicyield.com/api/${config.sessionId}/api_static.js'
  ];
  scripts.reduce(function(chain, url) {
    return chain.then(function() {
      return fetch(url)
        .then(function(r) { return r.text(); })
        .then(function(code) { (1, eval)(code); });
    });
  }, Promise.resolve());
})();`;
}
