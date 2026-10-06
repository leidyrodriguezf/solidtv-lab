import { createSignal } from 'solid-js'
import { Column } from '@solidtv/solid/primitives'

export default function SignalsExample() {
  const [count, setCount] = createSignal(0)
  const [name, setName] = createSignal('Solid')

  const boxStyle = {
    width: 500,
    height: 70,
    color: 0x1a1a2eff,
    borderRadius: 12,
    $focus: { color: 0x2d2b55ff },
  }

  return (
    <Column gap={20} scroll="none" style={{ width: 800, height: 500 }}>
      <view width={500} height={35} skipFocus>
        <text style={{ fontSize: 30, color: 0xf0e6d3ff }}>
          {'createSignal: reactive counter'}
        </text>
      </view>

      <view style={boxStyle} onEnter={() => { setCount(c => c + 1) }}>
        <text x={20} y={18} style={{ fontSize: 30, color: 0xc084fcff }}>
          {`Counter: ${count()}`}
        </text>
      </view>

      <view width={500} height={25} skipFocus>
        <text style={{ fontSize: 20, color: 0x9ca3afff }}>
          {'Press Enter to increment'}
        </text>
      </view>

      <view style={boxStyle} onEnter={() => { setName(n => (n === 'Solid' ? 'SolidTV' : 'Solid')) }}>
        <text x={20} y={18} style={{ fontSize: 30, color: 0x60a5faff }}>
          {`Hello, ${name()}!`}
        </text>
      </view>

      <view width={500} height={25} skipFocus>
        <text style={{ fontSize: 20, color: 0x9ca3afff }}>
          {'Press Enter to toggle the name'}
        </text>
      </view>
    </Column>
  )
}
