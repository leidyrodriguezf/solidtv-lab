import ExamplePanel from '../ExamplePanel'
import EffectsExample from '../examples/02-effects/Example'

export default function EffectsPage() {
  return (
    <ExamplePanel
      title="Effects"
      filePath="src/examples/02-effects/Example.tsx"
      description="createEffect automatically tracks signal dependencies and re-runs when they change."
    >
      <EffectsExample />
    </ExamplePanel>
  )
}
