import ExamplePanel from '../ExamplePanel'
import GridExample from '../examples/19-grid/Example'

export default function GridPage() {
  return (
    <ExamplePanel
      title="Grid (layout)"
      filePath="src/examples/19-grid/Example.tsx"
      description="Grid component with 2D navigation, looping, and automatic scroll."
    >
      <GridExample />
    </ExamplePanel>
  )
}
