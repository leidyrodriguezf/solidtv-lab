import { Column } from '@solidtv/solid/primitives'

// Note: <text> can technically be a direct child of Column/Row/view,
// but it doesn't support skipFocus (it's a TextNode, not an ElementNode).
// Wrapping it in <view skipFocus> prevents the focus system from landing on it.
export default function ViewTextExample() {
  return (
    <Column gap={12} scroll="none" style={{ width: 800, height: 850 }}>
      <view width={700} height={30} skipFocus>
        <text style={{ fontSize: 26, color: 0xf0e6d3ff }}>
          {'view — the basic container'}
        </text>
      </view>

      <view width={600} height={80} color={0x2d2b55ff} borderRadius={12} skipFocus>
        <text x={20} y={8} style={{ fontSize: 20, color: 0xf9fafbff }}>
          {'A view is like a div: a rectangle with'}
        </text>
        <text x={20} y={34} style={{ fontSize: 20, color: 0xf9fafbff }}>
          {'color, size, position, and children.'}
        </text>
        <text x={20} y={58} style={{ fontSize: 16, color: 0x9ca3afff }}>
          {'width=600  height=80  color=0x2d2b55ff'}
        </text>
      </view>

      <view width={700} height={30} skipFocus>
        <text style={{ fontSize: 26, color: 0xf0e6d3ff }}>
          {'text — rendering text'}
        </text>
      </view>

      <view width={600} height={80} skipFocus>
        <text style={{ fontSize: 30, color: 0xc084fcff }}>
          {'fontSize: 30, purple'}
        </text>
        <text y={36} style={{ fontSize: 20, color: 0x60a5faff }}>
          {'fontSize: 20, blue'}
        </text>
        <text y={60} style={{ fontSize: 16, color: 0x34d399ff }}>
          {'fontSize: 16, green'}
        </text>
      </view>

      <view width={700} height={30} skipFocus>
        <text style={{ fontSize: 26, color: 0xf0e6d3ff }}>
          {'Positioning: x, y'}
        </text>
      </view>

      <view width={600} height={100} color={0x1a1a2eff} borderRadius={12} skipFocus>
        <view x={0} y={10} width={70} height={70} color={0xc084fcff} borderRadius={8} />
        <text x={80} y={30} style={{ fontSize: 16, color: 0x9ca3afff }}>{'x=0, y=10'}</text>

        <view x={200} y={20} width={70} height={70} color={0x60a5faff} borderRadius={8} />
        <text x={280} y={40} style={{ fontSize: 16, color: 0x9ca3afff }}>{'x=200, y=20'}</text>

        <view x={420} y={30} width={60} height={60} color={0x34d399ff} borderRadius={8} />
        <text x={490} y={45} style={{ fontSize: 16, color: 0x9ca3afff }}>{'x=420, y=30'}</text>
      </view>

      <view width={700} height={30} skipFocus>
        <text style={{ fontSize: 26, color: 0xf0e6d3ff }}>
          {'Nesting views'}
        </text>
      </view>

      <view width={600} height={100} color={0x374151ff} borderRadius={12} skipFocus>
        <text x={10} y={5} style={{ fontSize: 14, color: 0x9ca3afff }}>{'Parent (gray)'}</text>
        <view x={20} y={28} width={240} height={60} color={0x2d2b55ff} borderRadius={8}>
          <text x={10} y={5} style={{ fontSize: 14, color: 0x9ca3afff }}>{'Child (purple)'}</text>
          <view x={10} y={28} width={110} height={24} color={0xc084fcff} borderRadius={6}>
            <text x={8} y={3} style={{ fontSize: 14, color: 0x1a1a2eff }}>{'Grandchild'}</text>
          </view>
        </view>
        <view x={290} y={28} width={240} height={60} color={0x1e3a5fff} borderRadius={8}>
          <text x={10} y={18} style={{ fontSize: 18, color: 0x60a5faff }}>{'Sibling (blue)'}</text>
        </view>
      </view>

      <view width={700} height={26} skipFocus>
        <text style={{ fontSize: 22, color: 0xf0e6d3ff }}>
          {'How it works:'}
        </text>
      </view>

      <view width={700} height={140} skipFocus>
        <text style={{ fontSize: 17, color: 0x9ca3afff, width: 680, contain: 'width' }}>
          {'In SolidTV, view and text are the only two intrinsic elements (like div and span in HTML). Views are positioned with x/y (absolute within parent). Children are always relative to their parent. There is no CSS — you set width, height, color, borderRadius directly as props. Text rendering uses fontSize, color, and contain: "width" for wrapping.'}
        </text>
      </view>
    </Column>
  )
}
