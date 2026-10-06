import ExamplePanel from '../ExamplePanel'
import AnimationsExample from '../examples/16-animations/Example'

export default function AnimationsPage() {
  return (
    <ExamplePanel
      title="Animations"
      filePath="src/examples/16-animations/Example.tsx"
      description="Declarative transitions, imperative animate/chain, fade, and looping."
    >
      <AnimationsExample />
    </ExamplePanel>
  )
}
