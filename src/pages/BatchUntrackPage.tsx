import ExamplePanel from '../ExamplePanel'
import BatchUntrackExample from '../examples/08-batch-untrack/Example'

export default function BatchUntrackPage() {
  return (
    <ExamplePanel
      title="Batch & Untrack"
      filePath="src/examples/08-batch-untrack/Example.tsx"
      description="batch groups signal updates into one notification; untrack reads without subscribing."
    >
      <BatchUntrackExample />
    </ExamplePanel>
  )
}
