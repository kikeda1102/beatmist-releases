const GITHUB_REPO = "kikeda1102/beatmist-releases";

interface GitHubAsset {
  name: string;
  download_count: number;
}

interface GitHubRelease {
  tag_name: string;
  published_at: string;
  assets: GitHubAsset[];
}

interface AssetSummary {
  name: string;
  platform: string;
  downloads: number;
}

interface ReleaseSummary {
  version: string;
  date: string;
  assets: AssetSummary[];
  subtotal: number;
}

function detectPlatform(filename: string): string {
  if (filename.endsWith(".dmg")) return "mac";
  if (filename.endsWith(".exe")) return "win";
  return "other";
}

export const onRequestGet: PagesFunction = async () => {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/releases`,
    { headers: { "User-Agent": "BeatMist-Downloads-API" } },
  );

  if (!res.ok) {
    return Response.json(
      { error: "Failed to fetch releases from GitHub" },
      { status: 502 },
    );
  }

  const data: GitHubRelease[] = await res.json();

  let total = 0;
  const releases: ReleaseSummary[] = data.map((release) => {
    const assets: AssetSummary[] = release.assets
      .filter((asset) => detectPlatform(asset.name) !== "other")
      .map((asset) => {
        total += asset.download_count;
        return {
          name: asset.name,
          platform: detectPlatform(asset.name),
          downloads: asset.download_count,
        };
      });

    const subtotal = assets.reduce((sum, a) => sum + a.downloads, 0);

    return {
      version: release.tag_name,
      date: release.published_at.split("T")[0],
      assets,
      subtotal,
    };
  });

  return Response.json({ total, releases });
};
