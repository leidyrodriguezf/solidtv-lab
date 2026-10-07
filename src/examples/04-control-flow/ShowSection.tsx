import { createSignal } from 'solid-js'
import { Show } from '@solidtv/solid'
import { Column } from '@solidtv/solid/primitives'
import { sectionTitle, hint, btn } from './styles'

export default function ShowSection() {
  const [visible, setVisible] = createSignal(true)

  return (
    <Column gap={6} style={{ width: 700, height: 170 }}>
      <view height={30} width={700} skipFocus>
        <text style={sectionTitle}>{'1. Show — conditional rendering'}</text>
      </view>
      <view height={22} width={700} skipFocus>
        <text style={hint}>
          {'When: "if condition is true, render this". Multiple Shows can be visible at the same time.'}
        </text>
      </view>
      <view {...btn} onEnter={() => setVisible(v => !v)}>
        <text x={20} y={12} style={{ fontSize: 22, color: 0x60a5faff }}>
          {visible() ? 'Hide greeting (Enter)' : 'Show greeting (Enter)'}
        </text>
      </view>
      <Show
        when={visible()}
        fallback={
          <view width={500} height={40} skipFocus>
            <text style={{ fontSize: 20, color: 0x6b7280ff }}>
              {'(hidden — fallback is the "else" branch)'}
            </text>
          </view>
        }
      >
        <view width={500} height={40} skipFocus>
          <text style={{ fontSize: 20, color: 0x34d399ff }}>
            {'Hello! I am visible because visible() is true.'}
          </text>
        </view>
      </Show>
    </Column>
  )
}
