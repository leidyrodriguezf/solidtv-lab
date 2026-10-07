import type { Accessor, Setter } from 'solid-js'
import { Index } from '@solidtv/solid'
import { Column, Row } from '@solidtv/solid/primitives'
import { sectionTitle, hint, btn } from './styles'

interface Props {
  items: Accessor<string[]>
  setItems: Setter<string[]>
}

export default function IndexSection(props: Props) {
  return (
    <Column gap={6} style={{ width: 700, height: 200 }}>
      <view height={30} width={700} skipFocus>
        <text style={sectionTitle}>{'3. Index — keyed by position'}</text>
      </view>
      <view height={40} width={700} skipFocus>
        <text style={hint}>
          {'When: position matters more than identity (primitives, counters). Each index is a stable slot — the value is a signal that updates in place, nodes are never recreated.'}
        </text>
      </view>
      <Row gap={8} scroll="none" style={{ width: 700, height: 50 }}>
        <view {...btn} width={280} onEnter={() => { props.setItems(prev => [...prev, `New ${prev.length}`]) }}>
          <text x={15} y={12} style={{ fontSize: 20, color: 0x60a5faff }}>{'Add item (Enter)'}</text>
        </view>
        <view {...btn} width={280} onEnter={() => { props.setItems(prev => prev.slice(0, -1)) }}>
          <text x={15} y={12} style={{ fontSize: 20, color: 0xf87171ff }}>{'Remove last (Enter)'}</text>
        </view>
      </Row>
      <Row gap={8} scroll="none" style={{ width: 700, height: 44 }}>
        <Index each={props.items()}>
          {(item, i) => (
            <view width={100} height={36} color={0x0e7490cc} borderRadius={8} skipFocus>
              <text x={8} y={6} style={{ fontSize: 18, color: 0xffffffff }}>
                {`${i} ${item()}`}
              </text>
            </view>
          )}
        </Index>
      </Row>
    </Column>
  )
}
