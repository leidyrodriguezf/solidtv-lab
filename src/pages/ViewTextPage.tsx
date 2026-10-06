import ExamplePanel from '../ExamplePanel'
import ViewTextExample from '../examples/09-view-text/Example'

export default function ViewTextPage() {
  return (
    <ExamplePanel
      title="View & Text"
      filePath="src/examples/09-view-text/Example.tsx"
      description="The two intrinsic elements in SolidTV: <view> for containers and <text> for rendering text."
    >
      <ViewTextExample />
    </ExamplePanel>
  )
}
