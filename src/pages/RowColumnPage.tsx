import ExamplePanel from '../ExamplePanel'
import RowColumnExample from '../examples/12-row-column/Example'

export default function RowColumnPage() {
  return (
    <ExamplePanel
      title="Row & Column"
      filePath="src/examples/12-row-column/Example.tsx"
      description="Horizontal and vertical layout primitives with automatic focus navigation."
    >
      <RowColumnExample />
    </ExamplePanel>
  )
}
