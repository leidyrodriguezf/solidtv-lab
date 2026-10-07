import { createSignal, onMount } from 'solid-js'
import { For, type ElementNode } from '@solidtv/solid'
import { Column } from '@solidtv/solid/primitives'
import { useNavigate, useLocation } from '@solidjs/router'
import { topics, type Topic } from './examples/topics'

function SidebarItem(props: { topic: Topic; onSelect: (topic: Topic) => void; isActive: boolean; category: 'SolidJS' | 'SolidTV' }) {
  const [focused, setFocused] = createSignal(false)

  const bgColor = () => {
    if (focused()) return 0x7c3aedcc
    if (props.isActive) return 0x7c3aed66
    return 0x00000000
  }

  const txtColor = () => {
    if (focused() || props.isActive) return 0xffffffff
    return props.category === 'SolidTV' ? 0xc084fcff : 0x93c5fdff
  }

  return (
    <view
      width={400} height={50}
      borderRadius={8}
      color={bgColor()}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onEnter={() => props.onSelect(props.topic)}
    >
      <text x={16} y={12} fontSize={24} color={txtColor()}>
        {props.topic.label}
      </text>
    </view>
  )
}

function HomeItem(props: { isActive: boolean; onSelect: () => void }) {
  const [focused, setFocused] = createSignal(false)

  const bgColor = () => {
    if (focused()) return 0x7c3aedcc
    if (props.isActive) return 0x7c3aed66
    return 0x00000000
  }

  const txtColor = () => {
    if (focused() || props.isActive) return 0xffffffff
    return 0xc084fcff
  }

  return (
    <view
      width={400} height={50}
      borderRadius={8}
      color={bgColor()}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onEnter={() => props.onSelect()}
    >
      <text x={16} y={12} fontSize={24} color={txtColor()}>
        {'⌂  Home'}
      </text>
    </view>
  )
}

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  let columnRef: ElementNode | undefined
  const handleSelect = (topic: Topic) => {
    navigate(topic.path)
  }

  onMount(() => {
    columnRef?.setFocus()
  })

  const solidTopics = topics.filter(t => t.category === 'SolidJS')
  const tvTopics = topics.filter(t => t.category === 'SolidTV')

  return (
    <view width={420} height={1080} color={0x111827ff} clipping forwardFocus={0}>
      <Column ref={columnRef!} width={420}
        selected={Math.max(0, topics.findIndex(topic => topic.path === location.pathname) + 1)}
        scroll="auto" gap={4} y={0} x={0} autofocus>
        <HomeItem isActive={location.pathname === '/'} onSelect={() => navigate('/')} />
        <For each={solidTopics}>
          {(topic) => (
            <SidebarItem
              topic={topic}
              onSelect={handleSelect}
              isActive={location.pathname === topic.path}
              category="SolidJS"
            />
          )}
        </For>
        <For each={tvTopics}>
          {(topic) => (
            <SidebarItem
              topic={topic}
              onSelect={handleSelect}
              isActive={location.pathname === topic.path}
              category="SolidTV"
            />
          )}
        </For>
      </Column>
    </view>
  )
}
