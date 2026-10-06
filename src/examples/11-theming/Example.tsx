import { createSignal } from 'solid-js'
import { Column } from '@solidtv/solid/primitives'

// Approach 1: Spread styles — merge theme object into component props
const darkCard = { color: 0x1a1a2eff }
const lightCard = { color: 0xe2e8f0ff }

// Approach 2: $state styles — applied automatically based on a states object
const stateStyles = {
  width: 600,
  height: 60,
  borderRadius: 12,
  color: 0x1a1a2eff,
  $dark: { color: 0x1a1a2eff },
  $light: { color: 0xe2e8f0ff },
}

export default function ThemingExample() {
  const [mode, setMode] = createSignal<'dark' | 'light'>('dark')

  const toggleMode = () => {
    setMode(m => (m === 'dark' ? 'light' : 'dark'))
  }

  const isDark = () => mode() === 'dark'
  const textColor = () => isDark() ? 0xf9fafbff : 0x1a1a2eff

  return (
    <Column gap={12} scroll="none" style={{ width: 800, height: 850 }}>
      <view width={700} height={28} skipFocus>
        <text style={{ fontSize: 26, color: 0xf0e6d3ff }}>
          {'Approach 1: Spread styles'}
        </text>
      </view>

      <view width={600} height={60} borderRadius={12}
        {...(isDark() ? darkCard : lightCard)} skipFocus>
        <text x={20} y={14} fontSize={24} color={textColor()}>
          {`Spread: mode = ${mode()}`}
        </text>
      </view>

      <view width={600} height={40} skipFocus>
        <text style={{ fontSize: 16, color: 0x6b7280ff, width: 580, contain: 'width' }}>
          {'Uses {...(isDark() ? darkCard : lightCard)} to merge the right theme object'}
        </text>
      </view>

      <view width={700} height={28} skipFocus>
        <text style={{ fontSize: 26, color: 0xf0e6d3ff }}>
          {'Approach 2: $state styles'}
        </text>
      </view>

      <view style={stateStyles}
        states={{ $dark: isDark(), $light: !isDark() }} skipFocus>
        <text x={20} y={14} fontSize={24} color={textColor()}>
          {`$state: mode = ${mode()}`}
        </text>
      </view>

      <view width={600} height={40} skipFocus>
        <text style={{ fontSize: 16, color: 0x6b7280ff, width: 580, contain: 'width' }}>
          {'Uses states={{ $dark: true }} — the $dark key in the style object is applied automatically'}
        </text>
      </view>

      <view width={700} height={28} skipFocus>
        <text style={{ fontSize: 26, color: 0xf0e6d3ff }}>
          {'Toggle theme'}
        </text>
      </view>

      <view width={600} height={60} color={0x1a1a2eff} borderRadius={12}
        $focus={{ color: 0x2d2b55ff }}
        onEnter={toggleMode}>
        <text x={20} y={14} style={{ fontSize: 24, color: 0xc084fcff }}>
          {`Current: ${mode()} — press Enter to switch`}
        </text>
      </view>

      <view width={700} height={26} skipFocus>
        <text style={{ fontSize: 22, color: 0xf0e6d3ff }}>
          {'How it works:'}
        </text>
      </view>

      <view width={700} height={200} skipFocus>
        <text style={{ fontSize: 17, color: 0x9ca3afff, width: 680, contain: 'width' }}>
          {`Spread styles: define separate style objects per theme (darkCard, lightCard) and spread the active one into the component. Simple and explicit — good for small apps.

$state styles: define $dark/$light keys inside a style object. Pass states={{ $dark: true }} to activate matching styles automatically. The renderer applies $dark styles when that state is true. This is the same system $focus uses — you can combine them.

For larger apps, consider a Context-based ThemeProvider that shares the mode signal across the tree (see example 06).

Docs: https://solid-tv.github.io/solid/#/essentials/theming`}
        </text>
      </view>
    </Column>
  )
}
