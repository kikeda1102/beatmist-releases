import styled, { keyframes } from "styled-components";

const ROW_HEIGHT = 34;
const HEADER_Y = 20;
const COL_SR_X = 20;
const COL_BD_X = 90;
const COL_FMT_X = 140;
const COL_FILE_X = 190;
const COL_CHECK_X = 410;
const COL_REVERT_X = 440;

const ROWS = [
  { sr: "44100", bd: "24", fmt: "wav", file: "02 INSIDE THE BOX.wav", converted: true, revert: true },
  { sr: "44100", bd: "16", fmt: "WAV", file: "02 Uncertain Girl.wav", converted: true, revert: false },
  { sr: "44100", bd: "24", fmt: "WAV", file: "02 VoiSona Yukari.wav", converted: true, revert: false },
  { sr: "44100", bd: "24", fmt: "wav", file: "02 Coffee_Shop.wav", converted: true, revert: true },
  { sr: "44100", bd: "16", fmt: "AAC", file: "02 Shadow.m4a", converted: true, revert: false },
  { sr: "44100", bd: "24", fmt: "wav", file: "02 Deep_Flow.wav", converted: true, revert: true },
];

const revertFlash = keyframes`
  0%, 85%, 100% { opacity: 1; }
  90%           { opacity: 0.4; }
  95%           { opacity: 1; }
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

const FlashRow = styled.g`
  animation: ${revertFlash} 8s ease-in-out infinite;
`;

function Check({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M${x - 4},${y} l3,3 l6,-6`}
      stroke="#34c759"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

export default function BackupRevertMock() {
  const firstRowY = HEADER_Y + 28;

  return (
    <Wrapper>
      <svg
        viewBox="0 0 520 260"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="バックアップとワンクリック復元の画面"
      >
        <rect width="520" height="260" fill="#141218" rx="4" />

        {/* Column Headers */}
        <line x1="10" y1={HEADER_Y + 14} x2="510" y2={HEADER_Y + 14} stroke="#2E2838" strokeWidth="1" />
        {[
          { label: "SR", x: COL_SR_X },
          { label: "BIT", x: COL_BD_X },
          { label: "FMT", x: COL_FMT_X },
          { label: "FILE", x: COL_FILE_X },
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
        {ROWS.map((row, i) => {
          const rowY = firstRowY + ROW_HEIGHT * i;
          const textY = rowY + ROW_HEIGHT / 2 + 4;
          const is24 = row.bd === "24";
          const RowGroup = i === 0 ? FlashRow : "g";

          return (
            <RowGroup key={row.file}>
              {i % 2 === 1 && (
                <rect x="10" y={rowY} width="500" height={ROW_HEIGHT} fill="rgba(255,255,255,0.02)" rx="2" />
              )}

              <text x={COL_SR_X} y={textY} fill="rgba(245, 240, 250, 0.68)" fontSize="11" fontFamily="'IBM Plex Sans', system-ui, sans-serif">
                {row.sr}
              </text>

              {is24 ? (
                <>
                  <rect x={COL_BD_X} y={rowY + 8} width={28} height={18} rx="3" fill="#C8387E" />
                  <text x={COL_BD_X + 6} y={textY} fill="#fff" fontSize="10" fontWeight="600" fontFamily="'IBM Plex Sans', system-ui, sans-serif">
                    {row.bd}
                  </text>
                </>
              ) : (
                <text x={COL_BD_X} y={textY} fill="rgba(245, 240, 250, 0.68)" fontSize="11" fontFamily="'IBM Plex Sans', system-ui, sans-serif">
                  {row.bd}
                </text>
              )}

              <text x={COL_FMT_X} y={textY} fill="rgba(245, 240, 250, 0.68)" fontSize="11" fontFamily="'IBM Plex Sans', system-ui, sans-serif">
                {row.fmt}
              </text>

              <text x={COL_FILE_X} y={textY} fill="rgba(245, 240, 250, 0.88)" fontSize="11" fontFamily="'IBM Plex Sans', 'Noto Sans JP', system-ui, sans-serif">
                {row.file}
              </text>

              <Check x={COL_CHECK_X} y={textY - 4} />

              {row.revert && (
                <>
                  <rect x={COL_REVERT_X} y={rowY + 8} width={50} height={18} rx="4" fill="none" stroke="rgba(245, 240, 250, 0.3)" strokeWidth="1" />
                  <text x={COL_REVERT_X + 8} y={textY} fill="rgba(245, 240, 250, 0.7)" fontSize="9" fontFamily="'IBM Plex Sans', system-ui, sans-serif">
                    Revert
                  </text>
                </>
              )}
            </RowGroup>
          );
        })}
      </svg>
    </Wrapper>
  );
}
