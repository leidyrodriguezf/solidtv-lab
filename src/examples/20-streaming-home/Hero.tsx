import type { Movie } from './catalog'

export default function Hero(props: { movie: Movie }) {
  const genreLabel = () => `${props.movie.genre}  ·  Movie`

  return (
    <view width={1460} height={440} skipFocus>
      <view
        id="streaming-hero-image"
        width={1460}
        height={460}
        src={props.movie.hero}
        color={0xffffffff}
        textureOptions={{ resizeMode: { type: 'cover', clipY: 0.4 } }}
      />
      <view
        width={1200} height={460}
        colorLeft={0x080e1aff} colorRight={0x080e1a00}
      />
      <view
        width={1460} height={140}
        colorTop={0x080e1acc} colorBottom={0x080e1a00}
      />
      <view
        y={300} width={1460} height={160}
        colorTop={0x080e1a00} colorBottom={0x080e1aff}
      />

      <text x={48} y={112} fontSize={16} color={0xff9b66ff}>
        {'A STORY FOR EVERY MOMENT'}
      </text>
      <text
        id="streaming-hero-title"
        x={48} y={146} width={790} height={65}
        contain="both" maxLines={1} fontSize={54} color={0xffffffff}
      >
        {props.movie.title}
      </text>
      <text x={48} y={222} fontSize={20} color={0xd4dfecff}>
        {`${genreLabel()}   ·   ${props.movie.year}   ·   ${props.movie.duration}`}
      </text>
      <text
        id="streaming-hero-description"
        x={48} y={263} width={670} height={66}
        contain="both" maxLines={2} fontSize={22} lineHeight={31} color={0xbcc9daff}
      >
        {props.movie.description}
      </text>
    </view>
  )
}
