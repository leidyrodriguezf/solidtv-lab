import ExamplePanel from '../ExamplePanel'
import RoutingExample from '../examples/15-routing/Example'

export default function RoutingPage() {
  return (
    <ExamplePanel
      title="Routing"
      filePath="src/examples/15-routing/Example.tsx"
      description="HashRouter, useNavigate, useLocation, useSearchParams — navigation in TV apps."
    >
      <RoutingExample />
    </ExamplePanel>
  )
}
