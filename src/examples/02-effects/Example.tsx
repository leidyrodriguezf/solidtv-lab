import { createSignal, createEffect } from 'solid-js'
import { Column } from '@solidtv/solid/primitives'

export default function EffectsExample() {
  const [count, setCount] = createSignal(0)
  const [logs, setLogs] = createSignal<string[]>([])

  createEffect(() => {
    const value = count()
    const msg = `Effect ran — count is now ${value}`
    console.log(msg)
    setLogs(prev => [...prev.slice(-4), msg])
  })

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
          {'createEffect: reacts to signal changes'}
        </text>
      </view>

      <view style={boxStyle} onEnter={() => { setCount(c => c + 1) }}>
        <text x={20} y={18} style={{ fontSize: 30, color: 0xc084fcff }}>
          {`Count: ${count()}`}
        </text>
      </view>

      <view width={500} height={25} skipFocus>
        <text style={{ fontSize: 20, color: 0x9ca3afff }}>
          {'Press Enter to increment'}
        </text>
      </view>

      <view style={boxStyle} onEnter={() => { setCount(0) }}>
        <text x={20} y={18} style={{ fontSize: 30, color: 0x60a5faff }}>
          {'Reset counter'}
        </text>
      </view>

      <view width={500} height={25} skipFocus>
        <text style={{ fontSize: 20, color: 0x9ca3afff }}>
          {'Press Enter to reset'}
        </text>
      </view>

      <view width={700} height={25} skipFocus>
        <text style={{ fontSize: 22, fontWeight: 700, color: 0xf0e6d3ff }}>
          {'Effect log (last 5):'}
        </text>
      </view>

      <view width={700} height={130} skipFocus>
        <text y={0} style={{ fontSize: 18, color: 0x9ca3afff, width: 680, contain: 'width' }}>
          {logs().join('\n')}
        </text>
      </view>
    </Column>
  )
}
