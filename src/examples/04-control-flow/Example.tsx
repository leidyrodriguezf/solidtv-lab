import { createSignal, Show, For, Switch, Match } from 'solid-js'
import { Column } from '@solidtv/solid/primitives'

const statuses = ['idle', 'loading', 'success', 'error'] as const

const colors: string[] = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6']

export default function ControlFlowExample() {
  const [showList, setShowList] = createSignal(true)
  const [statusIdx, setStatusIdx] = createSignal(0)

  const status = () => statuses[statusIdx()]

  const cycleStatus = () => {
    setStatusIdx(i => (i + 1) % statuses.length)
  }

  const boxStyle = {
    width: 600,
    height: 60,
    color: 0x1a1a2eff,
    borderRadius: 12,
    $focus: { color: 0x2d2b55ff },
  }

  return (
    <Column gap={16} scroll="none" style={{ width: 800, height: 850 }}>
      <view width={700} height={35} skipFocus>
        <text style={{ fontSize: 28, color: 0xf0e6d3ff }}>
          {'Show - conditional rendering'}
        </text>
      </view>

      <view style={boxStyle} onEnter={() => { setShowList(v => !v) }}>
        <text x={20} y={14} style={{ fontSize: 26, color: 0x60a5faff }}>
          {showList() ? 'Hide color list' : 'Show color list'}
        </text>
      </view>

      {/* fallback acts as the "else" branch when the condition is false */}
      <view width={700} height={80} skipFocus>
        <Show when={showList()} fallback={
          <text style={{ fontSize: 20, color: 0x6b7280ff }}>{'List is hidden'}</text>
        }>
          <text y={0} style={{ fontSize: 24, color: 0xf0e6d3ff }}>
            {'For - render a list'}
          </text>
          <For each={colors}>
            {(color, i) => (
              <view x={i() * 110} y={36} width={100} height={36} color={parseInt(color.slice(1) + 'ff', 16)}>
                <text x={10} y={8} style={{ fontSize: 18, color: 0xffffffff }}>
                  {color}
                </text>
              </view>
            )}
          </For>
        </Show>
      </view>

      <view width={700} height={35} skipFocus>
        <text style={{ fontSize: 28, color: 0xf0e6d3ff }}>
          {'Switch/Match - multi-branch'}
        </text>
      </view>

      <view style={boxStyle} onEnter={cycleStatus}>
        <text x={20} y={14} style={{ fontSize: 26, color: 0xc084fcff }}>
          {`Status: ${status()} → press Enter to cycle`}
        </text>
      </view>

      <view width={600} height={40} skipFocus>
        <Switch>
          <Match when={status() === 'idle'}>
            <text style={{ fontSize: 22, color: 0x9ca3afff }}>{'Waiting for action...'}</text>
          </Match>
          <Match when={status() === 'loading'}>
            <text style={{ fontSize: 22, color: 0xf59e0bff }}>{'Loading data...'}</text>
          </Match>
          <Match when={status() === 'success'}>
            <text style={{ fontSize: 22, color: 0x34d399ff }}>{'Data loaded successfully!'}</text>
          </Match>
          <Match when={status() === 'error'}>
            <text style={{ fontSize: 22, color: 0xef4444ff }}>{'Something went wrong.'}</text>
          </Match>
        </Switch>
      </view>
      <view width={700} height={30} skipFocus>
        <text style={{ fontSize: 22, color: 0xf0e6d3ff }}>
          {'How it works:'}
        </text>
      </view>
      <view width={700} height={120} skipFocus>
        <text style={{ fontSize: 18, color: 0x9ca3afff, width: 680, contain: 'width' }}>
          {'Show renders its children when the condition is true, or the fallback otherwise. For iterates an array efficiently - each item is tracked, not the whole list. Switch/Match picks the first matching branch, like a switch statement.'}
        </text>
      </view>
    </Column>
  )
}
