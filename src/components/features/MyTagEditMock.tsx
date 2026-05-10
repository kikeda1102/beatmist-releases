import styled, { keyframes } from "styled-components";

const PANEL_X = 40;
const PANEL_Y = 16;
const PANEL_WIDTH = 400;
const CATEGORY_GAP = 8;
const ITEM_HEIGHT = 22;
const CHECKBOX_SIZE = 11;

interface TagCategory {
  label: string;
  items: TagItem[];
}

interface TagItem {
  name: string;
  checked: boolean;
  animateIndex?: number;
}

const CATEGORIES: TagCategory[] = [
  {
    label: "Genre",
    items: [
      { name: "Acid House", checked: false },
      { name: "Deep House", checked: true },
      { name: "Techno", checked: true },
      { name: "Bass Music", checked: false },
      { name: "Trap", checked: false, animateIndex: 0 },
    ],
  },
  {
    label: "Components",
    items: [
      { name: "Synth", checked: true },
      { name: "Vocal", checked: false },
      { name: "Beat", checked: true },
      { name: "Sub Bass", checked: false, animateIndex: 1 },
    ],
  },
  {
    label: "Situation",
    items: [
      { name: "Main Floor", checked: true },
      { name: "Peak Time", checked: false, animateIndex: 2 },
      { name: "Build up", checked: false },
      { name: "Morning", checked: false },
    ],
  },
];

const toggleCheck = keyframes`
  0%, 20%  { opacity: 0; }
  30%, 70% { opacity: 1; }
  80%, 100% { opacity: 0; }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (prefers-reduced-motion: reduce) {
    svg * {
      animation: none !important;
    }
  }
`;

const AnimatedCheck = styled.g<{ $delay: number }>`
  opacity: 0;
  animation: ${toggleCheck} 8s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`;

function CheckboxChecked({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={CHECKBOX_SIZE}
        height={CHECKBOX_SIZE}
        rx="2"
        fill="#C8387E"
      />
      <path
        d={`M${x + 2.5},${y + CHECKBOX_SIZE / 2} l${CHECKBOX_SIZE * 0.2},${CHECKBOX_SIZE * 0.2} l${CHECKBOX_SIZE * 0.35},-${CHECKBOX_SIZE * 0.35}`}
        stroke="#fff"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

function CheckboxUnchecked({ x, y }: { x: number; y: number }) {
  return (
    <rect
      x={x}
      y={y}
      width={CHECKBOX_SIZE}
      height={CHECKBOX_SIZE}
      rx="2"
      fill="none"
      stroke="rgba(245, 240, 250, 0.3)"
      strokeWidth="1"
    />
  );
}

export default function MyTagEditMock() {
  let currentY = PANEL_Y;

  return (
    <Wrapper>
      <svg
        viewBox="0 0 480 300"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="マイタグ編集パネル"
      >
        <rect width="480" height="300" fill="#141218" rx="4" />

        <rect
          x={PANEL_X - 16}
          y={PANEL_Y - 4}
          width={PANEL_WIDTH + 32}
          height="288"
          fill="#1C1922"
          stroke="#2E2838"
          strokeWidth="1"
          rx="8"
        />

        {CATEGORIES.map((category, catIdx) => {
          const categoryStartY = currentY;
          const headerY = categoryStartY + 18;

          const categoryContent = (
            <g key={category.label}>
              <text
                x={PANEL_X}
                y={headerY}
                fill="rgba(245, 240, 250, 0.92)"
                fontSize="12"
                fontWeight="600"
                fontFamily="'IBM Plex Sans', system-ui, sans-serif"
              >
                {category.label}
              </text>
              <text
                x={PANEL_X + PANEL_WIDTH - 8}
                y={headerY}
                fill="rgba(245, 240, 250, 0.3)"
                fontSize="14"
                fontFamily="'IBM Plex Sans', system-ui, sans-serif"
                textAnchor="end"
              >
                +
              </text>

              {catIdx < CATEGORIES.length - 1 && (
                <line
                  x1={PANEL_X}
                  y1={
                    headerY +
                    10 +
                    category.items.length * ITEM_HEIGHT +
                    CATEGORY_GAP
                  }
                  x2={PANEL_X + PANEL_WIDTH}
                  y2={
                    headerY +
                    10 +
                    category.items.length * ITEM_HEIGHT +
                    CATEGORY_GAP
                  }
                  stroke="#2E2838"
                  strokeWidth="1"
                />
              )}

              {category.items.map((item, itemIdx) => {
                const itemY = headerY + 12 + itemIdx * ITEM_HEIGHT;
                const checkboxY = itemY + 2;
                const textItemY = itemY + CHECKBOX_SIZE;

                return (
                  <g key={item.name}>
                    {item.checked ? (
                      <CheckboxChecked x={PANEL_X + 8} y={checkboxY} />
                    ) : item.animateIndex !== undefined ? (
                      <>
                        <CheckboxUnchecked x={PANEL_X + 8} y={checkboxY} />
                        <AnimatedCheck $delay={item.animateIndex * 2.4}>
                          <CheckboxChecked x={PANEL_X + 8} y={checkboxY} />
                        </AnimatedCheck>
                      </>
                    ) : (
                      <CheckboxUnchecked x={PANEL_X + 8} y={checkboxY} />
                    )}

                    <text
                      x={PANEL_X + 8 + CHECKBOX_SIZE + 8}
                      y={textItemY}
                      fill="rgba(245, 240, 250, 0.72)"
                      fontSize="11"
                      fontFamily="'IBM Plex Sans', system-ui, sans-serif"
                    >
                      {item.name}
                    </text>
                  </g>
                );
              })}
            </g>
          );

          currentY =
            headerY +
            10 +
            category.items.length * ITEM_HEIGHT +
            CATEGORY_GAP * 2 +
            4;

          return categoryContent;
        })}
      </svg>
    </Wrapper>
  );
}
