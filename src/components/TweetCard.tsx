import styled from "styled-components";
import { FaHeart, FaComment, FaLink } from "react-icons/fa";

interface TweetUser {
  name: string;
  screen_name: string;
  profile_image_url_https: string;
  is_blue_verified?: boolean;
}

interface QuotedTweet {
  id_str: string;
  text: string;
  user: Omit<TweetUser, "is_blue_verified">;
  video?: {
    poster: string;
    variants: { type: string; src: string; bitrate?: number }[];
    aspectRatio: [number, number];
  };
  photos?: { url: string; width: number; height: number }[];
}

export interface CachedTweet {
  id_str: string;
  text: string;
  created_at: string;
  favorite_count: number;
  conversation_count: number;
  user: TweetUser;
  quoted_tweet?: QuotedTweet;
}

const Card = styled.div`
  background: #17202a;
  border: 1px solid #38444d;
  border-radius: 1rem;
  padding: 0.75rem 1rem;
  color: #e7e9ea;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

const Avatar = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  flex-shrink: 0;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
`;

const UserNameLink = styled.a`
  font-weight: 700;
  font-size: 0.875rem;
  line-height: 1.25;
  color: #e7e9ea;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const HandleRow = styled.span`
  font-size: 0.8125rem;
  color: #71767b;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const FollowLink = styled.a`
  color: #1d9bf0;
  font-weight: 700;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const XLogo = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  margin-left: auto;
  fill: #e7e9ea;
`;

const Body = styled.p`
  font-size: 0.9375rem;
  line-height: 1.5;
  white-space: pre-line;
  color: #e7e9ea;
  margin-bottom: 0.75rem;
`;

const QuoteCard = styled.div`
  border: 1px solid #38444d;
  border-radius: 0.75rem;
  overflow: hidden;
  margin-bottom: 0.75rem;
`;

const QuoteContent = styled.div`
  padding: 0.75rem;
`;

const QuoteUserLine = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 0.25rem;
`;

const QuoteAvatar = styled.img`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  flex-shrink: 0;
`;

const QuoteUserName = styled.span`
  font-weight: 700;
  font-size: 0.8125rem;
  color: #e7e9ea;
`;

const QuoteHandle = styled.span`
  font-size: 0.8125rem;
  color: #71767b;
`;

const QuoteText = styled.p`
  font-size: 0.8125rem;
  line-height: 1.4;
  color: #e7e9ea;
  white-space: pre-line;
`;

const VideoContainer = styled.div<{ $ratio: string }>`
  position: relative;
  width: 100%;
  aspect-ratio: ${({ $ratio }) => $ratio};
  background: #000;
  cursor: pointer;
`;

const VideoPoster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;


const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 4.25rem;
  height: 4.25rem;
  background: rgba(29, 155, 240, 0.8);
  border: 4px solid #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;

  &:hover {
    background: rgba(29, 155, 240, 1);
  }
`;

const PlayTriangle = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 1rem 0 1rem 1.75rem;
  border-color: transparent transparent transparent #fff;
  margin-left: 0.25rem;
`;

const WatchOnX = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  font-size: 0.8125rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const PhotoImg = styled.img`
  width: 100%;
  display: block;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
`;

const DateText = styled.time`
  font-size: 0.8125rem;
  color: #71767b;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
`;

const InfoIcon = styled.svg`
  width: 1.125rem;
  height: 1.125rem;
  fill: #71767b;
  margin-left: auto;
  flex-shrink: 0;
`;

const Separator = styled.div`
  height: 1px;
  background: #38444d;
  margin-bottom: 0.5rem;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 0.5rem;
`;

const ActionItem = styled.a`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8125rem;
  font-weight: 700;
  color: #71767b;
  text-decoration: none;
  transition: color 0.2s;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;

  &:hover {
    color: #1d9bf0;
  }
`;

const ReadMore = styled.a`
  display: block;
  text-align: center;
  padding: 0.5rem;
  border: 1px solid #38444d;
  border-radius: 2rem;
  font-size: 0.8125rem;
  font-weight: 700;
  color: #1d9bf0;
  text-decoration: none;
  transition: background 0.2s;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;

  &:hover {
    background: rgba(29, 155, 240, 0.1);
  }
`;

const VerifiedBadge = () => (
  <svg width="17" height="17" viewBox="0 0 22 22" fill="#1d9bf0">
    <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.855-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.69-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.636.433 1.221.878 1.69.47.446 1.055.752 1.69.883.635.13 1.294.083 1.902-.143.272.587.706 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
  </svg>
);

function formatDate(iso: string): string {
  const d = new Date(iso);
  const time = d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const date = d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return `${time} · ${date}`;
}

function VideoThumbnail({
  video,
  tweetUrl,
}: {
  video: NonNullable<QuotedTweet["video"]>;
  tweetUrl: string;
}) {
  const ratio = `${video.aspectRatio[0]} / ${video.aspectRatio[1]}`;

  return (
    <a href={tweetUrl} target="_blank" rel="noopener noreferrer">
      <VideoContainer $ratio={ratio}>
        <VideoPoster src={video.poster} alt="" />
        <PlayButton>
          <PlayTriangle />
        </PlayButton>
        <WatchOnX>
          Watch on
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </WatchOnX>
      </VideoContainer>
    </a>
  );
}

export default function TweetCard({ tweet }: { tweet: CachedTweet }) {
  const tweetUrl = `https://x.com/${tweet.user.screen_name}/status/${tweet.id_str}`;

  return (
    <Card>
      <Header>
        <Avatar
          src={tweet.user.profile_image_url_https}
          alt={tweet.user.name}
          width={48}
          height={48}
          loading="lazy"
        />
        <UserInfo>
          <UserNameLink href={`https://x.com/${tweet.user.screen_name}`} target="_blank" rel="noopener noreferrer">
            {tweet.user.name}
            {tweet.user.is_blue_verified && <VerifiedBadge />}
          </UserNameLink>
          <HandleRow>
            @{tweet.user.screen_name} &middot;{" "}
            <FollowLink href={`https://x.com/intent/follow?screen_name=${tweet.user.screen_name}`} target="_blank" rel="noopener noreferrer">Follow</FollowLink>
          </HandleRow>
        </UserInfo>
        <a href={tweetUrl} target="_blank" rel="noopener noreferrer" aria-label="View on X">
          <XLogo viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </XLogo>
        </a>
      </Header>

      <Body>{tweet.text}</Body>

      {tweet.quoted_tweet && (
        <QuoteCard>
          <QuoteContent>
            <QuoteUserLine>
              <QuoteAvatar
                src={tweet.quoted_tweet.user.profile_image_url_https}
                alt={tweet.quoted_tweet.user.name}
                width={20}
                height={20}
                loading="lazy"
              />
              <QuoteUserName>{tweet.quoted_tweet.user.name}</QuoteUserName>
              <QuoteHandle>@{tweet.quoted_tweet.user.screen_name}</QuoteHandle>
            </QuoteUserLine>
            <QuoteText>{tweet.quoted_tweet.text}</QuoteText>
          </QuoteContent>
          {tweet.quoted_tweet.video && (
            <VideoThumbnail video={tweet.quoted_tweet.video} tweetUrl={tweetUrl} />
          )}
          {tweet.quoted_tweet.photos?.map((photo, i) => (
            <PhotoImg
              key={i}
              src={photo.url}
              width={photo.width}
              height={photo.height}
              loading="lazy"
              alt=""
            />
          ))}
        </QuoteCard>
      )}

      <Footer>
        <DateText dateTime={tweet.created_at}>
          {formatDate(tweet.created_at)}
        </DateText>
        <InfoIcon viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="10" fill="none" stroke="#71767b" strokeWidth="1.5" />
          <text x="12" y="16.5" textAnchor="middle" fontSize="13" fill="#71767b" fontFamily="serif" fontStyle="italic">i</text>
        </InfoIcon>
      </Footer>

      <Separator />

      <Actions>
        <ActionItem href={tweetUrl} target="_blank" rel="noopener noreferrer">
          <FaHeart size={14} color="#f91880" />
          {tweet.favorite_count}
        </ActionItem>
        <ActionItem href={tweetUrl} target="_blank" rel="noopener noreferrer">
          <FaComment size={14} color="#1d9bf0" />
          Reply
        </ActionItem>
        <ActionItem href={tweetUrl} target="_blank" rel="noopener noreferrer">
          <FaLink size={14} />
          Copy link
        </ActionItem>
      </Actions>

      <ReadMore href={tweetUrl} target="_blank" rel="noopener noreferrer">
        Read more on X
      </ReadMore>
    </Card>
  );
}
