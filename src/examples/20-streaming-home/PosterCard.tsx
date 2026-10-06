import { createSignal } from 'solid-js'
import { Show, type ElementNode } from '@solidtv/solid'
import type { Movie } from './catalog'

interface PosterCardProps {
  movie: Movie
  favorite: boolean
  selectedCard?: ElementNode
  onSelect: (movie: Movie) => void
  onChoose: (card: ElementNode) => void
}

const cardStyle = {
  width: 323,
  height: 222,
  borderRadius: 12,
}

export default function PosterCard(props: PosterCardProps) {
  const [focused, setFocused] = createSignal(false)
  let card!: ElementNode

  // Orange follows focus; blue marks the card whose favorite action is open.
  const borderColor = () => {
    if (focused()) return 0xff5900ff
    if (props.selectedCard === card) return 0x38bdf8ff
    return 0x263249ff
  }

  return (
    <view
      ref={card}
      id={`card-${props.movie.id}`}
      style={cardStyle}
      color={borderColor()}
      onFocus={() => {
        setFocused(true)
        props.onSelect(props.movie)
      }}
      onBlur={() => setFocused(false)}
      onEnter={() => {
        props.onChoose(card)
        return true
      }}
    >
      {/* Keep the focus color on the wrapper, not on the image texture. */}
      <view
        x={4} y={4} width={315} height={214}
        color={0x162136ff} borderRadius={9} skipFocus
      >
        <view
          width={315} height={170}
          src={props.movie.poster}
          color={0xffffffff}
          borderRadius={9}
          textureOptions={{ resizeMode: { type: 'cover', clipY: 0.38 } }}
        />
        <view
          y={108} width={315} height={62}
          colorTop={0x16213600} colorBottom={0x162136cc}
        />
        <text
          x={12} y={179} width={291} height={30}
          contain="both" maxLines={1} fontSize={22} color={0xf1f5f9ff}
        >
          {props.movie.title}
        </text>
        <Show when={props.favorite}>
          <view x={213} y={12} width={90} height={28} color={0xff5900ff} borderRadius={6}>
            <text x={12} y={6} fontSize={14} color={0xffffffff}>
              {'MY LIST'}
            </text>
          </view>
        </Show>
      </view>
    </view>
  )
}
