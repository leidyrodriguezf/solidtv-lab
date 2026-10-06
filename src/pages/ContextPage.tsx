import ExamplePanel from '../ExamplePanel'
import ContextExample from '../examples/06-context/Example'

export default function ContextPage() {
  return (
    <ExamplePanel
      title="Context"
      filePath="src/examples/06-context/Example.tsx"
      description="createContext and useContext let you share state across components without prop drilling."
    >
      <ContextExample />
    </ExamplePanel>
  )
}
