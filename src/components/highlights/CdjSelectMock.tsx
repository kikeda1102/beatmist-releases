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

export default function CdjSelectMock() {
  const dropdownX = 30;
  const dropdownY = 18;
  const dropdownW = 420;
  const textX = dropdownX + 32;

  return (
    <Wrapper>
      <svg
        viewBox="0 0 480 220"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="CDJ機種選択ドロップダウンのアニメーション"
      >
        <rect width="480" height="220" fill="#141218" rx="4" />

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

      </svg>
    </Wrapper>
  );
}
