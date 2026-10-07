import { createSignal } from 'solid-js'
import { Dynamic } from '@solidtv/solid'
import { Column } from '@solidtv/solid/primitives'
import { sectionTitle, hint, btn } from './styles'

function AlertCard(props: { message: string }) {
  return (
    <view width={500} height={50} color={0xef4444ff} borderRadius={8}>
      <text x={15} y={12} style={{ fontSize: 20, color: 0xffffffff }}>
        {`⚠ ${props.message}`}
      </text>
    </view>
  )
}

function InfoCard(props: { message: string }) {
  return (
    <view width={500} height={50} color={0x3b82f6ff} borderRadius={8}>
      <text x={15} y={12} style={{ fontSize: 20, color: 0xffffffff }}>
        {`ℹ ${props.message}`}
      </text>
    </view>
  )
}

function SuccessCard(props: { message: string }) {
  return (
    <view width={500} height={50} color={0x22c55eff} borderRadius={8}>
      <text x={15} y={12} style={{ fontSize: 20, color: 0xffffffff }}>
        {`✓ ${props.message}`}
      </text>
    </view>
  )
}

const cardRegistry: Record<string, (p: { message: string }) => any> = {
  alert: AlertCard,
  info: InfoCard,
  success: SuccessCard,
}

const cardTypes = Object.keys(cardRegistry)

export default function DynamicSection() {
  const [cardIdx, setCardIdx] = createSignal(0)
  const cardType = () => cardTypes[cardIdx()]
  const cycleCard = () => setCardIdx(i => (i + 1) % cardTypes.length)

  return (
    <Column gap={6} style={{ width: 700, height: 170 }}>
      <view height={30} width={700} skipFocus>
        <text style={sectionTitle}>{'5. Dynamic — component from a variable'}</text>
      </view>
      <view height={22} width={700} skipFocus>
        <text style={hint}>
          {'When: "I already determined which component I need — render it." Great for registries and config-driven UI.'}
        </text>
      </view>
      <view {...btn} onEnter={() => { cycleCard() }}>
        <text x={20} y={12} style={{ fontSize: 22, color: 0xfbbf24ff }}>
          {`Card type: ${cardType()} → press Enter to cycle`}
        </text>
      </view>
      <Dynamic component={cardRegistry[cardType()]} message={`This is a ${cardType()} card rendered via Dynamic`} />
    </Column>
  )
}
