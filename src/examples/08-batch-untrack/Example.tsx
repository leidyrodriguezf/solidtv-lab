import { createSignal, createEffect, batch, untrack } from 'solid-js'
import { Column, Row } from '@solidtv/solid/primitives'

const cardStyle = {
  color: 0x1a1a2eff,
  borderRadius: 10,
  $focus: { color: 0x2d2b55ff },
}

export default function BatchUntrackExample() {
  const [firstName, setFirstName] = createSignal('Ada')
  const [lastName, setLastName] = createSignal('Lovelace')
  const [effectCount, setEffectCount] = createSignal(0)

  createEffect(() => {
    firstName()
    lastName()
    setEffectCount(c => c + 1)
  })

  const [batchFirst, setBatchFirst] = createSignal('Alan')
  const [batchLast, setBatchLast] = createSignal('Turing')
  const [batchEffectCount, setBatchEffectCount] = createSignal(0)

  createEffect(() => {
    batchFirst()
    batchLast()
    setBatchEffectCount(c => c + 1)
  })

  const [tracked, setTracked] = createSignal(0)
  const [untracked, setUntracked] = createSignal(0)
  const [trackLog, setTrackLog] = createSignal('Waiting...')

  createEffect(() => {
    const t = tracked()
    const u = untrack(() => untracked())
    setTrackLog(`Effect ran — tracked: ${t}, untracked: ${u}`)
  })

  return (
    <Column gap={16} scroll="auto" style={{ width: 1400, height: 850 }}>

      {/* Section: Without batch */}
      <Column gap={6} style={{ width: 1300, height: 180 }}>
        <view height={26} width={700} skipFocus>
          <text style={{ fontSize: 24, color: 0xf0e6d3ff }}>
            {'Without batch — effect runs per signal update'}
          </text>
        </view>
        <Row gap={12} scroll="none" style={{ width: 1200, height: 50 }}>
          <view width={400} height={44} style={cardStyle} forwardStates
            onEnter={() => { setFirstName('Grace'); setLastName('Hopper'); }}>
            <text x={15} y={10} style={{ fontSize: 18, color: 0xc084fcff }}>
              {'Set first + last (2 updates)'}
            </text>
          </view>
          <view width={280} height={44} style={cardStyle} forwardStates
            onEnter={() => { setFirstName('Ada'); setLastName('Lovelace'); }}>
            <text x={15} y={10} style={{ fontSize: 18, color: 0x60a5faff }}>
              {'Reset'}
            </text>
          </view>
        </Row>
        <view width={700} height={70} color={0x111827ff} borderRadius={8}>
          <text x={15} y={8} style={{ fontSize: 18, color: 0x9ca3afff }}>
            {`Name: ${firstName()} ${lastName()}`}
          </text>
          <text x={15} y={36} style={{ fontSize: 18, color: 0xfbbf24ff }}>
            {`Effect ran ${effectCount()} times (runs once per signal change)`}
          </text>
        </view>
      </Column>

      {/* Section: With batch */}
      <Column gap={6} style={{ width: 1300, height: 180 }}>
        <view height={26} width={700} skipFocus>
          <text style={{ fontSize: 24, color: 0xf0e6d3ff }}>
            {'With batch — groups updates, effect runs once'}
          </text>
        </view>
        <Row gap={12} scroll="none" style={{ width: 1200, height: 50 }}>
          <view width={400} height={44} style={cardStyle} forwardStates
            onEnter={() => { batch(() => { setBatchFirst('Grace'); setBatchLast('Hopper'); }); }}>
            <text x={15} y={10} style={{ fontSize: 18, color: 0xc084fcff }}>
              {'batch(() => set both) — 1 update'}
            </text>
          </view>
          <view width={280} height={44} style={cardStyle} forwardStates
            onEnter={() => { batch(() => { setBatchFirst('Alan'); setBatchLast('Turing'); }); }}>
            <text x={15} y={10} style={{ fontSize: 18, color: 0x60a5faff }}>
              {'Reset (batched)'}
            </text>
          </view>
        </Row>
        <view width={700} height={70} color={0x111827ff} borderRadius={8}>
          <text x={15} y={8} style={{ fontSize: 18, color: 0x9ca3afff }}>
            {`Name: ${batchFirst()} ${batchLast()}`}
          </text>
          <text x={15} y={36} style={{ fontSize: 18, color: 0x34d399ff }}>
            {`Effect ran ${batchEffectCount()} times (batch = one notification)`}
          </text>
        </view>
      </Column>

      {/* Section: untrack */}
      <Column gap={6} style={{ width: 1300, height: 200 }}>
        <view height={26} width={700} skipFocus>
          <text style={{ fontSize: 24, color: 0xf0e6d3ff }}>
            {'untrack — read a signal without subscribing'}
          </text>
        </view>
        <Row gap={12} scroll="none" style={{ width: 1200, height: 50 }}>
          <view width={320} height={44} style={cardStyle} forwardStates
            onEnter={() => setTracked(v => v + 1)}>
            <text x={15} y={10} style={{ fontSize: 18, color: 0xc084fcff }}>
              {`Increment tracked (${tracked()})`}
            </text>
          </view>
          <view width={320} height={44} style={cardStyle} forwardStates
            onEnter={() => setUntracked(v => v + 1)}>
            <text x={15} y={10} style={{ fontSize: 18, color: 0xf472b6ff }}>
              {`Increment untracked (${untracked()})`}
            </text>
          </view>
        </Row>
        <view width={700} height={70} color={0x111827ff} borderRadius={8}>
          <text x={15} y={8} style={{ fontSize: 18, color: 0x9ca3afff }}>
            {trackLog()}
          </text>
          <text x={15} y={36} style={{ fontSize: 16, color: 0x6b7280ff }}>
            {'Effect only re-runs when tracked signal changes, not untracked'}
          </text>
        </view>
      </Column>

      {/* How it works */}
      <view width={700} height={260} color={0x1a1a2eff} borderRadius={10}
        $focus={{ color: 0x2d2b55ff, borderRadius: 10 }}>
        <text x={15} y={10} style={{ fontSize: 22, color: 0xf0e6d3ff }}>
          {'How it works:'}
        </text>
        <text x={15} y={40} style={{ fontSize: 17, color: 0x9ca3afff, width: 660, contain: 'width' }}>
          {'batch(() => { ... }) groups multiple signal updates so dependent effects and memos run only once after all changes, not once per change. Without batch, setting 2 signals triggers the effect twice. untrack(() => signal()) reads a signal value without subscribing — the effect will NOT re-run when that signal changes. Use batch for performance when updating many signals together. Use untrack to read "reference" values inside effects without creating dependencies.'}
        </text>
      </view>
    </Column>
  )
}
