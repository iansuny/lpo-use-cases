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

  // Load DY scripts
  var scripts = [
    '//cdn.dynamicyield.com/api/${config.sessionId}/api_dynamic.js',
    '//cdn.dynamicyield.com/api/${config.sessionId}/api_static.js'
  ];
  scripts.forEach(function(src) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    document.head.appendChild(script);
  });
})();`;
}
