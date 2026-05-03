import styled, { keyframes } from "styled-components";

const ROW_HEIGHT = 38;
const HEADER_Y = 20;
const COL_CHECK_X = 20;
const COL_TITLE_X = 50;
const COL_ARTIST_X = 300;
const COL_BPM_X = 430;

const TRACKS = [
  { title: "Hyakucd Yukaiten", artist: "Mito Tsukino", bpm: "128", cursorX: 170 },
  { title: "Lunatic Wars", artist: "Mito Tsukino", bpm: "156", hasEditIcon: true, cursorX: 0 },
  { title: "Arc Universe", artist: "Mito Tsukino", bpm: "130", editing: true, cursorX: 78 },
  { title: "Kokoro no Abyss", artist: "Mito Tsukino", bpm: "145", cursorX: 0 },
  { title: "Negoto wa Nete Ie", artist: "Mito Tsukino", bpm: "162", cursorX: 0 },
  { title: "Koiboshi Perico", artist: "Mito Tsukino", bpm: "138", cursorX: 0 },
];

const cursorBlink = keyframes`
  0%, 49%  { opacity: 1; }
  50%, 100% { opacity: 0; }
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

const Cursor = styled.line`
  animation: ${cursorBlink} 1s step-end infinite;
`;

function Checkbox({ x, y, checked }: { x: number; y: number; checked: boolean }) {
  return (
    <g>
      <rect
        x={x}
        y={y - 7}
        width="14"
        height="14"
        rx="3"
        fill="none"
        stroke="rgba(245, 240, 250, 0.3)"
        strokeWidth="1"
      />
      {checked && (
        <path
          d={`M${x + 3},${y} l3,3 l5,-6`}
          stroke="rgba(245, 240, 250, 0.7)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </g>
  );
}

export default function MetadataEditMock() {
  const firstRowY = HEADER_Y + 28;

  return (
    <Wrapper>
      <svg
        viewBox="0 0 490 280"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="メタデータ編集画面"
      >
        <rect width="490" height="280" fill="#141218" rx="4" />

        {/* Column Headers */}
        <line x1="10" y1={HEADER_Y + 14} x2="480" y2={HEADER_Y + 14} stroke="#2E2838" strokeWidth="1" />
        {[
          { label: "TITLE", x: COL_TITLE_X },
          { label: "ARTIST", x: COL_ARTIST_X },
          { label: "BPM", x: COL_BPM_X },
        ].map((col) => (
          <text
            key={col.label}
            x={col.x}
            y={HEADER_Y + 5}
            fill="rgba(245, 240, 250, 0.5)"
            fontSize="10"
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
          const centerY = rowY + ROW_HEIGHT / 2;
          const textY = centerY + 4;

          return (
            <g key={track.title}>
              {i % 2 === 1 && (
                <rect x="10" y={rowY} width="470" height={ROW_HEIGHT} fill="rgba(255,255,255,0.02)" rx="2" />
              )}

              <Checkbox x={COL_CHECK_X} y={centerY} checked={false} />

              {track.editing ? (
                <>
                  {/* Active editing field */}
                  <rect
                    x={COL_TITLE_X - 4}
                    y={rowY + 6}
                    width={230}
                    height={ROW_HEIGHT - 12}
                    rx="4"
                    fill="none"
                    stroke="#C8387E"
                    strokeWidth="2"
                  />
                  <text
                    x={COL_TITLE_X + 4}
                    y={textY}
                    fill="rgba(245, 240, 250, 0.95)"
                    fontSize="13"
                    fontFamily="'Noto Sans JP', system-ui, sans-serif"
                  >
                    {track.title}
                  </text>
                  <Cursor
                    x1={COL_TITLE_X + 4 + track.cursorX}
                    y1={rowY + 10}
                    x2={COL_TITLE_X + 4 + track.cursorX}
                    y2={rowY + ROW_HEIGHT - 10}
                    stroke="rgba(245, 240, 250, 0.9)"
                    strokeWidth="1.5"
                  />
                </>
              ) : (
                <text
                  x={COL_TITLE_X}
                  y={textY}
                  fill="rgba(245, 240, 250, 0.88)"
                  fontSize="13"
                  fontFamily="'Noto Sans JP', system-ui, sans-serif"
                >
                  {track.title}
                </text>
              )}

              {/* Edit icon */}
              {track.hasEditIcon && (
                <g transform={`translate(${COL_TITLE_X + 160}, ${centerY - 6})`}>
                  <path
                    d="M0,10 L8,2 L10,4 L2,12 L0,12 Z"
                    fill="rgba(245, 240, 250, 0.4)"
                  />
                </g>
              )}

              <text
                x={COL_ARTIST_X}
                y={textY}
                fill="rgba(245, 240, 250, 0.68)"
                fontSize="12"
                fontFamily="'Noto Sans JP', system-ui, sans-serif"
              >
                {track.artist}
              </text>

              <text
                x={COL_BPM_X}
                y={textY}
                fill="rgba(245, 240, 250, 0.68)"
                fontSize="11"
                fontFamily="'IBM Plex Sans', system-ui, sans-serif"
              >
                {track.bpm}
              </text>
            </g>
          );
        })}
      </svg>
    </Wrapper>
  );
}
