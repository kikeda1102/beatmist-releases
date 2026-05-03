import styled, { keyframes } from "styled-components";

const ROW_HEIGHT = 32;
const HEADER_Y = 52;
const COL_TITLE_X = 20;
const COL_BPM_X = 200;
const COL_SR_X = 270;
const COL_BD_X = 370;
const COL_FMT_X = 450;

const TRACKS = [
  { title: "Sunrise.wav", bpm: "128", sr: "48000", bd: "32", fmt: "WAV", bad: true },
  { title: "Night_Manager.mp3", bpm: "126", sr: "44100", bd: "16", fmt: "MP3", bad: false },
  { title: "Coffee_Shop.wav", bpm: "130", sr: "96000", bd: "24", fmt: "WAV", bad: true },
  { title: "Shadow.m4a", bpm: "124", sr: "44100", bd: "16", fmt: "AAC", bad: false },
  { title: "Deep_Flow.aiff", bpm: "132", sr: "48000", bd: "32", fmt: "AIFF", bad: true },
  { title: "Crystal.wav", bpm: "140", sr: "44100", bd: "24", fmt: "WAV", bad: true },
];

const pulse = keyframes`
  0%, 100% { opacity: 0.85; }
  50%      { opacity: 0.55; }
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

const PulseBadge = styled.rect`
  animation: ${pulse} 2s ease-in-out infinite;
`;

function BadgeRect({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <PulseBadge
      x={x}
      y={y}
      width={w}
      height={18}
      rx="3"
      fill="#C8387E"
    />
  );
}

export default function ProblemBadgeMock() {
  const firstRowY = HEADER_Y + 24;

  return (
    <Wrapper>
      <svg
        viewBox="0 0 520 300"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="CDJ非対応フォーマット検出画面"
      >
        <rect width="520" height="300" fill="#141218" rx="4" />

        {/* Toolbar */}
        <rect x="0" y="0" width="520" height="36" fill="#1C1922" rx="4" />
        <text
          x="16"
          y="23"
          fill="#C8387E"
          fontSize="13"
          fontWeight="700"
          fontFamily="'Outfit', system-ui, sans-serif"
        >
          BeatMist
        </text>
        <rect x="82" y="10" width="28" height="16" rx="3" fill="#C8387E" opacity="0.8" />
        <text x="87" y="22" fill="#fff" fontSize="8" fontWeight="600" fontFamily="system-ui">
          PRO
        </text>
        <rect x="360" y="8" width="80" height="20" rx="4" fill="#C8387E" />
        <text
          x="378"
          y="22"
          fill="#fff"
          fontSize="9"
          fontWeight="600"
          fontFamily="'IBM Plex Sans', system-ui, sans-serif"
        >
          Convert to
        </text>

        {/* Column Headers */}
        <line x1="10" y1={HEADER_Y + 12} x2="510" y2={HEADER_Y + 12} stroke="#2E2838" strokeWidth="1" />
        {[
          { label: "TITLE", x: COL_TITLE_X },
          { label: "BPM", x: COL_BPM_X },
          { label: "SAMPLE RATE", x: COL_SR_X },
          { label: "BIT DEPTH", x: COL_BD_X },
          { label: "FMT", x: COL_FMT_X },
        ].map((col) => (
          <text
            key={col.label}
            x={col.x}
            y={HEADER_Y + 5}
            fill="rgba(245, 240, 250, 0.5)"
            fontSize="9"
            fontWeight="600"
            fontFamily="'IBM Plex Sans', system-ui, sans-serif"
            letterSpacing="0.5"
          >
            {col.label}
          </text>
        ))}

        {/* Data Rows */}
        {TRACKS.map((track, i) => {
          const rowY = firstRowY + ROW_HEIGHT * i;
          const textY = rowY + ROW_HEIGHT / 2 + 4;

          return (
            <g key={track.title}>
              {i % 2 === 1 && (
                <rect x="10" y={rowY} width="500" height={ROW_HEIGHT} fill="rgba(255,255,255,0.02)" rx="2" />
              )}
              <text x={COL_TITLE_X} y={textY} fill="rgba(245, 240, 250, 0.88)" fontSize="11" fontFamily="'IBM Plex Sans', system-ui, sans-serif">
                {track.title}
              </text>
              <text x={COL_BPM_X} y={textY} fill="rgba(245, 240, 250, 0.68)" fontSize="11" fontFamily="'IBM Plex Sans', system-ui, sans-serif">
                {track.bpm}
              </text>

              {track.bad ? (
                <>
                  <BadgeRect x={COL_SR_X} y={rowY + 7} w={50} />
                  <text x={COL_SR_X + 5} y={textY} fill="#fff" fontSize="10" fontWeight="600" fontFamily="'IBM Plex Sans', system-ui, sans-serif">
                    {track.sr}
                  </text>
                  <BadgeRect x={COL_BD_X} y={rowY + 7} w={30} />
                  <text x={COL_BD_X + 7} y={textY} fill="#fff" fontSize="10" fontWeight="600" fontFamily="'IBM Plex Sans', system-ui, sans-serif">
                    {track.bd}
                  </text>
                </>
              ) : (
                <>
                  <text x={COL_SR_X} y={textY} fill="rgba(245, 240, 250, 0.68)" fontSize="11" fontFamily="'IBM Plex Sans', system-ui, sans-serif">
                    {track.sr}
                  </text>
                  <text x={COL_BD_X} y={textY} fill="rgba(245, 240, 250, 0.68)" fontSize="11" fontFamily="'IBM Plex Sans', system-ui, sans-serif">
                    {track.bd}
                  </text>
                </>
              )}

              <text x={COL_FMT_X} y={textY} fill="rgba(245, 240, 250, 0.68)" fontSize="11" fontFamily="'IBM Plex Sans', system-ui, sans-serif">
                {track.fmt}
              </text>
            </g>
          );
        })}

        {/* Status Bar */}
        <rect x="0" y="274" width="520" height="26" fill="#1C1922" rx="0" />
        <path d="M18,290 l5,-8 l5,8 z" fill="#C8387E" opacity="0.8" />
        <text
          x="34"
          y="291"
          fill="rgba(245, 240, 250, 0.6)"
          fontSize="9"
          fontFamily="'IBM Plex Sans', 'Noto Sans JP', system-ui, sans-serif"
        >
          CDJ-3000: WAV 32 bit / 96 kHz は非対応です。24 bit に変換しますか？
        </text>
      </svg>
    </Wrapper>
  );
}
