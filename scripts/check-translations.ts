import { readFileSync, readdirSync } from "fs";
import { join, basename } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const srcDir = join(__dirname, "..", "src");

function extractJapaneseStrings(filePath: string): Set<string> {
  const content = readFileSync(filePath, "utf-8");
  const strings = new Set<string>();
  const japaneseRegex = /[　-〿぀-ゟ゠-ヿ一-鿿＀-￯]/;

  const stringRegex = /"([^"]*?)"|'([^']*?)'/g;
  let match;
  while ((match = stringRegex.exec(content)) !== null) {
    const str = match[1] ?? match[2];
    if (str && japaneseRegex.test(str)) {
      strings.add(str);
    }
  }

  return strings;
}

function collectKeysFromContent(): Set<string> {
  const contentPath = join(srcDir, "data", "content.ts");
  return extractJapaneseStrings(contentPath);
}

function collectKeysFromComponents(): Set<string> {
  const keys = new Set<string>();
  const componentsDir = join(srcDir, "components");

  function scanDir(dir: string) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts")) {
        const tCallRegex = /\bt\(\s*["']([^"']+)["']\s*\)/g;
        const content = readFileSync(fullPath, "utf-8");
        let match;
        while ((match = tCallRegex.exec(content)) !== null) {
          const key = match[1];
          if (key) {
            keys.add(key);
          }
        }
      }
    }
  }

  scanDir(componentsDir);
  return keys;
}

async function loadTranslation(
  locale: string,
): Promise<Record<string, string>> {
  const filePath = join(srcDir, "i18n", "translations", `${locale}.ts`);
  const mod = await import(filePath);
  return mod.default;
}

function getAvailableLocales(): string[] {
  const translationsDir = join(srcDir, "i18n", "translations");
  return readdirSync(translationsDir)
    .filter((f) => f.endsWith(".ts"))
    .map((f) => basename(f, ".ts"));
}

async function main() {
  const contentKeys = collectKeysFromContent();
  const componentKeys = collectKeysFromComponents();
  const allKeys = new Set([...contentKeys, ...componentKeys]);

  const locales = getAvailableLocales();
  let hasErrors = false;

  console.log(`Found ${allKeys.size} translation keys`);
  console.log(`Checking ${locales.length} locale(s): ${locales.join(", ")}\n`);

  for (const locale of locales) {
    const translation = await loadTranslation(locale);
    const translationKeys = new Set(Object.keys(translation));

    const missing = [...allKeys].filter((key) => !translationKeys.has(key));
    const unused = [...translationKeys].filter((key) => !allKeys.has(key));

    if (missing.length > 0) {
      hasErrors = true;
      console.error(`[${locale}] Missing ${missing.length} translation(s):`);
      for (const key of missing) {
        console.error(`  - "${key}"`);
      }
    }

    if (unused.length > 0) {
      hasErrors = true;
      console.error(`[${locale}] Unused ${unused.length} translation(s):`);
      for (const key of unused) {
        console.error(`  - "${key}"`);
      }
    }

    if (missing.length === 0 && unused.length === 0) {
      console.log(`[${locale}] All translations are complete.`);
    }
  }

  if (hasErrors) {
    process.exit(1);
  }

  console.log("\nAll translation checks passed.");
}

main();
