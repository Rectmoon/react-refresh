import e from"react";!function(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&"undefined"!=typeof document){var a=document.head||document.getElementsByTagName("head")[0],o=document.createElement("style");o.type="text/css","top"===n&&a.firstChild?a.insertBefore(o,a.firstChild):a.appendChild(o),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(document.createTextNode(e))}}(".foo-bar{font-family:Avenir Next,Helvetica,Arial,sans-serif;color:#005f20}");export default function(t){return e.createElement("div",{"data-testid":"Input",className:"rainbow-Input"},t.foo)}