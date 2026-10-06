import ExamplePanel from '../ExamplePanel'
import StoresExample from '../examples/05-stores/Example'

export default function StoresPage() {
  return (
    <ExamplePanel
      title="Stores"
      filePath="src/examples/05-stores/Example.tsx"
      description="createStore provides fine-grained reactivity for nested objects."
    >
      <StoresExample />
    </ExamplePanel>
  )
}
