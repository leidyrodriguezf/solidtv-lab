import { createSignal } from 'solid-js'
import { Column, Row, Image } from '@solidtv/solid/primitives'

const IMG = '/images_demo.png'

const imgWrapper = {
  color: 0x00000000,
  borderRadius: 14,
  $focus: { color: 0xf59e0bff, borderRadius: 14 },
}

export default function ImagesExample() {
  const [showFallback, setShowFallback] = createSignal(false)

  return (
    <Column gap={16} scroll="auto" style={{ width: 1400, height: 850 }}>

      {/* Section: src on a view — basic image */}
      <Column gap={6} style={{ width: 1300, height: 240 }}>
        <view height={26} width={700} skipFocus>
          <text style={{ fontSize: 24, color: 0xf0e6d3ff }}>
            {'src on view — load an image directly'}
          </text>
        </view>
        <Row gap={16} scroll="none" style={{ width: 1200, height: 200 }}>
          <view width={268} height={188} {...imgWrapper}>
            <view x={4} y={4} width={260} height={180} borderRadius={12}
              src={IMG} color={0xffffffff} />
          </view>
          <view width={188} height={188} color={0x00000000} borderRadius={94}
            $focus={{ color: 0xf59e0bff, borderRadius: 94 }}>
            <view x={4} y={4} width={180} height={180} borderRadius={90}
              src={IMG} color={0xffffffff} />
          </view>
          <view width={268} height={148} {...imgWrapper}>
            <view x={4} y={4} width={260} height={140} borderRadius={12}
              src={IMG} color={0xffffffff} alpha={0.5} />
          </view>
        </Row>
      </Column>

      {/* Section: Image component — placeholder + fallback */}
      <Column gap={6} style={{ width: 1300, height: 240 }}>
        <view height={26} width={700} skipFocus>
          <text style={{ fontSize: 24, color: 0xf0e6d3ff }}>
            {'Image component — placeholder and fallback'}
          </text>
        </view>
        <Row gap={16} scroll="none" style={{ width: 1200, height: 200 }}>
          <view width={268} height={188} {...imgWrapper}>
            <Image src={IMG}
              x={4} y={4} width={260} height={180} borderRadius={12}
              color={0xffffffff} />
          </view>
          <view width={268} height={188} {...imgWrapper}>
            <Image
              src={showFallback() ? '/does_not_exist.png' : IMG}
              fallback={IMG}
              x={4} y={4} width={260} height={180} borderRadius={12}
              color={0xffffffff} />
          </view>
        </Row>
      </Column>

      {/* Section: Toggle fallback */}
      <Column gap={6} style={{ width: 1300, height: 100 }}>
        <view height={26} width={700} skipFocus>
          <text style={{ fontSize: 24, color: 0xf0e6d3ff }}>
            {'Test fallback behavior'}
          </text>
        </view>
        <Row gap={12} scroll="none" style={{ width: 600, height: 60 }}>
          <view width={280} height={50} color={0x1a1a2eff} borderRadius={10}
            $focus={{ color: 0x7c3aedff, borderRadius: 10 }}
            onEnter={() => { setShowFallback(f => !f) }}>
            <text x={15} y={12} style={{ fontSize: 18, color: 0xc084fcff }}>
              {`Fallback: ${showFallback() ? 'ON (bad src)' : 'OFF (good src)'}`}
            </text>
          </view>
        </Row>
      </Column>

      {/* Section: Sizing */}
      <Column gap={6} style={{ width: 1300, height: 180 }}>
        <view height={26} width={700} skipFocus>
          <text style={{ fontSize: 24, color: 0xf0e6d3ff }}>
            {'Sizing — same image, different dimensions'}
          </text>
        </view>
        <Row gap={16} scroll="none" style={{ width: 1200, height: 140 }}>
          <view width={128} height={128} color={0x00000000} borderRadius={10}
            $focus={{ color: 0xf59e0bff, borderRadius: 10 }}>
            <view x={4} y={4} width={120} height={120} borderRadius={8}
              src={IMG} color={0xffffffff} />
          </view>
          <view width={208} height={128} color={0x00000000} borderRadius={10}
            $focus={{ color: 0xf59e0bff, borderRadius: 10 }}>
            <view x={4} y={4} width={200} height={120} borderRadius={8}
              src={IMG} color={0xffffffff} />
          </view>
          <view width={308} height={128} color={0x00000000} borderRadius={10}
            $focus={{ color: 0xf59e0bff, borderRadius: 10 }}>
            <view x={4} y={4} width={300} height={120} borderRadius={8}
              src={IMG} color={0xffffffff} />
          </view>
        </Row>
      </Column>

      {/* How it works */}
      <view width={700} height={280} color={0x1a1a2eff} borderRadius={10}
        $focus={{ color: 0x2d2b55ff, borderRadius: 10 }}>
        <text x={15} y={10} style={{ fontSize: 22, color: 0xf0e6d3ff }}>
          {'How it works:'}
        </text>
        <text x={15} y={40} style={{ fontSize: 17, color: 0x9ca3afff, width: 660, contain: 'width' }}>
          {'Set src on any view to load an image as its texture. Important: set color to 0xffffffff (white) — color acts as a tint multiplier, so a dark color darkens the image. For focus on images, wrap them in a container view (no src) with color: transparent and $focus color (e.g. orange). The image sits inside with a 4px offset so the wrapper color shows as a border. Never use $focus directly on views with src or with border — the state system does not revert those correctly on blur. The Image component adds placeholder (while loading) and fallback (on error). Lightning caches textures — same src reuses the same GPU texture.'}
        </text>
      </view>
    </Column>
  )
}
