import { createSignal } from 'solid-js'
import { Switch, Match } from '@solidtv/solid'
import { Column } from '@solidtv/solid/primitives'
import { sectionTitle, hint, btn } from './styles'

const statuses = ['idle', 'loading', 'success', 'error'] as const
type Status = (typeof statuses)[number]

const statusColor: Record<Status, number> = {
  idle: 0x9ca3afff,
  loading: 0xf59e0bff,
  success: 0x34d399ff,
  error: 0xef4444ff,
}

const statusMessage: Record<Status, string> = {
  idle: 'Waiting for action...',
  loading: 'Loading data...',
  success: 'Data loaded successfully!',
  error: 'Something went wrong.',
}

export default function SwitchMatchSection() {
  const [statusIdx, setStatusIdx] = createSignal(0)
  const status = () => statuses[statusIdx()]
  const cycleStatus = () => setStatusIdx(i => (i + 1) % statuses.length)

  return (
    <Column gap={6} style={{ width: 700, height: 170 }}>
      <view height={30} width={700} skipFocus>
        <text style={sectionTitle}>{'4. Switch / Match — first match wins'}</text>
      </view>
      <view height={22} width={700} skipFocus>
        <text style={hint}>
          {'When: "of all these options, which one wins?" Only the FIRST truthy Match renders — order matters.'}
        </text>
      </view>
      <view {...btn} onEnter={() => { cycleStatus() }}>
        <text x={20} y={12} style={{ fontSize: 22, color: 0xc084fcff }}>
          {`Status: ${status()} → press Enter to cycle`}
        </text>
      </view>
      <view width={600} height={40} skipFocus>
        <Switch fallback={<text style={{ fontSize: 20, color: 0x6b7280ff }}>{'Unknown status'}</text>}>
          <Match when={status() === 'idle'}>
            <text style={{ fontSize: 20, color: statusColor.idle }}>{statusMessage.idle}</text>
          </Match>
          <Match when={status() === 'loading'}>
            <text style={{ fontSize: 20, color: statusColor.loading }}>{statusMessage.loading}</text>
          </Match>
          <Match when={status() === 'success'}>
            <text style={{ fontSize: 20, color: statusColor.success }}>{statusMessage.success}</text>
          </Match>
          <Match when={status() === 'error'}>
            <text style={{ fontSize: 20, color: statusColor.error }}>{statusMessage.error}</text>
          </Match>
        </Switch>
      </view>
    </Column>
  )
}
