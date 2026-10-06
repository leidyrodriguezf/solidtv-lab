// All sizes (width, height, x, y, fontSize, etc.) are in pixels relative to the
// 1920x1080 canvas defined in createRenderer. Lightning scales to the actual screen.
import { createSignal } from 'solid-js'
import { Column } from '@solidtv/solid/primitives'

const palettes = [
  { name: 'Purple', bg: 0x2d2b55ff, border: 0xc084fcff, text: 0xc084fcff },
  { name: 'Blue', bg: 0x1e3a5fff, border: 0x60a5faff, text: 0x60a5faff },
  { name: 'Green', bg: 0x14352aff, border: 0x34d399ff, text: 0x34d399ff },
  { name: 'Orange', bg: 0x3b2510ff, border: 0xf59e0bff, text: 0xf59e0bff },
]

export default function StylesExample() {
  const [paletteIdx, setPaletteIdx] = createSignal(0)
  const palette = () => palettes[paletteIdx()]

  const cyclePalette = () => {
    setPaletteIdx(i => (i + 1) % palettes.length)
  }

  const boxStyle = {
    width: 600,
    height: 60,
    color: 0x1a1a2eff,
    borderRadius: 12,
    $focus: { color: 0x2d2b55ff },
  }

  return (
    <Column gap={12} scroll="none" style={{ width: 800, height: 850 }}>
      <view width={700} height={28} skipFocus>
        <text style={{ fontSize: 26, color: 0xf0e6d3ff }}>
          {'Colors (RGBA hex)'}
        </text>
      </view>

      <view width={600} height={70} skipFocus>
        <view width={90} height={50} color={0xc084fcff} borderRadius={8} />
        <view x={100} width={90} height={50} color={0x60a5faff} borderRadius={8} />
        <view x={200} width={90} height={50} color={0x34d399ff} borderRadius={8} />
        <view x={300} width={90} height={50} color={0xf59e0bff} borderRadius={8} />
        <view x={400} width={90} height={50} color={0xef4444ff} borderRadius={8} />
        <text y={55} style={{ fontSize: 14, color: 0x6b7280ff }}>
          {'Colors are 0xRRGGBBAA — last two hex digits are alpha (ff = opaque, 80 = 50%)'}
        </text>
      </view>

      <view width={700} height={28} skipFocus>
        <text style={{ fontSize: 26, color: 0xf0e6d3ff }}>
          {'Border radius'}
        </text>
      </view>

      <view width={600} height={75} skipFocus>
        <view width={55} height={55} color={0xc084fcff} borderRadius={0}></view>
        <text x={6} y={58} style={{ fontSize: 12, color: 0x6b7280ff }}>{'r=0'}</text>

        <view x={80} width={55} height={55} color={0x60a5faff} borderRadius={8}></view>
        <text x={86} y={58} style={{ fontSize: 12, color: 0x6b7280ff }}>{'r=8'}</text>

        <view x={160} width={55} height={55} color={0x34d399ff} borderRadius={16}></view>
        <text x={166} y={58} style={{ fontSize: 12, color: 0x6b7280ff }}>{'r=16'}</text>

        <view x={240} width={55} height={55} color={0xf59e0bff} borderRadius={28}></view>
        <text x={246} y={58} style={{ fontSize: 12, color: 0x6b7280ff }}>{'r=28'}</text>
      </view>

      <view width={700} height={28} skipFocus>
        <text style={{ fontSize: 26, color: 0xf0e6d3ff }}>
          {'Alpha transparency'}
        </text>
      </view>

      <view width={600} height={55} skipFocus>
        <view width={90} height={50} color={0xc084fcff} borderRadius={8} />
        <text x={10} y={34} style={{ fontSize: 12, color: 0x6b7280ff }}>{'ff (100%)'}</text>

        <view x={100} width={90} height={50} color={0xc084fccc} borderRadius={8} />
        <text x={110} y={34} style={{ fontSize: 12, color: 0x6b7280ff }}>{'cc (80%)'}</text>

        <view x={200} width={90} height={50} color={0xc084fc99} borderRadius={8} />
        <text x={210} y={34} style={{ fontSize: 12, color: 0x6b7280ff }}>{'99 (60%)'}</text>

        <view x={300} width={90} height={50} color={0xc084fc66} borderRadius={8} />
        <text x={310} y={34} style={{ fontSize: 12, color: 0x6b7280ff }}>{'66 (40%)'}</text>

        <view x={400} width={90} height={50} color={0xc084fc33} borderRadius={8} />
        <text x={410} y={34} style={{ fontSize: 12, color: 0x6b7280ff }}>{'33 (20%)'}</text>
      </view>

      <view width={700} height={28} skipFocus>
        <text style={{ fontSize: 26, color: 0xf0e6d3ff }}>
          {'$focus state styles'}
        </text>
      </view>

      <view style={boxStyle} onEnter={cyclePalette}>
        <text x={20} y={14} style={{ fontSize: 24, color: 0xc084fcff }}>
          {'Focus me and press Enter to cycle palette'}
        </text>
      </view>

      <view width={600} height={70} color={palette().bg} borderRadius={12} skipFocus>
        <view x={15} y={10} width={570} height={50} color={0x00000000}
          borderRadius={8} border={{ width: 2, color: palette().border }}>
          <text x={15} y={12} fontSize={22} color={palette().text}>
            {`Active: ${palette().name} palette`}
          </text>
        </view>
      </view>

      <view width={700} height={26} skipFocus>
        <text style={{ fontSize: 22, color: 0xf0e6d3ff }}>
          {'How it works:'}
        </text>
      </view>

      <view width={700} height={140} skipFocus>
        <text style={{ fontSize: 17, color: 0x9ca3afff, width: 680, contain: 'width' }}>
          {'Styles in SolidTV are props, not CSS. Colors use 0xRRGGBBAA format (hex RGBA). borderRadius rounds corners. The $focus key in a style object defines styles applied automatically when an element receives focus — no manual signal tracking needed. Use border: { width, color } for outlines. Props set directly (like color={value}) are reactive; style objects are evaluated once.'}
        </text>
      </view>
    </Column>
  )
}
