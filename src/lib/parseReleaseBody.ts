export interface ReleaseChange {
  readonly type: "added" | "changed" | "fixed";
  readonly description: string;
}

const sectionMap: Record<string, ReleaseChange["type"]> = {
  "### 追加": "added",
  "### 変更": "changed",
  "### 修正": "fixed",
};

const sectionHeaders = Object.keys(sectionMap);

export function parseReleaseBody(body: string): ReleaseChange[] {
  const lines = body.split("\n");
  const changes: ReleaseChange[] = [];
  let currentType: ReleaseChange["type"] | null = null;

  for (const raw of lines) {
    const line = raw.trim();

    const matchedHeader = sectionHeaders.find((h) => line === h);
    if (matchedHeader) {
      currentType = sectionMap[matchedHeader];
      continue;
    }

    if (currentType && line.startsWith("- ")) {
      const description = line.slice(2).trim();
      if (description) {
        changes.push({ type: currentType, description });
      }
    }
  }

  return changes;
}
