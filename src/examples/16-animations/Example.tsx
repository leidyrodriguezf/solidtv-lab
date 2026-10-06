import { createSignal, onMount } from 'solid-js'
import { Column, Row } from '@solidtv/solid/primitives'

const btnStyle = {
  width: 260,
  height: 70,
  color: 0x1a1a2eff,
  borderRadius: 10,
  $focus: { color: 0x7c3aedff, borderRadius: 10 },
}

export default function AnimationsExample() {
  const [slideX, setSlideX] = createSignal(0)
  const [boxX, setBoxX] = createSignal(0)
  const [boxAlpha, setBoxAlpha] = createSignal(1)
  const [boxWidth, setBoxWidth] = createSignal(120)
  const [boxColor, setBoxColor] = createSignal(0x10b981ff)
  const [fadeAlpha, setFadeAlpha] = createSignal(1)
  const [loopX, setLoopX] = createSignal(0)

  onMount(() => setLoopX(300))

  return (
    <Column gap={16} scroll="auto" style={{ width: 1400, height: 850 }}>

      {/* Section: transition — single property */}
      <Column gap={6} style={{ width: 1300, height: 140 }}>
        <view height={26} width={700} skipFocus>
          <text style={{ fontSize: 24, color: 0xf0e6d3ff }}>
            {'transition — animate one property'}
          </text>
        </view>
        <Row gap={12} scroll="none" style={{ width: 600, height: 50 }}>
          <view style={{ ...btnStyle, width: 200, height: 50 }}
            onEnter={() => { setSlideX(x => x === 0 ? 400 : 0) }}>
            <text x={15} y={12} style={{ fontSize: 18, color: 0xc084fcff }}>{'Toggle slide'}</text>
          </view>
        </Row>
        <view height={55} width={800} skipFocus>
          <view
            width={120} height={50} color={0x7c3aedff} borderRadius={8}
            x={slideX()}
            transition={{ x: { duration: 500, easing: 'ease-in-out' } }}
          >
            <text x={15} y={12} style={{ fontSize: 18, color: 0xffffffff }}>{'Slides!'}</text>
          </view>
        </view>
      </Column>

      {/* Section: multiple transitions */}
      <Column gap={6} style={{ width: 1300, height: 140 }}>
        <view height={26} width={700} skipFocus>
          <text style={{ fontSize: 24, color: 0xf0e6d3ff }}>
            {'transition — multiple properties at once'}
          </text>
        </view>
        <Row gap={12} scroll="none" style={{ width: 600, height: 50 }}>
          <view style={{ ...btnStyle, width: 200, height: 50 }}
            onEnter={() => {
              const moved = boxX() > 0
              setBoxX(moved ? 0 : 300)
              setBoxAlpha(moved ? 1 : 0.4)
              setBoxWidth(moved ? 120 : 250)
            }}>
            <text x={15} y={12} style={{ fontSize: 18, color: 0x60a5faff }}>{'Animate all'}</text>
          </view>
        </Row>
        <view height={55} width={800} skipFocus>
          <view
            width={boxWidth()} height={50} color={0x3b82f6ff} borderRadius={8}
            x={boxX()} alpha={boxAlpha()}
            transition={{
              x: { duration: 600, easing: 'ease-in-out' },
              alpha: { duration: 600, easing: 'ease-out' },
              width: { duration: 600, easing: 'ease-in-out' },
            }}
          >
            <text x={15} y={12} style={{ fontSize: 18, color: 0xffffffff }}>{'Multi!'}</text>
          </view>
        </view>
      </Column>

      {/* Section: color transition */}
      <Column gap={6} style={{ width: 1300, height: 140 }}>
        <view height={26} width={700} skipFocus>
          <text style={{ fontSize: 24, color: 0xf0e6d3ff }}>
            {'transition — color animation'}
          </text>
        </view>
        <Row gap={12} scroll="none" style={{ width: 800, height: 50 }}>
          <view style={{ ...btnStyle, width: 140, height: 50 }}
            onEnter={() => { setBoxColor(0xef4444ff) }}>
            <text x={15} y={12} style={{ fontSize: 18, color: 0xef4444ff }}>{'Red'}</text>
          </view>
          <view style={{ ...btnStyle, width: 140, height: 50 }}
            onEnter={() => { setBoxColor(0x3b82f6ff) }}>
            <text x={15} y={12} style={{ fontSize: 18, color: 0x3b82f6ff }}>{'Blue'}</text>
          </view>
          <view style={{ ...btnStyle, width: 140, height: 50 }}
            onEnter={() => { setBoxColor(0x10b981ff) }}>
            <text x={15} y={12} style={{ fontSize: 18, color: 0x10b981ff }}>{'Green'}</text>
          </view>
        </Row>
        <view height={55} width={800} skipFocus>
          <view
            width={200} height={50} borderRadius={8}
            color={boxColor()}
            transition={{ color: { duration: 800, easing: 'ease-in-out' } }}
          >
            <text x={15} y={12} style={{ fontSize: 18, color: 0xffffffff }}>{'Color shift!'}</text>
          </view>
        </view>
      </Column>

      {/* Section: fade + loop */}
      <Column gap={6} style={{ width: 1300, height: 140 }}>
        <view height={26} width={700} skipFocus>
          <text style={{ fontSize: 24, color: 0xf0e6d3ff }}>
            {'Fade toggle + looping animation'}
          </text>
        </view>
        <Row gap={12} scroll="none" style={{ width: 800, height: 50 }}>
          <view style={{ ...btnStyle, width: 200, height: 50 }}
            onEnter={() => { setFadeAlpha(a => a === 1 ? 0 : 1) }}>
            <text x={15} y={12} style={{ fontSize: 18, color: 0xf472b6ff }}>{'Toggle fade'}</text>
          </view>
          <view width={120} height={50} color={0xec4899ff} borderRadius={8} skipFocus
            alpha={fadeAlpha()}
            transition={{ alpha: { duration: 400, easing: 'ease-out' } }}>
            <text x={15} y={12} style={{ fontSize: 18, color: 0xffffffff }}>{'Fades!'}</text>
          </view>
        </Row>
        <view height={55} width={800} skipFocus>
          <view width={60} height={30} y={10} color={0xfbbf24ff} borderRadius={6}
            x={loopX()}
            transition={{ x: { duration: 2000, easing: 'ease-in-out', loop: true, stopMethod: 'reverse' as const } }}
          />
          <text x={80} y={14} style={{ fontSize: 16, color: 0x9ca3afff }}>
            {'← loop: true + stopMethod: "reverse"'}
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
          {'The transition prop animates property changes declaratively: transition={{ x: { duration: 500, easing: "ease-in-out" } }}. When x (or any prop) changes via a signal, it animates instead of jumping. You can animate multiple props at once — each with its own duration and easing. Animatable properties: x, y, width, height, alpha, color, scaleX, scaleY, rotation. AnimationSettings: duration (ms), easing ("ease-in", "ease-out", "ease-in-out", "linear"), delay (ms), loop (boolean), repeat (number), stopMethod ("reverse" or "reset"). For fade effects, animate alpha between 0 and 1. Set transition={true} to apply default animation to all property changes.'}
        </text>
      </view>
    </Column>
  )
}
