import styled from "styled-components";

const ROW_HEIGHT = 28;
const SIDEBAR_WIDTH = 200;
const MENU_X = 210;
const MENU_Y = 80;
const SUBMENU_X = 340;

interface PlaylistItem {
  name: string;
  count: number;
  selected?: boolean;
}

const PLAYLISTS: PlaylistItem[] = [
  { name: "Friday_Set", count: 32, selected: true },
  { name: "Club_Mix_01", count: 18 },
  { name: "Chill_Lounge", count: 24 },
  { name: "Peak_Hour", count: 45 },
  { name: "Warm_Up", count: 28 },
  { name: "After_Party", count: 15 },
  { name: "Classics", count: 52 },
];

const SUBMENU_ITEMS = ["Friday_Set", "Club_Mix_01", "Chill_Lounge"];

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function RekordboxPlaylistMock() {
  const headerY = 20;
  const listStartY = headerY + 32;

  return (
    <Wrapper>
      <svg
        viewBox="0 0 480 300"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="rekordboxプレイリスト読み込み・編集"
      >
        <rect width="480" height="300" fill="#161616" rx="4" />

        <line
          x1={SIDEBAR_WIDTH}
          y1="0"
          x2={SIDEBAR_WIDTH}
          y2="300"
          stroke="#2E2E2E"
          strokeWidth="1"
        />

        <text
          x="16"
          y={headerY + 12}
          fill="rgba(255, 255, 255, 0.5)"
          fontSize="10"
          fontWeight="600"
          fontFamily="'IBM Plex Sans', system-ui, sans-serif"
          letterSpacing="0.3"
        >
          rekordbox playlists
        </text>
        <text
          x={SIDEBAR_WIDTH - 16}
          y={headerY + 12}
          fill="rgba(255, 255, 255, 0.35)"
          fontSize="14"
          fontFamily="'IBM Plex Sans', system-ui, sans-serif"
          textAnchor="middle"
        >
          +
        </text>

        <line
          x1="8"
          y1={headerY + 22}
          x2={SIDEBAR_WIDTH - 8}
          y2={headerY + 22}
          stroke="#2E2E2E"
          strokeWidth="1"
        />

        {PLAYLISTS.map((item, i) => {
          const rowY = listStartY + ROW_HEIGHT * i;
          const textY = rowY + ROW_HEIGHT / 2 + 4;

          return (
            <g key={item.name}>
              {item.selected && (
                <rect
                  x="4"
                  y={rowY}
                  width={SIDEBAR_WIDTH - 8}
                  height={ROW_HEIGHT}
                  fill="rgba(52, 204, 208, 0.2)"
                  rx="3"
                />
              )}
              <text
                x={16}
                y={textY}
                fill={
                  item.selected
                    ? "rgba(255, 255, 255, 0.95)"
                    : "rgba(255, 255, 255, 0.72)"
                }
                fontSize="11"
                fontFamily="'IBM Plex Sans', system-ui, sans-serif"
              >
                {item.name}
              </text>
              <text
                x={SIDEBAR_WIDTH - 16}
                y={textY}
                fill="rgba(255, 255, 255, 0.35)"
                fontSize="10"
                fontFamily="'IBM Plex Sans', system-ui, sans-serif"
                textAnchor="end"
              >
                {item.count}
              </text>
            </g>
          );
        })}

        <rect
          x={MENU_X}
          y={MENU_Y}
          width="120"
          height="100"
          fill="#1E1E1E"
          stroke="#2E2E2E"
          strokeWidth="1"
          rx="6"
        />
        {[
          { label: "Finderで表示", y: 0 },
          { label: "ファイルパスをコピー", y: 1 },
        ].map((menuItem) => {
          const itemY = MENU_Y + 8 + menuItem.y * 22;
          return (
            <text
              key={menuItem.label}
              x={MENU_X + 10}
              y={itemY + 14}
              fill="rgba(255, 255, 255, 0.72)"
              fontSize="10"
              fontFamily="'IBM Plex Sans', 'Noto Sans JP', system-ui, sans-serif"
            >
              {menuItem.label}
            </text>
          );
        })}

        <line
          x1={MENU_X + 6}
          y1={MENU_Y + 52}
          x2={MENU_X + 114}
          y2={MENU_Y + 52}
          stroke="#2E2E2E"
          strokeWidth="1"
        />

        <rect
          x={MENU_X + 3}
          y={MENU_Y + 56}
          width="114"
          height="22"
          fill="rgba(52, 204, 208, 0.15)"
          rx="3"
        />
        <text
          x={MENU_X + 10}
          y={MENU_Y + 72}
          fill="rgba(255, 255, 255, 0.95)"
          fontSize="10"
          fontWeight="500"
          fontFamily="'IBM Plex Sans', 'Noto Sans JP', system-ui, sans-serif"
        >
          プレイリストに追加
        </text>
        <text
          x={MENU_X + 110}
          y={MENU_Y + 72}
          fill="rgba(255, 255, 255, 0.5)"
          fontSize="10"
          fontFamily="'IBM Plex Sans', system-ui, sans-serif"
          textAnchor="end"
        >
          ▸
        </text>

        <text
          x={MENU_X + 10}
          y={MENU_Y + 94}
          fill="rgba(255, 255, 255, 0.72)"
          fontSize="10"
          fontFamily="'IBM Plex Sans', 'Noto Sans JP', system-ui, sans-serif"
        >
          プレイリストから削除
        </text>

        <rect
          x={SUBMENU_X}
          y={MENU_Y + 40}
          width="100"
          height={SUBMENU_ITEMS.length * 22 + 12}
          fill="#1E1E1E"
          stroke="#2E2E2E"
          strokeWidth="1"
          rx="6"
        />
        {SUBMENU_ITEMS.map((name, i) => {
          const itemY = MENU_Y + 40 + 6 + i * 22;
          return (
            <text
              key={name}
              x={SUBMENU_X + 10}
              y={itemY + 14}
              fill="rgba(255, 255, 255, 0.72)"
              fontSize="9"
              fontFamily="'IBM Plex Sans', system-ui, sans-serif"
            >
              {name}
            </text>
          );
        })}
      </svg>
    </Wrapper>
  );
}
