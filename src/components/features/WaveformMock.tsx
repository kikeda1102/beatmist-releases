import styled, { keyframes } from "styled-components";

const TRACK_ROW_HEIGHT = 28;
const TRACK_Y = 14;
const PLAYER_Y = 168;

const TRACKS = [
  { title: "AKU BETE #MHDIRF...", artist: "Nata HG", bpm: "192", fmt: "MP3", selected: false },
  { title: "AKU PASTI TAHU...", artist: "MAMAS JTB", bpm: "130", fmt: "MP3", selected: false },
  { title: "AKU YANG DULU...", artist: "FAHMY FAY", bpm: "128", fmt: "MP3", selected: false },
  { title: "#POWER SPOT - Div...", artist: "Refanda VB", bpm: "130", fmt: "MP3", selected: true },
];

const AMPLITUDES = [
  8, 14, 10, 18, 12, 22, 16, 28, 20, 14, 24, 18, 30, 22, 16,
  26, 12, 20, 32, 24, 18, 28, 14, 22, 34, 26, 20, 30, 16, 24,
  10, 18, 28, 22, 34, 26, 14, 30, 20, 36, 28, 18, 24, 32, 22,
  16, 26, 36, 28, 20, 32, 24, 38, 30, 22, 18, 34, 26, 40, 32,
  24, 36, 28, 20, 38, 30, 22, 34, 26, 18, 32, 40, 28, 36, 24,
  30, 20, 26, 34, 22, 38, 28, 16, 32, 24, 36, 20, 30, 26, 14,
  22, 18, 28, 24, 34, 20, 30, 16, 26, 22, 12, 18, 24, 14, 20,
  10, 16, 22, 12, 8,
];

const BAR_COUNT = AMPLITUDES.length;
const WAVE_X = 195;
const WAVE_WIDTH = 240;
const WAVE_CENTER_Y = PLAYER_Y + 42;
const MAX_AMP = 54;
const BAR_GAP = WAVE_WIDTH / BAR_COUNT;
const BAR_W = Math.max(1, BAR_GAP * 0.6);

const sweep = keyframes`
  0%   { transform: translateX(0); }
  100% { transform: translateX(${WAVE_WIDTH}px); }
`;

const sweepClip = keyframes`
  0%   { width: 0px; }
  100% { width: ${WAVE_WIDTH}px; }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (prefers-reduced-motion: reduce) {
    svg * {
      animation-play-state: paused !important;
    }
  }
`;

const PlayheadLine = styled.line`
  animation: ${sweep} 12s linear infinite;
`;

const ClipRect = styled.rect`
  animation: ${sweepClip} 12s linear infinite;
`;

function WaveformBars({ color, opacity }: { color: string; opacity: number }) {
  return (
    <>
      {AMPLITUDES.map((amp, i) => {
        const x = WAVE_X + i * BAR_GAP;
        const h = (amp / 40) * MAX_AMP;
        return (
          <rect
            key={i}
            x={x}
            y={WAVE_CENTER_Y - h / 2}
            width={BAR_W}
            height={h}
            rx="0.5"
            fill={color}
            opacity={opacity}
          />
        );
      })}
    </>
  );
}

export default function WaveformMock() {
  return (
    <Wrapper>
      <svg
        viewBox="0 0 530 270"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="波形プレビューと再生コントロール"
      >
        <defs>
          <clipPath id="played-clip">
            <ClipRect x={WAVE_X} y="0" width="0" height="270" />
          </clipPath>
        </defs>

        <rect width="530" height="270" fill="#141218" rx="4" />

        {/* Track list header */}
        <line x1="10" y1={TRACK_Y + 14} x2="520" y2={TRACK_Y + 14} stroke="#2E2838" strokeWidth="1" />
        {[
          { label: "TITLE", x: 20 },
          { label: "ARTIST", x: 220 },
          { label: "BPM", x: 340 },
          { label: "FMT", x: 400 },
        ].map((col) => (
          <text
            key={col.label}
            x={col.x}
            y={TRACK_Y + 6}
            fill="rgba(245, 240, 250, 0.5)"
            fontSize="9"
            fontWeight="600"
            fontFamily="'IBM Plex Sans', system-ui, sans-serif"
            letterSpacing="0.5"
          >
            {col.label}
          </text>
        ))}

        {/* Track rows */}
        {TRACKS.map((track, i) => {
          const rowY = TRACK_Y + 20 + TRACK_ROW_HEIGHT * i;
          const textY = rowY + TRACK_ROW_HEIGHT / 2 + 4;

          return (
            <g key={track.title}>
              {track.selected && (
                <rect x="10" y={rowY} width="510" height={TRACK_ROW_HEIGHT} fill="rgba(37, 99, 235, 0.3)" rx="2" />
              )}
              {!track.selected && i % 2 === 1 && (
                <rect x="10" y={rowY} width="510" height={TRACK_ROW_HEIGHT} fill="rgba(255,255,255,0.02)" rx="2" />
              )}
              <text x={20} y={textY} fill={track.selected ? "rgba(245, 240, 250, 0.95)" : "rgba(245, 240, 250, 0.78)"} fontSize="10" fontFamily="'IBM Plex Sans', system-ui, sans-serif">
                {track.title}
              </text>
              <text x={220} y={textY} fill="rgba(245, 240, 250, 0.58)" fontSize="10" fontFamily="'IBM Plex Sans', system-ui, sans-serif">
                {track.artist}
              </text>
              <text x={340} y={textY} fill="rgba(245, 240, 250, 0.58)" fontSize="10" fontFamily="'IBM Plex Sans', system-ui, sans-serif">
                {track.bpm}
              </text>
              <text x={400} y={textY} fill="rgba(245, 240, 250, 0.58)" fontSize="10" fontFamily="'IBM Plex Sans', system-ui, sans-serif">
                {track.fmt}
              </text>
            </g>
          );
        })}

        {/* Player bar background */}
        <rect x="0" y={PLAYER_Y} width="530" height="102" fill="#0D0B0F" />

        {/* Play button */}
        <circle cx="30" cy={WAVE_CENTER_Y} r="16" fill="#C8387E" />
        <polygon
          points={`25,${WAVE_CENTER_Y - 8} 25,${WAVE_CENTER_Y + 8} 38,${WAVE_CENTER_Y}`}
          fill="#fff"
        />

        {/* Track info */}
        <text
          x="56"
          y={WAVE_CENTER_Y - 6}
          fill="rgba(245, 240, 250, 0.92)"
          fontSize="10"
          fontWeight="600"
          fontFamily="'IBM Plex Sans', system-ui, sans-serif"
        >
          #POWER SPOT - DiverDi...
        </text>
        <text
          x="56"
          y={WAVE_CENTER_Y + 6}
          fill="rgba(245, 240, 250, 0.4)"
          fontSize="8"
          fontFamily="'IBM Plex Sans', system-ui, sans-serif"
        >
          Refanda VB X Wayve JP
        </text>

        {/* Gray bars (unplayed, base layer) */}
        <WaveformBars color="rgba(245, 240, 250, 0.25)" opacity={0.6} />

        {/* Magenta bars (played, clipped layer) */}
        <g clipPath="url(#played-clip)">
          <WaveformBars color="#C8387E" opacity={0.85} />
        </g>

        {/* Playhead */}
        <PlayheadLine
          x1={WAVE_X}
          y1={WAVE_CENTER_Y - MAX_AMP / 2 - 4}
          x2={WAVE_X}
          y2={WAVE_CENTER_Y + MAX_AMP / 2 + 4}
          stroke="#C8387E"
          strokeWidth="1.5"
          opacity="0.9"
        />

        {/* Time */}
        <text
          x="450"
          y={WAVE_CENTER_Y + 3}
          fill="rgba(245, 240, 250, 0.55)"
          fontSize="9"
          fontFamily="'IBM Plex Sans', system-ui, sans-serif"
        >
          3:31 / 6:35
        </text>

        {/* Volume icon */}
        <g transform={`translate(500, ${WAVE_CENTER_Y - 5})`} opacity="0.5">
          <polygon points="0,4 3,4 7,0 7,10 3,6 0,6" fill="rgba(245, 240, 250, 0.7)" />
          <path d="M9,2 Q12,5 9,8" stroke="rgba(245, 240, 250, 0.5)" strokeWidth="1" fill="none" />
        </g>
      </svg>
    </Wrapper>
  );
}
