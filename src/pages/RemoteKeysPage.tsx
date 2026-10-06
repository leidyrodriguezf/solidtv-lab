import ExamplePanel from '../ExamplePanel'
import RemoteKeysExample from '../examples/14-remote-keys/Example'

export default function RemoteKeysPage() {
  return (
    <ExamplePanel
      title="Remote Keys"
      filePath="src/examples/14-remote-keys/Example.tsx"
      description="Key handlers, event propagation, raw key events, and tap vs long-press."
    >
      <RemoteKeysExample />
    </ExamplePanel>
  )
}
