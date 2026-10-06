import { createSignal } from 'solid-js'
import { Column, Row } from '@solidtv/solid/primitives'
import { Grid } from '@solidtv/solid/primitives'

const colors = [0xc084fcff, 0x60a5faff, 0x34d399ff, 0xfbbf24ff, 0xf472b6ff, 0x38bdf8ff, 0xef4444ff, 0xa78bfaff]

const items = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  label: `Item ${i + 1}`,
  color: colors[i % colors.length],
}))

const loopItems = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  label: `#${i + 1}`,
  color: colors[i % colors.length],
}))

const cardStyle = {
  color: 0x1a1a2eff,
  borderRadius: 10,
  $focus: { color: 0x2d2b55ff },
}

function GridItem(props: { item: any; index: number; width: number; height: number; x: number; y: number }) {
  return (
    <view x={props.x} y={props.y} width={props.width} height={props.height}
      style={cardStyle} forwardStates>
      <text x={12} y={10} style={{ fontSize: 20, color: props.item.color }}>
        {props.item.label}
      </text>
      <text x={12} y={36} style={{ fontSize: 14, color: 0x6b7280ff }}>
        {`col ${(props.index % 4) + 1}, row ${Math.floor(props.index / 4) + 1}`}
      </text>
    </view>
  )
}

export default function GridExample() {
  const [selectedIdx, setSelectedIdx] = createSignal(0)
  const [loopIdx, setLoopIdx] = createSignal(0)
  const [looping, setLooping] = createSignal(true)

  return (
    <Column gap={16} scroll="auto" style={{ width: 1400, height: 850 }}>

      {/* Section: Basic Grid */}
      <Column gap={6} style={{ width: 1300, height: 340 }}>
        <view height={26} width={700} skipFocus>
          <text style={{ fontSize: 24, color: 0xf0e6d3ff }}>
            {`Grid 4 columns — selected: ${selectedIdx()}`}
          </text>
        </view>
        <view width={1200} height={300} clipping forwardFocus={0}>
          <Grid
            items={items}
            columns={4}
            itemWidth={280}
            itemHeight={70}
            itemOffset={10}
            scroll="auto"
            onSelectedChanged={(index: number) => setSelectedIdx(index)}
          >
            {(props: any) => <GridItem {...props} />}
          </Grid>
        </view>
      </Column>

      {/* Section: Grid with looping toggle */}
      <Column gap={6} style={{ width: 1300, height: 280 }}>
        <view height={26} width={700} skipFocus>
          <text style={{ fontSize: 24, color: 0xf0e6d3ff }}>
            {`Grid with looping — selected: ${loopIdx()}`}
          </text>
        </view>
        <Row gap={12} scroll="none" style={{ width: 600, height: 44 }}>
          <view width={280} height={44} color={looping() ? 0x7c3aedff : 0x1a1a2eff} borderRadius={8}
            $focus={{ color: 0x9333eaff }}
            onEnter={() => setLooping(v => !v)}>
            <text x={15} y={10} style={{ fontSize: 18, color: 0xffffffff }}>
              {`Looping: ${looping() ? 'ON' : 'OFF'}`}
            </text>
          </view>
        </Row>
        <view width={1200} height={180} clipping forwardFocus={0}
          onBack={() => { setLooping(false); return true }}>
          <Grid
            items={loopItems}
            columns={4}
            itemWidth={280}
            itemHeight={70}
            itemOffset={10}
            looping={looping()}
            scroll="auto"
            onSelectedChanged={(index: number) => setLoopIdx(index)}
          >
            {(props: any) => <GridItem {...props} />}
          </Grid>
        </view>
      </Column>

      {/* How it works */}
      <view width={700} height={280} color={0x1a1a2eff} borderRadius={10}
        $focus={{ color: 0x2d2b55ff, borderRadius: 10 }}>
        <text x={15} y={10} style={{ fontSize: 22, color: 0xf0e6d3ff }}>
          {'How it works:'}
        </text>
        <text x={15} y={40} style={{ fontSize: 17, color: 0x9ca3afff, width: 660, contain: 'width' }}>
          {'Grid arranges items in a 2D grid with automatic keyboard navigation (arrows move between cells). Set columns for the number of columns, itemWidth/itemHeight for cell size, and itemOffset for gap. Navigation is column-aware: left/right stays in the same row, up/down moves between rows. Enable looping to wrap around at edges — reaching the last column wraps to the first, last row wraps to the first row. Grid handles scroll automatically. The children render function receives item, index, x, y, width, height — position each child using these props. Use onSelectedChanged to track the focused index.'}
        </text>
      </view>
    </Column>
  )
}
