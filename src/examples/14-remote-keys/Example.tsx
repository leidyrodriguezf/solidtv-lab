import { createSignal } from 'solid-js'
import { Column, Row } from '@solidtv/solid/primitives'
import { useHold } from '@solidtv/solid/primitives'
import { type ElementNode } from '@solidtv/solid'

const cardStyle = {
  width: 200,
  height: 70,
  color: 0x1a1a2eff,
  borderRadius: 10,
  $focus: { color: 0x7c3aedff, borderRadius: 10 },
}

export default function RemoteKeysExample() {
  const [lastAction, setLastAction] = createSignal('(none)')
  const [counter, setCounter] = createSignal(0)
  const [lastRaw, setLastRaw] = createSignal('(none)')
  const [holdStatus, setHoldStatus] = createSignal('Tap or hold Enter')

  const [startHold, releaseHold] = useHold({
    onEnter: () => { setHoldStatus('Tapped!') },
    onHold: () => { setHoldStatus('Holding...') },
    onRelease: () => { setHoldStatus('Released hold') },
    holdThreshold: 500,
  })

  return (
    <Column gap={16} scroll="auto" style={{ width: 1400, height: 850 }}>

      {/* Section: onEnter / onLeft / onRight */}
      <Column gap={6} style={{ width: 1300, height: 135 }}>
        <view height={26} width={700} skipFocus>
          <text style={{ fontSize: 24, color: 0xf0e6d3ff }}>
            {'onEnter / onLeft / onRight — directional handlers'}
          </text>
        </view>
        <view height={22} width={700} skipFocus>
          <text style={{ fontSize: 18, color: 0x9ca3afff }}>
            {`Last action: ${lastAction()}`}
          </text>
        </view>
        <Row gap={12} scroll="none" style={{ width: 1200, height: 80 }}>
          <view style={cardStyle}
            onEnter={() => { setLastAction('Enter pressed!') }}
            onLeft={() => { setLastAction('Left arrow') }}
            onRight={() => { setLastAction('Right arrow') }}>
            <text x={15} y={22} style={{ fontSize: 20, color: 0xc084fcff }}>{'Try arrows + Enter'}</text>
          </view>
          <view style={cardStyle}
            onEnter={() => { setCounter(c => c + 1) }}>
            <text x={15} y={22} style={{ fontSize: 20, color: 0x60a5faff }}>{`Count: ${counter()}`}</text>
          </view>
          <view style={cardStyle}
            onEnter={() => { setCounter(0) }}>
            <text x={15} y={22} style={{ fontSize: 20, color: 0xef4444ff }}>{'Reset counter'}</text>
          </view>
        </Row>
      </Column>

      {/* Section: Returning true to stop propagation */}
      <Column gap={6} style={{ width: 1300, height: 110 }}>
        <view height={26} width={700} skipFocus>
          <text style={{ fontSize: 24, color: 0xf0e6d3ff }}>
            {'Return true — stop event propagation'}
          </text>
        </view>
        <Row gap={12} scroll="none" style={{ width: 1200, height: 80 }}>
          <view style={cardStyle}
            onLeft={() => { setLastAction('Left trapped here'); return true }}
            onRight={() => { setLastAction('Right trapped here'); return true }}>
            <text x={15} y={22} style={{ fontSize: 20, color: 0xfbbf24ff }}>{'Trapped L/R'}</text>
          </view>
          <view style={cardStyle}>
            <text x={15} y={22} style={{ fontSize: 20, color: 0x34d399ff }}>{'Normal card'}</text>
          </view>
        </Row>
      </Column>

      {/* Section: onKeyPress — raw key events */}
      <Column gap={6} style={{ width: 1300, height: 135 }}>
        <view height={26} width={700} skipFocus>
          <text style={{ fontSize: 24, color: 0xf0e6d3ff }}>
            {'onKeyPress — raw key events'}
          </text>
        </view>
        <view height={22} width={700} skipFocus>
          <text style={{ fontSize: 18, color: 0x9ca3afff }}>
            {`Last key: ${lastRaw()}`}
          </text>
        </view>
        <Row gap={12} scroll="none" style={{ width: 1200, height: 80 }}>
          <view style={{ ...cardStyle, width: 300 }}
            onKeyPress={function(this: ElementNode, e: KeyboardEvent, mapped: string | undefined) {
              setLastRaw(`key="${e.key}" code=${e.keyCode} mapped="${mapped || '—'}"`)
            }}>
            <text x={15} y={22} style={{ fontSize: 20, color: 0x38bdf8ff }}>{'Press any key here'}</text>
          </view>
        </Row>
      </Column>

      {/* Section: useHold — tap vs long press */}
      <Column gap={6} style={{ width: 1300, height: 135 }}>
        <view height={26} width={700} skipFocus>
          <text style={{ fontSize: 24, color: 0xf0e6d3ff }}>
            {'useHold — tap vs long press'}
          </text>
        </view>
        <view height={22} width={700} skipFocus>
          <text style={{ fontSize: 18, color: 0x9ca3afff }}>
            {`Status: ${holdStatus()}`}
          </text>
        </view>
        <Row gap={12} scroll="none" style={{ width: 1200, height: 80 }}>
          <view style={{ ...cardStyle, width: 300 }}
            onEnter={startHold} onEnterRelease={releaseHold}>
            <text x={15} y={22} style={{ fontSize: 20, color: 0xf472b6ff }}>{'Hold Enter for 500ms'}</text>
          </view>
        </Row>
      </Column>

      {/* How it works */}
      <view width={700} height={260} color={0x1a1a2eff} borderRadius={10}
        $focus={{ color: 0x2d2b55ff, borderRadius: 10 }}>
        <text x={15} y={10} style={{ fontSize: 22, color: 0xf0e6d3ff }}>
          {'How it works:'}
        </text>
        <text x={15} y={40} style={{ fontSize: 17, color: 0x9ca3afff, width: 660, contain: 'width' }}>
          {'The focus system maps keyboard events to named handlers: onEnter, onLeft, onRight, onUp, onDown. Each handler receives (event, target, handlerElm). Return true to stop propagation — the event won\'t bubble to parent elements. onKeyPress fires for any key and receives the raw KeyboardEvent plus the mapped name. useHold() distinguishes taps from long-presses: it returns [startHold, releaseHold] to wire onto onEnter/onEnterRelease. Works reliably on TV platforms where key-up may not fire (webOS). useFocusManager() accepts a custom keyMap to add or remap keys — e.g. mapping the color buttons on a TV remote.'}
        </text>
      </view>
    </Column>
  )
}
