import { createSignal, createContext, useContext } from 'solid-js'
import type { JSXElement } from 'solid-js'
import { Column } from '@solidtv/solid/primitives'

// 1. Create a context with a default value
const ThemeContext = createContext<{
  theme: () => string
  toggle: () => void
}>()

// 2. Provider component wraps children and shares state
function ThemeProvider(props: { children: JSXElement }) {
  const [theme, setTheme] = createSignal('dark')
  const toggle = () => { setTheme(t => (t === 'dark' ? 'light' : 'dark')) }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {props.children}
    </ThemeContext.Provider>
  )
}

// 3. Any descendant can consume the context — no prop drilling
function ThemeDisplay() {
  const { theme } = useContext(ThemeContext)!
  const backgroundColor = () => theme() === 'dark' ? 0x1a1a2eff : 0xe2e8f0ff
  const textColor = () => theme() === 'dark' ? 0xf9fafbff : 0x1a1a2eff

  return (
    <view width={600} height={60} color={backgroundColor()} borderRadius={12} skipFocus>
      <text x={20} y={14} fontSize={26} color={textColor()}>
        {`Current theme: ${theme()}`}
      </text>
    </view>
  )
}

function ThemeToggle() {
  const { toggle } = useContext(ThemeContext)!

  return (
    <view
      width={600} height={60} color={0x1a1a2eff} borderRadius={12}
      $focus={{ color: 0x2d2b55ff }}
      onEnter={toggle}
    >
      <text x={20} y={14} style={{ fontSize: 26, color: 0xc084fcff }}>
        {'Toggle theme'}
      </text>
    </view>
  )
}

function NestedChild() {
  const { theme } = useContext(ThemeContext)!

  return (
    <view width={600} height={50} skipFocus>
      <text x={20} y={10} style={{ fontSize: 22, color: 0x34d399ff }}>
        {`Nested child reads theme: "${theme()}" (no props passed!)`}
      </text>
    </view>
  )
}

export default function ContextExample() {
  return (
    <ThemeProvider>
      <Column gap={16} scroll="none" style={{ width: 800, height: 700 }}>
        <view width={700} height={35} skipFocus>
          <text style={{ fontSize: 28, color: 0xf0e6d3ff }}>
            {'createContext / useContext'}
          </text>
        </view>

        <ThemeDisplay />

        <ThemeToggle />

        <view width={500} height={20} skipFocus>
          <text style={{ fontSize: 18, color: 0x9ca3afff }}>
            {'Press Enter to toggle between dark/light'}
          </text>
        </view>

        <view width={700} height={35} skipFocus>
          <text style={{ fontSize: 28, color: 0xf0e6d3ff }}>
            {'Deeply nested component'}
          </text>
        </view>

        <NestedChild />

        <view width={700} height={30} skipFocus>
          <text style={{ fontSize: 22, color: 0xf0e6d3ff }}>
            {'How it works:'}
          </text>
        </view>

        <view width={700} height={200} skipFocus>
          <text style={{ fontSize: 18, color: 0x9ca3afff, width: 680, contain: 'width' }}>
            {`createContext() defines a shared "channel". The Provider wraps a subtree and exposes a value (signals, functions, stores — anything).

useContext() reads that value from any descendant — no matter how deeply nested. No need to pass props through every level (prop drilling).

Here ThemeProvider shares a theme signal and a toggle function. ThemeDisplay, ThemeToggle, and NestedChild all consume it independently. When toggle() is called, every consumer updates automatically.`}
          </text>
        </view>
      </Column>
    </ThemeProvider>
  )
}
