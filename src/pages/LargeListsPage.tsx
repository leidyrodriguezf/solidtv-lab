import ExamplePanel from '../ExamplePanel'
import LargeListsExample from '../examples/18-large-lists/Example'

export default function LargeListsPage() {
  return (
    <ExamplePanel
      title="Large Lists"
      filePath="src/examples/18-large-lists/Example.tsx"
      description="Virtualized rows, columns, and grids for large datasets with constant memory usage."
    >
      <LargeListsExample />
    </ExamplePanel>
  )
}
