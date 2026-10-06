import ExamplePanel from '../ExamplePanel'
import SignalsExample from '../examples/01-signals/Example'

export default function SignalsPage() {
  return (
    <ExamplePanel
      title="Signals"
      filePath="src/examples/01-signals/Example.tsx"
      description="createSignal is the fundamental reactive primitive in SolidJS. Returns a getter and a setter."
    >
      <SignalsExample />
    </ExamplePanel>
  )
}
