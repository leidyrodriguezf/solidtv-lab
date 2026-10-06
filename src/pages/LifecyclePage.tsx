import ExamplePanel from '../ExamplePanel'
import LifecycleExample from '../examples/00-lifecycle/Example'

export default function LifecyclePage() {
  return (
    <ExamplePanel
      title="Lifecycle"
      filePath="src/examples/00-lifecycle/Example.tsx"
      description="onMount and onCleanup: mounting, reactive updates, and cleanup on unmount."
    >
      <LifecycleExample />
    </ExamplePanel>
  )
}
