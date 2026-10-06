import { createSignal, onMount, onCleanup, Show } from 'solid-js'
import { Column } from '@solidtv/solid/primitives'

function Counter() {
  console.log('1. Counter created')
  const [seconds, setSeconds] = createSignal<(number)>(0)
  const [log, setLog] = createSignal('1. Counter created')

  onMount(() => {
    console.log('2. Counter mounted')
    setLog(prev => prev + '\n2. Counter mounted')

    const timer = setInterval(() => {
      setSeconds(v => v + 1)
    }, 1000)

    onCleanup(() => {
      clearInterval(timer)
      console.log('4. Counter unmounted, timer cleared')
    })
  })

  return (
    <view width={700} height={120} skipFocus>
      <text x={20} y={10} style={{ fontSize: 32, color: 0xc084fcff }}>
        {`Seconds: ${seconds()}`}
      </text>
      <text x={20} y={55} style={{ fontSize: 18, color: 0x6b7280ff, width: 660, contain: 'width' }}>
        {log()}
      </text>
    </view>
  )
}

const boxStyle = {
  width: 500,
  height: 70,
  color: 0x1a1a2eff,
  borderRadius: 12,
  $focus: { color: 0x2d2b55ff },
}

export default function LifecycleExample() {
  const [visible, setVisible] = createSignal(true)

  return (
    <Column gap={20} scroll="none" style={{ width: 800, height: 500 }}>
      <view width={700} height={35} skipFocus>
        <text style={{ fontSize: 30, color: 0xf0e6d3ff }}>
          {'Lifecycle: onMount / onCleanup'}
        </text>
      </view>
        <view style={boxStyle} onEnter={() => { setVisible(v => !v) }}>
        <text x={20} y={18} style={{ fontSize: 28, color: 0x60a5faff }}>
          {visible() ? 'Hide counter' : 'Show counter'}
        </text>
      </view>

      <view width={500} height={25} skipFocus>
        <text style={{ fontSize: 20, color: 0x9ca3afff }}>
          {'Press Enter to mount/unmount'}
        </text>
      </view>

      <Show when={visible()}>
        <Counter />
      </Show>

      <view width={700} height={50} skipFocus>
        <text style={{ fontSize: 18, color: 0x4b5563ff, width: 680, contain: 'width' }}>
          {'Open the browser console to see lifecycle logs (onMount, onCleanup)'}
        </text>
      </view>
    </Column>
  )
}
