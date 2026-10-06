import ExamplePanel from '../ExamplePanel'
import FocusExample from '../examples/13-focus-management/Example'

export default function FocusPage() {
  return (
    <ExamplePanel
      title="Focus Management"
      filePath="src/examples/13-focus-management/Example.tsx"
      description="$focus styles, forwardFocus, skipFocus, onFocus/onBlur, setFocus(), activeElement."
    >
      <FocusExample />
    </ExamplePanel>
  )
}
