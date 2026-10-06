import ExamplePanel from '../ExamplePanel'
import ControlFlowExample from '../examples/04-control-flow/Example'

export default function ControlFlowPage() {
  return (
    <ExamplePanel
      title="Control Flow"
      filePath="src/examples/04-control-flow/Example.tsx"
      description="Show, For and Switch/Match — Solid's built-in control flow components."
    >
      <ControlFlowExample />
    </ExamplePanel>
  )
}
