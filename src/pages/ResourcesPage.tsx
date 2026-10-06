import ExamplePanel from '../ExamplePanel'
import ResourcesExample from '../examples/07-resources/Example'

export default function ResourcesPage() {
  return (
    <ExamplePanel
      title="Resources"
      filePath="src/examples/07-resources/Example.tsx"
      description="createResource handles async data fetching with built-in loading and error states."
    >
      <ResourcesExample />
    </ExamplePanel>
  )
}
