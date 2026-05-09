import type { Plugin } from "vite";

export function styledComponentsSSR(): Plugin {
  return {
    name: "styled-components-ssr",
    enforce: "pre",
    transform(code, id) {
      if (
        !id.includes("@astrojs/react") ||
        !id.includes("server") ||
        !id.endsWith(".js")
      ) {
        return null;
      }

      if (!code.includes("renderToStaticMarkup")) {
        return null;
      }

      let transformed = code;

      transformed =
        `import { ServerStyleSheet as __ServerStyleSheet } from 'styled-components';\n` +
        transformed;

      transformed = transformed.replace(
        "const vnode = React.createElement(Component, newProps);",
        "const __sheet = new __ServerStyleSheet();\n  const vnode = __sheet.collectStyles(React.createElement(Component, newProps));",
      );

      transformed = transformed.replace(
        "return { html, attrs };",
        "try { html = __sheet.getStyleTags() + html; } catch(e) {} finally { __sheet.seal(); }\n  return { html, attrs };",
      );

      return { code: transformed, map: null };
    },
  };
}