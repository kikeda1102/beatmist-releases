import styled from "styled-components";

const FOLDERS = [
  { path: "~/Desktop/beatmist_test", tracks: 9 },
  { path: "~/Music", tracks: 1789 },
  { path: "/Volumes/BUFFALO_1TB/DJ", tracks: 1714 },
];

const ROW_HEIGHT = 44;
const TABLE_Y = 170;
const COL_FOLDER_X = 40;
const COL_TRACKS_X = 360;
const COL_STATUS_X = 410;
const COL_DELETE_X = 450;

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
      d={`M${x - 4},${y} l3,3 l6,-6`}
      stroke="#34c759"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

function TrashIcon({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`} opacity="0.4">
      <rect x="2" y="3" width="10" height="11" rx="1" fill="none" stroke="rgba(245,240,250,0.5)" strokeWidth="1" />
      <line x1="0" y1="3" x2="14" y2="3" stroke="rgba(245,240,250,0.5)" strokeWidth="1" />
      <line x1="5" y1="0" x2="9" y2="0" stroke="rgba(245,240,250,0.5)" strokeWidth="1" />
      <line x1="5" y1="6" x2="5" y2="12" stroke="rgba(245,240,250,0.4)" strokeWidth="1" />
      <line x1="9" y1="6" x2="9" y2="12" stroke="rgba(245,240,250,0.4)" strokeWidth="1" />
    </g>
  );
}

export default function LibraryMock() {
  return (
    <Wrapper>
      <svg
        viewBox="0 0 500 340"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="スキャン対象フォルダ管理画面"
      >
        <rect width="500" height="340" fill="rgba(0,0,0,0.3)" rx="4" />

        {/* Modal container */}
        <rect x="20" y="16" width="460" height="308" rx="10" fill="#1C1922" stroke="#2E2838" strokeWidth="1" />

        {/* Title */}
        <text
          x="44"
          y="50"
          fill="rgba(245, 240, 250, 0.95)"
          fontSize="15"
          fontWeight="700"
          fontFamily="'Noto Sans JP', system-ui, sans-serif"
        >
          スキャン対象フォルダ
        </text>

        {/* Close button */}
        <text
          x="452"
          y="48"
          fill="rgba(245, 240, 250, 0.5)"
          fontSize="18"
          fontFamily="system-ui"
          textAnchor="middle"
        >
          ×
        </text>

        {/* Drop zone */}
        <rect
          x="40"
          y="68"
          width="420"
          height="56"
          rx="8"
          fill="none"
          stroke="rgba(245, 240, 250, 0.2)"
          strokeWidth="1.5"
          strokeDasharray="8 4"
        />
        <text
          x="250"
          y="102"
          fill="rgba(245, 240, 250, 0.4)"
          fontSize="12"
          fontFamily="'Noto Sans JP', system-ui, sans-serif"
          textAnchor="middle"
        >
          + クリックしてフォルダを追加...
        </text>

        {/* Table header */}
        <line x1="40" y1={TABLE_Y - 16} x2="460" y2={TABLE_Y - 16} stroke="#2E2838" strokeWidth="1" />
        <text x={COL_FOLDER_X} y={TABLE_Y - 24} fill="rgba(245, 240, 250, 0.5)" fontSize="10" fontWeight="600" fontFamily="'IBM Plex Sans', system-ui, sans-serif" letterSpacing="0.5">
          Folder
        </text>
        <text x={COL_TRACKS_X} y={TABLE_Y - 24} fill="rgba(245, 240, 250, 0.5)" fontSize="10" fontWeight="600" fontFamily="'IBM Plex Sans', system-ui, sans-serif" letterSpacing="0.5" textAnchor="end">
          Tracks
        </text>
        <text x={COL_STATUS_X} y={TABLE_Y - 24} fill="rgba(245, 240, 250, 0.5)" fontSize="10" fontWeight="600" fontFamily="'IBM Plex Sans', system-ui, sans-serif" letterSpacing="0.5" textAnchor="middle">
          Status
        </text>

        {/* Folder rows */}
        {FOLDERS.map((folder, i) => {
          const rowY = TABLE_Y + ROW_HEIGHT * i;
          const centerY = rowY + ROW_HEIGHT / 2;

          return (
            <g key={folder.path}>
              {i > 0 && (
                <line x1="40" y1={rowY} x2="460" y2={rowY} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              )}
              <text
                x={COL_FOLDER_X}
                y={centerY + 4}
                fill="rgba(245, 240, 250, 0.88)"
                fontSize="12"
                fontFamily="'IBM Plex Sans', system-ui, sans-serif"
              >
                {folder.path}
              </text>
              <text
                x={COL_TRACKS_X}
                y={centerY + 4}
                fill="rgba(245, 240, 250, 0.68)"
                fontSize="12"
                fontFamily="'IBM Plex Sans', system-ui, sans-serif"
                textAnchor="end"
              >
                {folder.tracks}
              </text>
              <Check x={COL_STATUS_X} y={centerY} />
              <TrashIcon x={COL_DELETE_X} y={centerY - 7} />
            </g>
          );
        })}

        {/* Buttons */}
        <rect x="40" y="296" width="110" height="20" rx="5" fill="none" stroke="rgba(245, 240, 250, 0.3)" strokeWidth="1" />
        <text x="66" y="310" fill="rgba(245, 240, 250, 0.7)" fontSize="10" fontFamily="'IBM Plex Sans', system-ui, sans-serif">
          Scan & Refresh
        </text>

        <rect x="390" y="296" width="60" height="20" rx="5" fill="#C8387E" />
        <text x="407" y="310" fill="#fff" fontSize="10" fontWeight="600" fontFamily="'Noto Sans JP', system-ui, sans-serif">
          完了
        </text>
      </svg>
    </Wrapper>
  );
}
