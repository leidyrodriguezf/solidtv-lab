import { createSignal } from 'solid-js'
import type { ElementNode } from '@solidtv/solid'

interface FavoriteButtonProps {
  ref: (node: ElementNode) => void
  favorite: boolean
  onToggle: () => void
  onReturn: () => boolean
}

const buttonStyle = {
  width: 280,
  height: 58,
  color: 0x29364bff,
  borderRadius: 12,
  $focus: { color: 0xff5900ff },
}

export default function FavoriteButton(props: FavoriteButtonProps) {
  const [focused, setFocused] = createSignal(false)
  const buttonBorderFocus = (width: number, color: number) => ({ width, color })

  return (
    <view
      ref={props.ref}
      id="streaming-favorite"
      style={buttonStyle}
      border={focused() ? buttonBorderFocus(3, 0xffffffff) : buttonBorderFocus(0, 0x00000000)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onDown={props.onReturn}
      onEnter={() => {
        props.onToggle()
        return true
      }}
    >
      <text x={20} y={14} fontSize={25} color={0xffffffff}>
        {props.favorite ? '✓' : '+'}
      </text>
      <text x={58} y={17} fontSize={21} color={0xffffffff}>
        {props.favorite ? 'Saved to my list' : 'Add to my list'}
      </text>
    </view>
  )
}
