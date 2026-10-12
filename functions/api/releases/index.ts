import {
  logGitHubRequestFailure,
  logGitHubResponseError,
} from "../../lib/logGitHubError";

const GITHUB_REPO = "kikeda1102/beatmist-releases";
const LOG_TAG = "Releases";

interface Env {
  GITHUB_TOKEN: string;
}

interface GitHubRelease {
  tag_name: string;
  published_at: string;
  body: string | null;
  prerelease: boolean;
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/releases`,
      {
        headers: {
          "User-Agent": "BeatMist-Releases-API",
          Authorization: `token ${env.GITHUB_TOKEN}`,
        },
      },
    );

    if (!res.ok) {
      await logGitHubResponseError(LOG_TAG, res);
      return Response.json(
        { error: "Failed to fetch releases from GitHub" },
        { status: 502 },
      );
    }

    const data: GitHubRelease[] = await res.json();

    const releases = data.filter((r) => !r.prerelease).map((r) => ({
      tag_name: r.tag_name,
      published_at: r.published_at,
      body: r.body,
    }));

    return new Response(JSON.stringify(releases), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=600",
      },
    });
  } catch (err) {
    logGitHubRequestFailure(LOG_TAG, err);
    return Response.json(
      { error: "Failed to fetch releases from GitHub" },
      { status: 502 },
    );
  }
};
