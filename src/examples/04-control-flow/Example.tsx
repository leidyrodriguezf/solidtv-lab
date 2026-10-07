import { createSignal } from 'solid-js'
import { Column } from '@solidtv/solid/primitives'
import ShowSection from './ShowSection'
import ForSection from './ForSection'
import IndexSection from './IndexSection'
import SwitchMatchSection from './SwitchMatchSection'
import DynamicSection from './DynamicSection'
import CheatSheet from './CheatSheet'

const fruits = ['Apple', 'Banana', 'Cherry', 'Mango', 'Peach']

export default function ControlFlowExample() {
  const [items, setItems] = createSignal([...fruits])

  return (
    <Column gap={20} scroll="auto" style={{ width: 1400, height: 850 }}>
      <ShowSection />
      <ForSection items={items} setItems={setItems} />
      <IndexSection items={items} setItems={setItems} />
      <SwitchMatchSection />
      <DynamicSection />
      <CheatSheet />
    </Column>
  )
}
