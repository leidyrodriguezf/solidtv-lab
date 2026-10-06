import { createSignal, createEffect } from 'solid-js'
import { Column, Row, activeElement, focusPath } from '@solidtv/solid/primitives'
import { type ElementNode } from '@solidtv/solid'

const cardStyle = {
  width: 180,
  height: 70,
  color: 0x1a1a2eff,
  borderRadius: 10,
  $focus: { color: 0x7c3aedff, borderRadius: 10 },
}

const dimCard = {
  width: 180,
  height: 70,
  color: 0x111827ff,
  borderRadius: 10,
  $focus: { color: 0x2d2b55ff, borderRadius: 10 },
}

export default function FocusExample() {
  const [focusLog, setFocusLog] = createSignal('(none)')
  const [activeName, setActiveName] = createSignal('—')
  const [pathLen, setPathLen] = createSignal(0)
  let targetRef: ElementNode | undefined

  createEffect(() => {
    const el = activeElement()
    if (el) {
      const id = (el as any)._id || '(anonymous)'
      setActiveName(id)
    }
    setPathLen(focusPath().length)
  })

  const onItemFocus = function (this: ElementNode) {
    setFocusLog(`Focused: ${this._id || '?'}`)
  }

  const onItemBlur = function (this: ElementNode) {
    setFocusLog(`Blurred: ${this._id || '?'}`)
  }

  return (
    <Column gap={16} scroll="auto" style={{ width: 1400, height: 850 }}>

      {/* Section: $focus styles */}
      <Column gap={6} style={{ width: 1300, height: 110 }}>
        <view height={26} width={700} skipFocus>
          <text style={{ fontSize: 24, color: 0xf0e6d3ff }}>
            {'$focus — visual feedback on focus'}
          </text>
        </view>
        <Row gap={12} scroll="none" style={{ width: 1200, height: 80 }}>
          <view style={cardStyle} id="card-A">
            <text x={15} y={22} style={{ fontSize: 20, color: 0xc084fcff }}>{'Card A'}</text>
          </view>
          <view style={cardStyle} id="card-B">
            <text x={15} y={22} style={{ fontSize: 20, color: 0x60a5faff }}>{'Card B'}</text>
          </view>
          <view style={cardStyle} id="card-C">
            <text x={15} y={22} style={{ fontSize: 20, color: 0x34d399ff }}>{'Card C'}</text>
          </view>
        </Row>
      </Column>

      {/* Section: forwardFocus */}
      <Column gap={6} style={{ width: 1300, height: 130 }}>
        <view height={26} width={700} skipFocus>
          <text style={{ fontSize: 24, color: 0xf0e6d3ff }}>
            {'forwardFocus — delegate to a child'}
          </text>
        </view>
        <view height={22} width={700} skipFocus>
          <text style={{ fontSize: 16, color: 0x9ca3afff }}>
            {'The dark container forwards focus into its Row automatically'}
          </text>
        </view>
        <Row gap={12} scroll="none" style={{ width: 1200, height: 80 }}>
          <view width={400} height={70} color={0x0f172aff} borderRadius={10}
            forwardFocus={function(this: any) {
              for (const child of this.children) {
                if (child?.children && child?.setFocus) { child.setFocus(); return true; }
              }
              return false;
            }}>
            <Row gap={12} scroll="none" style={{ width: 400, height: 70 }}>
              <view style={dimCard} id="inner-1">
                <text x={12} y={22} style={{ fontSize: 18, color: 0xa78bfaff }}>{'Inner 1'}</text>
              </view>
              <view style={dimCard} id="inner-2">
                <text x={12} y={22} style={{ fontSize: 18, color: 0xa78bfaff }}>{'Inner 2'}</text>
              </view>
            </Row>
          </view>
          <view style={cardStyle} id="outside">
            <text x={15} y={22} style={{ fontSize: 20, color: 0xf59e0bff }}>{'Outside'}</text>
          </view>
        </Row>
      </Column>

      {/* Section: skipFocus */}
      <Column gap={6} style={{ width: 1300, height: 110 }}>
        <view height={26} width={700} skipFocus>
          <text style={{ fontSize: 24, color: 0xf0e6d3ff }}>
            {'skipFocus — decorative elements skipped'}
          </text>
        </view>
        <Row gap={12} scroll="none" style={{ width: 1200, height: 80 }}>
          <view style={cardStyle} id="focusable-1">
            <text x={15} y={22} style={{ fontSize: 20, color: 0xc084fcff }}>{'Focusable'}</text>
          </view>
          <view width={180} height={70} color={0x374151ff} borderRadius={10} skipFocus>
            <text x={15} y={22} style={{ fontSize: 20, color: 0x6b7280ff }}>{'Skipped'}</text>
          </view>
          <view style={cardStyle} id="focusable-2">
            <text x={15} y={22} style={{ fontSize: 20, color: 0x34d399ff }}>{'Focusable'}</text>
          </view>
          <view width={180} height={70} color={0x374151ff} borderRadius={10} skipFocus>
            <text x={15} y={22} style={{ fontSize: 20, color: 0x6b7280ff }}>{'Skipped'}</text>
          </view>
          <view style={cardStyle} id="focusable-3">
            <text x={15} y={22} style={{ fontSize: 20, color: 0x60a5faff }}>{'Focusable'}</text>
          </view>
        </Row>
      </Column>

      {/* Section: onFocus / onBlur callbacks */}
      <Column gap={6} style={{ width: 1300, height: 135 }}>
        <view height={26} width={700} skipFocus>
          <text style={{ fontSize: 24, color: 0xf0e6d3ff }}>
            {'onFocus / onBlur — react to focus changes'}
          </text>
        </view>
        <view height={22} width={700} skipFocus>
          <text style={{ fontSize: 18, color: 0x9ca3afff }}>
            {`Last event: ${focusLog()}`}
          </text>
        </view>
        <Row gap={12} scroll="none" style={{ width: 1200, height: 80 }}>
          <view style={cardStyle} id="tracked-X"
            onFocus={onItemFocus} onBlur={onItemBlur}>
            <text x={15} y={22} style={{ fontSize: 20, color: 0xfbbf24ff }}>{'X (tracked)'}</text>
          </view>
          <view style={cardStyle} id="tracked-Y"
            onFocus={onItemFocus} onBlur={onItemBlur}>
            <text x={15} y={22} style={{ fontSize: 20, color: 0xf472b6ff }}>{'Y (tracked)'}</text>
          </view>
          <view style={cardStyle} id="tracked-Z"
            onFocus={onItemFocus} onBlur={onItemBlur}>
            <text x={15} y={22} style={{ fontSize: 20, color: 0x38bdf8ff }}>{'Z (tracked)'}</text>
          </view>
        </Row>
      </Column>

      {/* Section: Programmatic focus with setFocus() */}
      <Column gap={6} style={{ width: 1300, height: 110 }}>
        <view height={26} width={700} skipFocus>
          <text style={{ fontSize: 24, color: 0xf0e6d3ff }}>
            {'setFocus() — move focus programmatically'}
          </text>
        </view>
        <Row gap={12} scroll="none" style={{ width: 1200, height: 80 }}>
          <view width={260} height={70} color={0x1a1a2eff} borderRadius={10}
            $focus={{ color: 0x2d2b55ff, borderRadius: 10 }}
            onEnter={() => { targetRef?.setFocus() }}>
            <text x={12} y={22} style={{ fontSize: 18, color: 0xc084fcff }}>
              {'Press Enter → jump'}
            </text>
          </view>
          <view style={dimCard} id="middle">
            <text x={15} y={22} style={{ fontSize: 20, color: 0x6b7280ff }}>{'Middle'}</text>
          </view>
          <view style={{ ...cardStyle, $focus: { color: 0x059669ff, borderRadius: 10 } }}
            ref={targetRef!} id="target">
            <text x={15} y={22} style={{ fontSize: 20, color: 0x34d399ff }}>{'Target!'}</text>
          </view>
        </Row>
      </Column>

      {/* activeElement + focusPath info */}
      <view width={1300} height={55} color={0x1a1a2eff} borderRadius={10}
        $focus={{ color: 0x2d2b55ff, borderRadius: 10 }}>
        <text x={15} y={6} style={{ fontSize: 24, color: 0xf0e6d3ff }}>
          {'activeElement / focusPath — reactive state'}
        </text>
        <text x={15} y={32} style={{ fontSize: 18, color: 0x9ca3afff }}>
          {`Active: ${activeName()} | Focus path depth: ${pathLen()}`}
        </text>
      </view>

      {/* How it works */}
      <view width={700} height={240} color={0x1a1a2eff} borderRadius={10}
        $focus={{ color: 0x2d2b55ff, borderRadius: 10 }}>
        <text x={15} y={10} style={{ fontSize: 22, color: 0xf0e6d3ff }}>
          {'How it works:'}
        </text>
        <text x={15} y={40} style={{ fontSize: 17, color: 0x9ca3afff, width: 660, contain: 'width' }}>
          {'useFocusManager() initializes the spatial focus system (called once in index.tsx). $focus in a style object defines how elements look when focused — only use properties that have a base value (scale needs scale:1 in base, otherwise elements collapse on blur). forwardFocus delegates focus to a child — use a function when the first child might not be an ElementNode. skipFocus makes decorative elements invisible to focus navigation. onFocus/onBlur fire when an element gains or loses focus. Call ref.setFocus() to move focus programmatically. activeElement() returns the focused ElementNode reactively. focusPath() returns the ancestor chain from root to active element.'}
        </text>
      </view>
    </Column>
  )
}
