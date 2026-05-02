import styled from "styled-components";

const HEADER_Y = 40;
const ROW_HEIGHT = 38;
const COL_NAME_X = 40;
const COL_RB_X = 380;

const TRACKS = [
  { name: "Sunrise.wav", rb: true },
  { name: "Night_Manager.mp3", rb: true },
  { name: "Coffee_Shop.wav", rb: false },
  { name: "Shadow.m4a", rb: true },
  { name: "Deep_Flow.aiff", rb: false },
];

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Check({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M${x - 5},${y} l4,4 l7,-8`}
      stroke="#34c759"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

function Dash({ x, y }: { x: number; y: number }) {
  return (
    <line
      x1={x - 5}
      y1={y}
      x2={x + 5}
      y2={y}
      stroke="rgba(245, 240, 250, 0.35)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  );
}

export default function RekordboxStatusMock() {
  const firstRowY = HEADER_Y + ROW_HEIGHT + 8;

  return (
    <Wrapper>
      <svg
        viewBox="0 0 480 300"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Rekordboxインポート状況テーブル"
      >
        <rect width="480" height="300" fill="#141218" rx="4" />

        <line
          x1="20"
          y1={HEADER_Y + 18}
          x2="460"
          y2={HEADER_Y + 18}
          stroke="#2E2838"
          strokeWidth="1"
        />

        <text
          x={COL_NAME_X}
          y={HEADER_Y + 5}
          fill="rgba(245, 240, 250, 0.5)"
          fontSize="11"
          fontWeight="600"
          fontFamily="'IBM Plex Sans', system-ui, sans-serif"
          letterSpacing="0.5"
        >
          TITLE
        </text>
        <text
          x={COL_RB_X}
          y={HEADER_Y + 5}
          fill="rgba(245, 240, 250, 0.5)"
          fontSize="11"
          fontWeight="600"
          fontFamily="'IBM Plex Sans', system-ui, sans-serif"
          letterSpacing="0.5"
          textAnchor="middle"
        >
          REKORDBOX
        </text>

        {TRACKS.map((track, i) => {
          const rowY = firstRowY + ROW_HEIGHT * i;
          const centerY = rowY + ROW_HEIGHT / 2;

          return (
            <g key={track.name}>
              {i % 2 === 1 && (
                <rect
                  x="20"
                  y={rowY}
                  width="440"
                  height={ROW_HEIGHT}
                  fill="rgba(255, 255, 255, 0.02)"
                  rx="2"
                />
              )}

              <text
                x={COL_NAME_X}
                y={centerY + 4}
                fill="rgba(245, 240, 250, 0.88)"
                fontSize="13"
                fontFamily="'IBM Plex Sans', 'Noto Sans JP', system-ui, sans-serif"
              >
                {track.name}
              </text>

              {track.rb ? (
                <Check x={COL_RB_X} y={centerY} />
              ) : (
                <Dash x={COL_RB_X} y={centerY} />
              )}
            </g>
          );
        })}
      </svg>
    </Wrapper>
  );
}
