const GITHUB_REPO = "kikeda1102/beatmist-releases";

interface Env {
  GITHUB_TOKEN: string;
}

interface GitHubAsset {
  name: string;
  browser_download_url: string;
}

interface GitHubRelease {
  tag_name: string;
  assets: GitHubAsset[];
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`,
      {
        headers: {
          "User-Agent": "BeatMist-Releases-API",
          Authorization: `token ${env.GITHUB_TOKEN}`,
        },
      },
    );

    if (!res.ok) {
      return Response.json(
        { error: "Failed to fetch latest release from GitHub" },
        { status: 502 },
      );
    }

    const data: GitHubRelease = await res.json();

    const assets = data.assets
      .filter((a) => a.name.endsWith(".dmg") || a.name.endsWith(".exe"))
      .map((a) => ({
        name: a.name,
        browser_download_url: a.browser_download_url,
      }));

    return new Response(
      JSON.stringify({ tag_name: data.tag_name, assets }),
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, s-maxage=300",
        },
      },
    );
  } catch {
    return Response.json(
      { error: "Failed to fetch latest release from GitHub" },
      { status: 502 },
    );
  }
};
