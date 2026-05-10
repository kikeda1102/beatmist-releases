import styled from "styled-components";

const WAVE_Y = 70;
const WAVE_HEIGHT = 110;
const WAVE_CENTER_Y = WAVE_Y + WAVE_HEIGHT / 2;
const WAVE_X_START = 40;
const WAVE_X_END = 440;
const WAVE_WIDTH = WAVE_X_END - WAVE_X_START;

const AMPLITUDES = [
  6, 12, 8, 16, 10, 20, 14, 26, 18, 12, 22, 16, 28, 20, 14, 24, 10, 18, 30, 22,
  16, 26, 12, 20, 32, 24, 18, 28, 14, 22, 8, 16, 26, 20, 32, 24, 12, 28, 18, 34,
  26, 16, 22, 30, 20, 14, 24, 34, 26, 18, 30, 22, 36, 28, 20, 16, 32, 24, 38,
  30, 22, 34, 26, 18, 36, 28, 20, 32, 24, 16, 30, 38, 26, 34, 22, 28, 18, 24,
  32, 20, 36, 26, 14, 30, 22, 34, 18, 28, 24, 12, 20, 16, 26, 22, 32, 18, 28,
  14, 24, 20, 10, 16, 22, 12, 8,
];

const BAR_COUNT = AMPLITUDES.length;
const BAR_GAP = WAVE_WIDTH / BAR_COUNT;
const BAR_W = Math.max(1, BAR_GAP * 0.6);
const MAX_AMP = WAVE_HEIGHT * 0.85;

interface CueMarker {
  label: string;
  color: string;
  position: number;
}

const CUE_MARKERS: CueMarker[] = [
  { label: "A", color: "#E02020", position: 0.08 },
  { label: "B", color: "#E08020", position: 0.25 },
  { label: "C", color: "#20C020", position: 0.48 },
  { label: "D", color: "#2080E0", position: 0.72 },
  { label: "E", color: "#E020C0", position: 0.92 },
];

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function CueFlag({ x, marker }: { x: number; marker: CueMarker }) {
  const flagY = WAVE_Y - 4;
  const flagSize = 10;

  return (
    <g>
      <line
        x1={x}
        y1={flagY}
        x2={x}
        y2={WAVE_Y + WAVE_HEIGHT + 4}
        stroke={marker.color}
        strokeWidth="1.5"
        opacity="0.7"
      />
      <polygon
        points={`${x - flagSize / 2},${flagY - flagSize} ${x + flagSize / 2},${flagY - flagSize} ${x},${flagY}`}
        fill={marker.color}
      />
      <text
        x={x}
        y={flagY - flagSize - 3}
        fill={marker.color}
        fontSize="9"
        fontWeight="700"
        fontFamily="'IBM Plex Sans', system-ui, sans-serif"
        textAnchor="middle"
      >
        {marker.label}
      </text>
    </g>
  );
}

export default function rekordboxCueMock() {
  return (
    <Wrapper>
      <svg
        viewBox="0 0 480 220"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="rekordboxのCUEポイント読み込み"
      >
        <rect width="480" height="220" fill="#141218" rx="4" />

        <text
          x={WAVE_X_START}
          y="28"
          fill="rgba(245, 240, 250, 0.92)"
          fontSize="12"
          fontWeight="600"
          fontFamily="'IBM Plex Sans', 'Noto Sans JP', system-ui, sans-serif"
        >
          Sunrise Festival Edit
        </text>
        <text
          x={WAVE_X_START}
          y="44"
          fill="rgba(245, 240, 250, 0.4)"
          fontSize="10"
          fontFamily="'IBM Plex Sans', system-ui, sans-serif"
        >
          DJ Nata HG
        </text>

        {AMPLITUDES.map((amp, i) => {
          const x = WAVE_X_START + i * BAR_GAP;
          const h = (amp / 40) * MAX_AMP;
          return (
            <rect
              key={i}
              x={x}
              y={WAVE_CENTER_Y - h / 2}
              width={BAR_W}
              height={h}
              rx="0.5"
              fill="rgba(245, 240, 250, 0.18)"
              opacity="0.7"
            />
          );
        })}

        {CUE_MARKERS.map((marker) => {
          const x = WAVE_X_START + marker.position * WAVE_WIDTH;
          return <CueFlag key={marker.label} x={x} marker={marker} />;
        })}

        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const x = WAVE_X_START + ratio * WAVE_WIDTH;
          const minutes = Math.floor((ratio * 4.5 * 60) / 60);
          const seconds = Math.floor((ratio * 4.5 * 60) % 60);
          const label = `${minutes}:${String(seconds).padStart(2, "0")}`;
          return (
            <text
              key={ratio}
              x={x}
              y={WAVE_Y + WAVE_HEIGHT + 18}
              fill="rgba(245, 240, 250, 0.3)"
              fontSize="8"
              fontFamily="'IBM Plex Sans', system-ui, sans-serif"
              textAnchor="middle"
            >
              {label}
            </text>
          );
        })}
      </svg>
    </Wrapper>
  );
}
