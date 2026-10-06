import { createMemo } from 'solid-js'
import { For, Show, type ElementNode } from '@solidtv/solid'
import { Row } from '@solidtv/solid/primitives'
import PosterCard from './PosterCard'
import type { Favorites, Movie } from './catalog'

interface CarouselProps {
  title: string
  movies: Movie[]
  favorites: Favorites
  selectedCard?: ElementNode
  onSelect: (movie: Movie) => void
  onChoose: (card: ElementNode) => void
}

export default function Carousel(props: CarouselProps) {
  // Repeat the catalog three times to demonstrate scrolling with shared favorites.
  const movies = createMemo(() => [...props.movies, ...props.movies, ...props.movies])

  return (
    <Show when={props.movies.length > 0}>
      <view width={1364} height={264} forwardFocus={1}>
        <view width={1364} height={32} skipFocus>
          <view y={4} width={4} height={22} color={0xff5900ff} borderRadius={2} />
          <text x={16} fontSize={27} color={0xf1f5f9ff}>
            {props.title}
          </text>
          <text x={1242} y={6} fontSize={17} color={0x75859cff}>
            {`${movies().length} movies`}
          </text>
        </view>
        <view y={42} width={1364} height={222} clipping forwardFocus={0}>
          {/* Keep the focused card at the left edge, including the last items. */}
          <Row gap={24} scroll="always" width={1364} height={222}>
            <For each={movies()}>
              {(movie) => (
                <PosterCard
                  movie={movie}
                  favorite={!!props.favorites[movie.id]}
                  selectedCard={props.selectedCard}
                  onSelect={props.onSelect}
                  onChoose={props.onChoose}
                />
              )}
            </For>
          </Row>
        </view>
      </view>
    </Show>
  )
}
