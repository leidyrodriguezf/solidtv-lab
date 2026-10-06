import ExamplePanel from '../ExamplePanel'
import ThemingExample from '../examples/11-theming/Example'

export default function ThemingPage() {
  return (
    <ExamplePanel
      title="Theming"
      filePath="src/examples/11-theming/Example.tsx"
      description="Dynamic themes with spread styles and the $state system."
    >
      <ThemingExample />
    </ExamplePanel>
  )
}
