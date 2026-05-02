import styled, { keyframes } from "styled-components";

const ROW_HEIGHT = 30;
const ROWS = [
  "CDJ-3000X",
  "CDJ-3000",
  "CDJ-2000NXS2",
  "CDJ-2000NXS",
  "CDJ-900NXS",
  "CDJ-900",
];

const cycleHighlight = keyframes`
  0%, 8%      { transform: translateY(0) }
  12%, 24%    { transform: translateY(${ROW_HEIGHT}px) }
  28%, 40%    { transform: translateY(${ROW_HEIGHT * 2}px) }
  44%, 56%    { transform: translateY(${ROW_HEIGHT * 3}px) }
  60%, 72%    { transform: translateY(${ROW_HEIGHT * 4}px) }
  76%, 88%    { transform: translateY(${ROW_HEIGHT * 5}px) }
  94%, 100%   { transform: translateY(0) }
`;

const cycleCheck = keyframes`
  0%, 8%      { transform: translate(0, 0) }
  12%, 24%    { transform: translate(0, ${ROW_HEIGHT}px) }
  28%, 40%    { transform: translate(0, ${ROW_HEIGHT * 2}px) }
  44%, 56%    { transform: translate(0, ${ROW_HEIGHT * 3}px) }
  60%, 72%    { transform: translate(0, ${ROW_HEIGHT * 4}px) }
  76%, 88%    { transform: translate(0, ${ROW_HEIGHT * 5}px) }
  94%, 100%   { transform: translate(0, 0) }
`;

const specPulse = keyframes`
  0%, 10%  { opacity: 0.5 }
  14%, 22% { opacity: 1 }
  26%, 38% { opacity: 0.5 }
  42%, 50% { opacity: 1 }
  54%, 66% { opacity: 0.5 }
  70%, 78% { opacity: 1 }
  82%, 94% { opacity: 0.5 }
  98%, 100% { opacity: 1 }
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

const HighlightBar = styled.rect`
  animation: ${cycleHighlight} 18s ease-in-out infinite;
`;

const CheckGroup = styled.g`
  animation: ${cycleCheck} 18s ease-in-out infinite;
`;

const SpecText = styled.text`
  animation: ${specPulse} 18s ease-in-out infinite;
`;

export default function CdjSelectMock() {
  const dropdownX = 30;
  const dropdownY = 18;
  const dropdownW = 420;
  const textX = dropdownX + 32;
  const dropdownBottom = ROW_HEIGHT * 6;

  return (
    <Wrapper>
      <svg
        viewBox="0 0 480 300"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="CDJ機種選択ドロップダウンのアニメーション"
      >
        <rect width="480" height="300" fill="#141218" rx="4" />

        <rect
          x={dropdownX}
          y={dropdownY}
          width={dropdownW}
          height={ROW_HEIGHT * 6 + 8}
          rx="6"
          fill="#1C1922"
          stroke="#2E2838"
          strokeWidth="1"
        />

        <HighlightBar
          x={dropdownX + 4}
          y={dropdownY + 4}
          width={dropdownW - 8}
          height={ROW_HEIGHT}
          rx="4"
          fill="#2563EB"
          opacity="0.9"
        />

        <CheckGroup>
          <path
            d={`M${dropdownX + 16},${dropdownY + 4 + ROW_HEIGHT / 2} l3,3 l6,-6`}
            stroke="#fff"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </CheckGroup>

        {ROWS.map((name, i) => (
          <text
            key={name}
            x={textX}
            y={dropdownY + 4 + ROW_HEIGHT * i + ROW_HEIGHT / 2 + 5}
            fill="rgba(245, 240, 250, 0.95)"
            fontSize="14"
            fontFamily="'Noto Sans JP', system-ui, sans-serif"
          >
            {name}
          </text>
        ))}

        <line
          x1={dropdownX}
          y1={dropdownY + dropdownBottom + 20}
          x2={dropdownX + dropdownW}
          y2={dropdownY + dropdownBottom + 20}
          stroke="#2E2838"
          strokeWidth="1"
        />

        <text
          x={dropdownX}
          y={dropdownY + dropdownBottom + 42}
          fill="rgba(245, 240, 250, 0.95)"
          fontSize="13"
          fontWeight="600"
          fontFamily="'Noto Sans JP', system-ui, sans-serif"
        >
          変換されるスペック
        </text>

        <rect
          x={dropdownX}
          y={dropdownY + dropdownBottom + 50}
          width="44"
          height="22"
          rx="4"
          fill="#2E2838"
        />
        <text
          x={dropdownX + 22}
          y={dropdownY + dropdownBottom + 65}
          fill="rgba(245, 240, 250, 0.95)"
          fontSize="12"
          fontFamily="'IBM Plex Sans', system-ui, sans-serif"
          textAnchor="middle"
        >
          WAV
        </text>

        <SpecText
          x={dropdownX + 56}
          y={dropdownY + dropdownBottom + 65}
          fill="rgba(245, 240, 250, 0.78)"
          fontSize="12"
          fontFamily="'IBM Plex Sans', system-ui, sans-serif"
        >
          44.1/48/88.2/96 kHz · 16/24 bit
        </SpecText>

        <text
          x={dropdownX}
          y={dropdownY + dropdownBottom + 86}
          fill="rgba(245, 240, 250, 0.4)"
          fontSize="10"
          fontFamily="'Noto Sans JP', system-ui, sans-serif"
        >
          ※ WAV はメタデータ（タグ）編集に非対応です。
        </text>
      </svg>
    </Wrapper>
  );
}
