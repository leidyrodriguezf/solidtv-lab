import { createSignal, createMemo } from 'solid-js'
import { Column } from '@solidtv/solid/primitives'

export default function MemosExample() {
  const [price, setPrice] = createSignal(100)
  const [quantity, setQuantity] = createSignal(1)

  const total = createMemo(() => price() * quantity())
  const withTax = createMemo(() => total() * 1.21)

  const boxStyle = {
    width: 500,
    height: 70,
    color: 0x1a1a2eff,
    borderRadius: 12,
    $focus: { color: 0x2d2b55ff },
  }

  return (
    <Column gap={20} scroll="none" style={{ width: 800, height: 600 }}>
      <view width={700} height={35} skipFocus>
        <text style={{ fontSize: 30, color: 0xf0e6d3ff }}>
          {'createMemo: cached derived values'}
        </text>
      </view>

      <view style={boxStyle} onEnter={() => { setPrice(p => p + 10) }}>
        <text x={20} y={18} style={{ fontSize: 30, color: 0xc084fcff }}>
          {`Price: $${price()}`}
        </text>
      </view>

      <view width={500} height={25} skipFocus>
        <text style={{ fontSize: 20, color: 0x9ca3afff }}>
          {'Press Enter to add $10'}
        </text>
      </view>

      <view style={boxStyle} onEnter={() => { setQuantity(q => q + 1) }}>
        <text x={20} y={18} style={{ fontSize: 30, color: 0x60a5faff }}>
          {`Quantity: ${quantity()}`}
        </text>
      </view>

      <view width={500} height={25} skipFocus>
        <text style={{ fontSize: 20, color: 0x9ca3afff }}>
          {'Press Enter to add 1'}
        </text>
      </view>

      <view width={700} height={70}  color={0x1a1a2eff} skipFocus>
        <text x={20} y={18} style={{ fontSize: 28, color: 0x34d399ff }}>
          {`Total: $${total()}  |  With tax (21%): $${withTax().toFixed(2)}`}
        </text>
      </view>

      <view width={700} height={30} skipFocus>
        <text style={{ fontSize: 22, fontWeight: 700, color: 0xf0e6d3ff }}>
          {'How it works:'}
        </text>
      </view>

      <view width={700} height={160} skipFocus>
        <text style={{ fontSize: 18, color: 0x9ca3afff, width: 680, contain: 'width' }}>
          {`price() = ${price()}, quantity() = ${quantity()}
total = createMemo(() => price() * quantity()) → ${total()}
withTax = createMemo(() => total() * 1.21) → ${withTax().toFixed(2)}

Memos cache the result and only recompute when a dependency changes. If you change price, total recomputes, and withTax recomputes because it depends on total. Quantity stays untouched.`}
        </text>
      </view>
    </Column>
  )
}
