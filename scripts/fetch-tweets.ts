import { getTweet } from "react-tweet/api";
import { writeFileSync } from "fs";
import { resolve } from "path";

const TWEET_IDS = [
  "2050889538466447504",
  "2050549215412318219",
  "2049683478967693756",
];

interface CachedQuotedTweet {
  id_str: string;
  text: string;
  user: {
    name: string;
    screen_name: string;
    profile_image_url_https: string;
  };
  video?: {
    poster: string;
    variants: { type: string; src: string; bitrate?: number }[];
    aspectRatio: [number, number];
  };
  photos?: { url: string; width: number; height: number }[];
}

interface CachedTweet {
  id_str: string;
  text: string;
  created_at: string;
  favorite_count: number;
  conversation_count: number;
  user: {
    name: string;
    screen_name: string;
    profile_image_url_https: string;
    is_blue_verified: boolean;
  };
  quoted_tweet?: CachedQuotedTweet;
}

async function main() {
  const tweets: CachedTweet[] = [];

  for (const id of TWEET_IDS) {
    const tweet = await getTweet(id);
    if (!tweet) {
      console.warn(`Tweet ${id} not found, skipping`);
      continue;
    }

    const cached: CachedTweet = {
      id_str: tweet.id_str,
      text: tweet.text,
      created_at: tweet.created_at,
      favorite_count: tweet.favorite_count,
      conversation_count: tweet.conversation_count,
      user: {
        name: tweet.user.name,
        screen_name: tweet.user.screen_name,
        profile_image_url_https: tweet.user.profile_image_url_https,
        is_blue_verified: tweet.user.is_blue_verified,
      },
    };

    if (tweet.quoted_tweet) {
      const qt = tweet.quoted_tweet;
      cached.quoted_tweet = {
        id_str: qt.id_str,
        text: qt.text,
        user: {
          name: qt.user.name,
          screen_name: qt.user.screen_name,
          profile_image_url_https: qt.user.profile_image_url_https,
        },
      };

      if (qt.video) {
        cached.quoted_tweet.video = {
          poster: qt.video.poster,
          variants: qt.video.variants.map((v) => ({
            type: v.type,
            src: v.src,
            ...("bitrate" in v ? { bitrate: v.bitrate } : {}),
          })),
          aspectRatio: qt.video.aspectRatio,
        };
      }

      if (qt.photos && qt.photos.length > 0) {
        cached.quoted_tweet.photos = qt.photos.map((p) => ({
          url: p.url,
          width: p.width,
          height: p.height,
        }));
      }
    }

    tweets.push(cached);
    console.log(`Fetched: @${tweet.user.screen_name} - ${tweet.text.substring(0, 40)}...`);
  }

  const outPath = resolve(import.meta.dirname, "../src/data/tweets.json");
  writeFileSync(outPath, JSON.stringify(tweets, null, 2), "utf-8");
  console.log(`\nSaved ${tweets.length} tweets to ${outPath}`);
}

main().catch((err) => {
  console.error("Failed to fetch tweets:", err);
  process.exit(1);
});
