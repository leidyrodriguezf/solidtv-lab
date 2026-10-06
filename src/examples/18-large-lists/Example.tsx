import { createSignal } from 'solid-js'
import { Column } from '@solidtv/solid/primitives'
import { VirtualRow, VirtualColumn } from '@solidtv/solid/primitives'

const colors = [0xc084fcff, 0x60a5faff, 0x34d399ff, 0xfbbf24ff, 0xf472b6ff, 0x38bdf8ff, 0xef4444ff, 0xa78bfaff]

const rowItems = Array.from({ length: 200 }, (_, i) => ({
  id: i,
  label: `Item ${i + 1}`,
  color: colors[i % colors.length],
}))

const colItems = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  label: `Row ${i + 1}`,
  color: colors[i % colors.length],
}))

const gridItems = Array.from({ length: 500 }, (_, i) => ({
  id: i,
  label: `#${i + 1}`,
  color: colors[i % colors.length],
}))

const rowCard = {
  width: 180,
  height: 80,
  color: 0x1a1a2eff,
  borderRadius: 10,
  $focus: { color: 0x2d2b55ff },
}

const colCard = {
  width: 480,
  height: 50,
  color: 0x1a1a2eff,
  borderRadius: 8,
  $focus: { color: 0x2d2b55ff },
}

const smallCard = {
  width: 140,
  height: 80,
  color: 0x1a1a2eff,
  borderRadius: 10,
  $focus: { color: 0x7c3aedff },
}

export default function LargeListsExample() {
  const [rowCount] = createSignal(rowItems.length)
  const [colCount] = createSignal(colItems.length)

  return (
    <Column gap={16} scroll="auto" style={{ width: 1400, height: 850 }}>

      {/* Section: VirtualRow — horizontal */}
      <Column gap={6} style={{ width: 1300, height: 140 }}>
        <view height={26} width={700} skipFocus>
          <text style={{ fontSize: 24, color: 0xf0e6d3ff }}>
            {`VirtualRow — ${rowCount()} items, only visible ones render`}
          </text>
        </view>
        <VirtualRow
          each={rowItems}
          displaySize={6}
          bufferSize={2}
          gap={12}
          width={1200}
          height={90}
        >
          {(item) => (
            <view style={rowCard} forwardStates>
              <text x={15} y={26} style={{ fontSize: 20, color: item().color }}>
                {item().label}
              </text>
            </view>
          )}
        </VirtualRow>
      </Column>

      {/* Section: VirtualColumn — vertical */}
      <Column gap={6} style={{ width: 1300, height: 260 }}>
        <view height={26} width={700} skipFocus>
          <text style={{ fontSize: 24, color: 0xf0e6d3ff }}>
            {`VirtualColumn — ${colCount()} items vertical`}
          </text>
        </view>
        <VirtualColumn
          each={colItems}
          displaySize={4}
          bufferSize={2}
          gap={8}
          width={500}
          height={220}
        >
          {(item) => (
            <view style={colCard} forwardStates>
              <text x={15} y={12} style={{ fontSize: 18, color: item().color }}>
                {item().label}
              </text>
            </view>
          )}
        </VirtualColumn>
      </Column>

      {/* Section: VirtualRow with wrap — carousel */}
      <Column gap={6} style={{ width: 1300, height: 140 }}>
        <view height={26} width={700} skipFocus>
          <text style={{ fontSize: 24, color: 0xf0e6d3ff }}>
            {'VirtualRow + wrap — infinite carousel'}
          </text>
        </view>
        <VirtualRow
          each={gridItems}
          displaySize={8}
          bufferSize={2}
          wrap
          gap={12}
          width={1200}
          height={90}
        >
          {(item) => (
            <view style={smallCard} forwardStates>
              <text x={15} y={26} style={{ fontSize: 18, color: item().color }}>
                {item().label}
              </text>
            </view>
          )}
        </VirtualRow>
      </Column>

      {/* How it works */}
      <view width={700} height={280} color={0x1a1a2eff} borderRadius={10}
        $focus={{ color: 0x2d2b55ff, borderRadius: 10 }}>
        <text x={15} y={10} style={{ fontSize: 22, color: 0xf0e6d3ff }}>
          {'How it works:'}
        </text>
        <text x={15} y={40} style={{ fontSize: 17, color: 0x9ca3afff, width: 660, contain: 'width' }}>
          {'VirtualRow and VirtualColumn only render items visible on screen plus a buffer. displaySize is the NUMBER OF ITEMS visible (not pixels) — e.g. displaySize={6} for 6 cards. bufferSize adds extra items off-screen for smooth scrolling. Set wrap for infinite looping. Use style objects (not direct props) for $focus in virtual items — the style system tracks base values more reliably when nodes are recycled. Keep $focus simple: only change color, avoid borderRadius/scale/border. For infinite data, use createInfiniteItems(fetcher) with onEndReached.'}
        </text>
      </view>
    </Column>
  )
}
