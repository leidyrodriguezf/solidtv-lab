import { createMemo, createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import type { ElementNode } from '@solidtv/solid'
import { Column } from '@solidtv/solid/primitives'
import Carousel from './Carousel'
import FavoriteButton from './FavoriteButton'
import Hero from './Hero'
import type { Favorites, Movie } from './catalog'

export default function StreamingHome(props: { movies: Movie[] }) {
  // Moving focus changes one signal; only its consumers update.
  const [selected, setSelected] = createSignal(props.movies[0])
  const [favorites, setFavorites] = createStore<Favorites>({})
  const [favoriteOrigin, setFavoriteOrigin] = createSignal<{
    card: ElementNode
    rowIndex: number
  }>()
  let navigation!: ElementNode
  let favoriteButton!: ElementNode

  const previewMovie = (movie: Movie) => {
    setSelected(movie)
    setFavoriteOrigin(undefined)
  }

  const openFavorite = (card: ElementNode, rowIndex: number) => {
    // Remember the card instance: the same movie appears in several positions.
    setFavoriteOrigin({ card, rowIndex })
    navigation.selected = 0
    favoriteButton.setFocus()
  }

  const returnToCard = () => {
    const origin = favoriteOrigin()
    if (!origin) return false

    // Keep Column navigation in sync with the direct focus jump.
    navigation.selected = origin.rowIndex
    origin.card.setFocus()
    return true
  }

  // Both carousels share favorites by movie ID, not by card position.
  const toggleFavorite = () => {
    setFavorites(selected().id, value => !value)
  }

  const favoriteCount = createMemo(() =>
    props.movies.filter(movie => favorites[movie.id]).length,
  )
  const recommended = createMemo(() =>
    [...props.movies].sort((a, b) => a.recommendedOrder - b.recommendedOrder),
  )

  return (
    <view width={1460} height={1040} forwardFocus={2}>
      <Hero movie={selected()} />

      <view x={48} y={28} width={1364} height={48} skipFocus>
        <text y={2} fontSize={31} color={0xffffffff}>
          {'solid'}
        </text>
        <view x={78} width={49} height={40} color={0xff5900ff} borderRadius={8}>
          <text x={8} y={7} fontSize={24} color={0xffffffff}>
            {'TV'}
          </text>
        </view>
        <view x={153} y={10} width={1} height={22} color={0x58657a88} />
        <text x={174} y={12} fontSize={17} color={0xaebbd0ff}>
          {'The final example'}
        </text>
        <view x={1214} width={150} height={40} color={0x162136dd} borderRadius={20}>
          <text x={22} y={11} fontSize={17} color={0xe2e8f0ff}>
            {`My list  ·  ${favoriteCount()}`}
          </text>
        </view>
      </view>

      {/* Enter jumps to the button without focusing cards in the other carousel. */}
      <Column ref={navigation} x={48} y={344} width={1364} gap={24} scroll="none" selected={1} autofocus>
        <FavoriteButton
          ref={node => { favoriteButton = node }}
          favorite={!!favorites[selected().id]}
          onToggle={toggleFavorite}
          onReturn={returnToCard}
        />
        <Carousel
          title="Featured"
          movies={props.movies}
          favorites={favorites}
          selectedCard={favoriteOrigin()?.card}
          onSelect={previewMovie}
          onChoose={card => openFavorite(card, 1)}
        />
        <Carousel
          title="Recommended for you"
          movies={recommended()}
          favorites={favorites}
          selectedCard={favoriteOrigin()?.card}
          onSelect={previewMovie}
          onChoose={card => openFavorite(card, 2)}
        />
      </Column>

      <view x={48} y={996} width={1364} height={32} skipFocus>
        <view width={1364} height={1} color={0x263249ff} />
        <text y={13} fontSize={15} color={0x93a4bbff}>
          {favoriteOrigin()
            ? 'Enter  Add / remove favorite     ↓  Back to selected card     Blue  Selected'
            : '← →  Explore     ↑ ↓  Change row     Enter  Select card     Orange  Focus'}
        </text>
        <text x={944} y={13} fontSize={15} color={0x75859cff}>
          {'createResource  /  createSignal  /  createStore'}
        </text>
      </view>
    </view>
  )
}
