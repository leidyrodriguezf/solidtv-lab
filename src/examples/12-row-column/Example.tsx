import { createSignal } from 'solid-js'
import { Row, Column } from '@solidtv/solid/primitives'

const cardStyle = {
  width: 180,
  height: 80,
  color: 0x1a1a2eff,
  borderRadius: 12,
  $focus: { color: 0x2d2b55ff, borderRadius: 12 },
}

const smallCard = {
  width: 180,
  height: 60,
  color: 0x1a1a2eff,
  borderRadius: 8,
  $focus: { color: 0x2d2b55ff, borderRadius: 8 },
}

export default function RowColumnExample() {
  const [scrollType, setScrollType] = createSignal<'auto' | 'edge' | 'none'>('auto')
  const [wrapEnabled, setWrapEnabled] = createSignal(false)

  const cycleScroll = () => {
    const types: Array<'auto' | 'edge' | 'none'> = ['auto', 'edge', 'none']
    setScrollType(s => types[(types.indexOf(s) + 1) % types.length])
  }

  const toggleWrap = () => {
    setWrapEnabled(w => !w)
  }

  return (
    <Column gap={14} scroll="auto" style={{ width: 1400, height: 850 }}>
      <view width={700} height={28} skipFocus>
        <text style={{ fontSize: 26, color: 0xf0e6d3ff }}>
          {'Row — horizontal layout (left/right nav)'}
        </text>
      </view>

      <Row gap={12} scroll="none" style={{ width: 1200, height: 90 }}>
        <view style={cardStyle}>
          <text x={15} y={26} style={{ fontSize: 22, color: 0xc084fcff }}>{'Item 1'}</text>
        </view>
        <view style={cardStyle}>
          <text x={15} y={26} style={{ fontSize: 22, color: 0x60a5faff }}>{'Item 2'}</text>
        </view>
        <view style={cardStyle}>
          <text x={15} y={26} style={{ fontSize: 22, color: 0x34d399ff }}>{'Item 3'}</text>
        </view>
        <view style={cardStyle}>
          <text x={15} y={26} style={{ fontSize: 22, color: 0xf59e0bff }}>{'Item 4'}</text>
        </view>
        <view style={cardStyle}>
          <text x={15} y={26} style={{ fontSize: 22, color: 0xef4444ff }}>{'Item 5'}</text>
        </view>
      </Row>

      <view width={700} height={28} skipFocus>
        <text style={{ fontSize: 26, color: 0xf0e6d3ff }}>
          {'Column — vertical layout (up/down nav)'}
        </text>
      </view>

      <Column gap={8} scroll="none" style={{ width: 400, height: 220 }}>
        <view style={smallCard}>
          <text x={15} y={16} style={{ fontSize: 20, color: 0xc084fcff }}>{'Option A'}</text>
        </view>
        <view style={smallCard}>
          <text x={15} y={16} style={{ fontSize: 20, color: 0x60a5faff }}>{'Option B'}</text>
        </view>
        <view style={smallCard}>
          <text x={15} y={16} style={{ fontSize: 20, color: 0x34d399ff }}>{'Option C'}</text>
        </view>
      </Column>

      <view width={700} height={28} skipFocus>
        <text style={{ fontSize: 26, color: 0xf0e6d3ff }}>
          {'Scroll modes + wrap'}
        </text>
      </view>

      <view width={700} height={30} skipFocus>
        <text style={{ fontSize: 18, color: 0x9ca3afff }}>
          {`scroll="${scrollType()}" | wrap=${wrapEnabled()}`}
        </text>
      </view>

      <Row gap={10} style={{ width: 500, height: 70 }}>
        <view width={220} height={50} color={0x1a1a2eff} borderRadius={8}
          $focus={{ color: 0x2d2b55ff }} onEnter={cycleScroll}>
          <text x={12} y={12} style={{ fontSize: 20, color: 0xc084fcff }}>
            {`Cycle scroll mode`}
          </text>
        </view>
        <view width={220} height={50} color={0x1a1a2eff} borderRadius={8}
          $focus={{ color: 0x2d2b55ff }} onEnter={toggleWrap}>
          <text x={12} y={12} style={{ fontSize: 20, color: 0x60a5faff }}>
            {`Toggle wrap: ${wrapEnabled()}`}
          </text>
        </view>
      </Row>

      <Row gap={10} scroll={scrollType()} wrap={wrapEnabled()}
        style={{ width: 600, height: 70 }}>
        <view style={smallCard}>
          <text x={15} y={16} style={{ fontSize: 18, color: 0xc084fcff }}>{'Card 1'}</text>
        </view>
        <view style={smallCard}>
          <text x={15} y={16} style={{ fontSize: 18, color: 0x60a5faff }}>{'Card 2'}</text>
        </view>
        <view style={smallCard}>
          <text x={15} y={16} style={{ fontSize: 18, color: 0x34d399ff }}>{'Card 3'}</text>
        </view>
        <view style={smallCard}>
          <text x={15} y={16} style={{ fontSize: 18, color: 0xf59e0bff }}>{'Card 4'}</text>
        </view>
        <view style={smallCard}>
          <text x={15} y={16} style={{ fontSize: 18, color: 0xef4444ff }}>{'Card 5'}</text>
        </view>
        <view style={smallCard}>
          <text x={15} y={16} style={{ fontSize: 18, color: 0xa78bfaff }}>{'Card 6'}</text>
        </view>
      </Row>

      <view width={700} height={28} skipFocus>
        <text style={{ fontSize: 26, color: 0xf0e6d3ff }}>
          {'Carousel (scroll="always")'}
        </text>
      </view>

      <view width={700} height={30} skipFocus>
        <text style={{ fontSize: 18, color: 0x9ca3afff }}>
          {'Focus stays on the first position — items scroll through'}
        </text>
      </view>

      {/* scroll="always" keeps focus at index 0, items slide left */}
      <Row gap={12} scroll="always" wrap style={{ width: 600, height: 90 }}>
        <view style={cardStyle}>
          <text x={15} y={10} style={{ fontSize: 18, color: 0xc084fcff }}>{'Movie 1'}</text>
          <text x={15} y={40} style={{ fontSize: 14, color: 0x6b7280ff }}>{'Action'}</text>
        </view>
        <view style={cardStyle}>
          <text x={15} y={10} style={{ fontSize: 18, color: 0x60a5faff }}>{'Movie 2'}</text>
          <text x={15} y={40} style={{ fontSize: 14, color: 0x6b7280ff }}>{'Comedy'}</text>
        </view>
        <view style={cardStyle}>
          <text x={15} y={10} style={{ fontSize: 18, color: 0x34d399ff }}>{'Movie 3'}</text>
          <text x={15} y={40} style={{ fontSize: 14, color: 0x6b7280ff }}>{'Drama'}</text>
        </view>
        <view style={cardStyle}>
          <text x={15} y={10} style={{ fontSize: 18, color: 0xf59e0bff }}>{'Movie 4'}</text>
          <text x={15} y={40} style={{ fontSize: 14, color: 0x6b7280ff }}>{'Sci-Fi'}</text>
        </view>
        <view style={cardStyle}>
          <text x={15} y={10} style={{ fontSize: 18, color: 0xef4444ff }}>{'Movie 5'}</text>
          <text x={15} y={40} style={{ fontSize: 14, color: 0x6b7280ff }}>{'Horror'}</text>
        </view>
        <view style={cardStyle}>
          <text x={15} y={10} style={{ fontSize: 18, color: 0xa78bfaff }}>{'Movie 6'}</text>
          <text x={15} y={40} style={{ fontSize: 14, color: 0x6b7280ff }}>{'Romance'}</text>
        </view>
        <view style={cardStyle}>
          <text x={15} y={10} style={{ fontSize: 18, color: 0xfbbf24ff }}>{'Movie 7'}</text>
          <text x={15} y={40} style={{ fontSize: 14, color: 0x6b7280ff }}>{'Thriller'}</text>
        </view>
        <view style={cardStyle}>
          <text x={15} y={10} style={{ fontSize: 18, color: 0xf472b6ff }}>{'Movie 8'}</text>
          <text x={15} y={40} style={{ fontSize: 14, color: 0x6b7280ff }}>{'Anime'}</text>
        </view>
      </Row>

      <view width={700} height={26} skipFocus>
        <text style={{ fontSize: 22, color: 0xf0e6d3ff }}>
          {'How it works:'}
        </text>
      </view>

      <view width={700} height={180} skipFocus>
        <text style={{ fontSize: 17, color: 0x9ca3afff, width: 680, contain: 'width' }}>
          {'Row lays children out horizontally with left/right arrow navigation. Column lays children vertically with up/down. Both accept gap for spacing. Scroll modes: "auto" scrolls immediately, "edge" scrolls at the last visible item, "none" disables scrolling, "always" keeps focus at index 0 while items slide through — perfect for carousels. Set wrap={true} to loop from the last item back to the first. Use plinko={true} on nested rows to align selection across rows (like a grid). These primitives handle focus navigation automatically.'}
        </text>
      </view>
    </Column>
  )
}
