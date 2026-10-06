import { Show } from '@solidtv/solid'
import { Column } from '@solidtv/solid/primitives'

export default function CatalogStatus(props: { title: string; description: string; onRetry?: () => void }) {
  return (
    <Column x={48} y={330} width={1300} gap={24} scroll="none" autofocus={!!props.onRetry}>
      <text fontSize={18} color={0xff9b66ff} skipFocus>
        {'SOLIDTV / CATALOG'}
      </text>
      <text fontSize={42} color={0xffffffff} skipFocus>
        {props.title}
      </text>
      <text fontSize={23} color={0xaebbd0ff} skipFocus>
        {props.description}
      </text>
      <Show when={props.onRetry}>
        <view
          width={220} height={58} color={0x29364bff} borderRadius={12}
          $focus={{ color: 0xff5900ff }}
          onEnter={() => {
            props.onRetry?.()
            return true
          }}
        >
          <text x={24} y={17} fontSize={22} color={0xffffffff}>
            {'Reload catalog'}
          </text>
        </view>
      </Show>
    </Column>
  )
}
