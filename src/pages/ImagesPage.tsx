import ExamplePanel from '../ExamplePanel'
import ImagesExample from '../examples/17-images/Example'

export default function ImagesPage() {
  return (
    <ExamplePanel
      title="Images"
      filePath="src/examples/17-images/Example.tsx"
      description="Loading images with src, the Image component, placeholder, fallback, and sizing."
    >
      <ImagesExample />
    </ExamplePanel>
  )
}
