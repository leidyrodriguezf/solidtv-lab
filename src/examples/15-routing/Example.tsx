import { createSignal } from 'solid-js'
import { useNavigate, useLocation, useSearchParams } from '@solidjs/router'
import { Column, Row } from '@solidtv/solid/primitives'

const cardStyle = {
  width: 260,
  height: 70,
  color: 0x1a1a2eff,
  borderRadius: 10,
  $focus: { color: 0x7c3aedff, borderRadius: 10 },
}

const navTargets = [
  { label: 'Signals', path: '/01-signals', color: 0xc084fcff },
  { label: 'Stores', path: '/05-stores', color: 0x60a5faff },
  { label: 'Row & Column', path: '/11-row-column', color: 0x34d399ff },
  { label: 'Back here', path: '/14-routing', color: 0xfbbf24ff },
]

export default function RoutingExample() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [clickCount, setClickCount] = createSignal(0)

  const cycleParam = () => {
    const next = clickCount() + 1
    setClickCount(next)
    setSearchParams({ demo: String(next) })
  }

  const clearParams = () => {
    setClickCount(0)
    setSearchParams({ demo: undefined as unknown as string })
  }

  return (
    <Column gap={16} scroll="auto" style={{ width: 1400, height: 850 }}>

      {/* Section: useLocation — read current path */}
      <Column gap={6} style={{ width: 1300, height: 100 }}>
        <view height={26} width={700} skipFocus>
          <text style={{ fontSize: 24, color: 0xf0e6d3ff }}>
            {'useLocation() — current route info'}
          </text>
        </view>
        <view width={700} height={60} color={0x1a1a2eff} borderRadius={10}
          $focus={{ color: 0x2d2b55ff, borderRadius: 10 }}>
          <text x={15} y={8} style={{ fontSize: 18, color: 0x9ca3afff }}>
            {`pathname: ${location.pathname}`}
          </text>
          <text x={15} y={32} style={{ fontSize: 18, color: 0x9ca3afff }}>
            {`hash: ${location.hash || '(empty)'} | search: ${location.search || '(empty)'}`}
          </text>
        </view>
      </Column>

      {/* Section: useNavigate — programmatic navigation */}
      <Column gap={6} style={{ width: 1300, height: 110 }}>
        <view height={26} width={700} skipFocus>
          <text style={{ fontSize: 24, color: 0xf0e6d3ff }}>
            {'useNavigate() — go to another page'}
          </text>
        </view>
        <Row gap={12} scroll="none" style={{ width: 1200, height: 80 }}>
          {navTargets.map(t => (
            <view style={cardStyle}
              onEnter={() => { navigate(t.path) }}>
              <text x={15} y={22} style={{ fontSize: 20, color: t.color }}>
                {`Go to ${t.label}`}
              </text>
            </view>
          ))}
        </Row>
      </Column>

      {/* Section: useSearchParams — query params */}
      <Column gap={6} style={{ width: 1300, height: 135 }}>
        <view height={26} width={700} skipFocus>
          <text style={{ fontSize: 24, color: 0xf0e6d3ff }}>
            {'useSearchParams() — query parameters'}
          </text>
        </view>
        <view height={22} width={700} skipFocus>
          <text style={{ fontSize: 18, color: 0x9ca3afff }}>
            {`?demo=${searchParams.demo || '(not set)'}`}
          </text>
        </view>
        <Row gap={12} scroll="none" style={{ width: 1200, height: 80 }}>
          <view style={cardStyle}
            onEnter={cycleParam}>
            <text x={15} y={22} style={{ fontSize: 20, color: 0xf472b6ff }}>
              {'Set ?demo param'}
            </text>
          </view>
          <view style={cardStyle}
            onEnter={clearParams}>
            <text x={15} y={22} style={{ fontSize: 20, color: 0xef4444ff }}>
              {'Clear params'}
            </text>
          </view>
        </Row>
      </Column>

      {/* Section: Route setup explanation */}
      <Column gap={6} style={{ width: 1300, height: 110 }}>
        <view height={26} width={700} skipFocus>
          <text style={{ fontSize: 24, color: 0xf0e6d3ff }}>
            {'HashRouter + Route — app setup'}
          </text>
        </view>
        <view width={700} height={70} color={0x1a1a2eff} borderRadius={10}
          $focus={{ color: 0x2d2b55ff, borderRadius: 10 }}>
          <text x={15} y={10} style={{ fontSize: 17, color: 0x9ca3afff, width: 660, contain: 'width' }}>
            {'HashRouter uses # paths (no server config needed). Route maps a path to a component. The root prop wraps all routes in a shared layout (sidebar + content area).'}
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
          {'Import HashRouter from @solidtv/solid/primitives/router and Route from @solidjs/router. HashRouter uses hash-based URLs (#/path) — ideal for TV apps with no server. useNavigate() returns a function to navigate programmatically: navigate("/path"). useLocation() gives reactive access to pathname, search, and hash. useSearchParams() reads and writes query parameters as a reactive tuple [params, setParams]. The root prop on HashRouter wraps all routes in a layout component that receives children — perfect for persistent sidebars. Routes are declarative: <Route path="/page" component={Page} />.'}
        </text>
      </view>
    </Column>
  )
}
