import { Route } from '@solidjs/router'
import { HashRouter } from '@solidtv/solid/primitives/router'
import { Row } from '@solidtv/solid/primitives'
import Sidebar from './Sidebar'
import HomePage from './pages/HomePage'
import LifecyclePage from './pages/LifecyclePage'
import SignalsPage from './pages/SignalsPage'
import EffectsPage from './pages/EffectsPage'
import MemosPage from './pages/MemosPage'
import ControlFlowPage from './pages/ControlFlowPage'
import StoresPage from './pages/StoresPage'
import ContextPage from './pages/ContextPage'
import ResourcesPage from './pages/ResourcesPage'
import ViewTextPage from './pages/ViewTextPage'
import StylesPage from './pages/StylesPage'
import ThemingPage from './pages/ThemingPage'
import RowColumnPage from './pages/RowColumnPage'
import FocusPage from './pages/FocusPage'
import RemoteKeysPage from './pages/RemoteKeysPage'
import RoutingPage from './pages/RoutingPage'
import AnimationsPage from './pages/AnimationsPage'
import ImagesPage from './pages/ImagesPage'
import LargeListsPage from './pages/LargeListsPage'
import BatchUntrackPage from './pages/BatchUntrackPage'
import GridPage from './pages/GridPage'
import StreamingHomePage from './pages/StreamingHomePage'

function ComingSoon(props: { title: string }) {
  return (
    <view
      x={20}
      y={20}
      width={1460}
      height={1040}
      style={{
        color: 0x1f2937ff,
        borderRadius: 16,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <text style={{ fontSize: 36, color: 0x6b7280ff }}>
        {`${props.title} - Coming soon`}
      </text>
    </view>
  )
}

function AppLayout(props: any) {
  return (
    <Row width={1920} height={1080} gap={0} color={0x0f172aff} scroll="none">
      <Sidebar />
      <view width={1500} height={1080}
        forwardFocus={function(this: any) {
          for (const child of this.children) {
            if (child?.setFocus) { child.setFocus(); return true; }
          }
          return false;
        }}
        onLeft={function(this: any) {
          this.parent?.children?.[0]?.setFocus()
          return true;
        }}>
        {props.children}
      </view>
    </Row>
  )
}

export default function App() {
  return (
    <HashRouter root={AppLayout}>
      <Route path="/" component={HomePage} />
      <Route path="/00-lifecycle" component={LifecyclePage} />
      <Route path="/01-signals" component={SignalsPage} />
      <Route path="/02-effects" component={EffectsPage} />
      <Route path="/03-memos" component={MemosPage} />
      <Route path="/04-control-flow" component={ControlFlowPage} />
      <Route path="/05-stores" component={StoresPage} />
      <Route path="/06-context" component={ContextPage} />
      <Route path="/07-resources" component={ResourcesPage} />
      <Route path="/08-batch-untrack" component={BatchUntrackPage} />
      <Route path="/09-view-text" component={ViewTextPage} />
      <Route path="/10-styles" component={StylesPage} />
      <Route path="/11-theming" component={ThemingPage} />
      <Route path="/12-row-column" component={RowColumnPage} />
      <Route path="/13-focus-management" component={FocusPage} />
      <Route path="/14-remote-keys" component={RemoteKeysPage} />
      <Route path="/15-routing" component={RoutingPage} />
      <Route path="/16-animations" component={AnimationsPage} />
      <Route path="/17-images" component={ImagesPage} />
      <Route path="/18-large-lists" component={LargeListsPage} />
      <Route path="/19-grid" component={GridPage} />
      <Route path="/20-streaming-home" component={StreamingHomePage} />
    </HashRouter>
  )
}
