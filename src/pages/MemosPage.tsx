import ExamplePanel from '../ExamplePanel'
import MemosExample from '../examples/03-memos/Example'

export default function MemosPage() {
  return (
    <ExamplePanel
      title="Memos"
      filePath="src/examples/03-memos/Example.tsx"
      description="createMemo caches a derived value and only recomputes when its dependencies change."
    >
      <MemosExample />
    </ExamplePanel>
  )
}
