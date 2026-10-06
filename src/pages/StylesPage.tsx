import ExamplePanel from '../ExamplePanel'
import StylesExample from '../examples/10-styles/Example'

export default function StylesPage() {
  return (
    <ExamplePanel
      title="Styles"
      filePath="src/examples/10-styles/Example.tsx"
      description="Colors, borders, alpha, borderRadius, and $focus state styles — no CSS needed."
    >
      <StylesExample />
    </ExamplePanel>
  )
}
