import { createResource } from 'solid-js'
import { Show } from '@solidtv/solid'
import CatalogStatus from './CatalogStatus'
import StreamingHome from './StreamingHome'
import { fetchMovies } from './catalog'

export default function StreamingHomeExample() {
  // Fetch the local JSON once; the resource owns loading, data and error states.
  const [movies, { refetch }] = createResource(fetchMovies)
    // clipping is equivalent to overflow: hidden; forwardFocus=0 means the view itself is focusable, but it will not forward focus to its children. This is important because the StreamingHome component has its own focusable elements, and we don't want the parent view to steal focus from them.
  return (
    <view
      x={20} y={20} width={1460} height={1040}
      color={0x080e1aff} borderRadius={18} clipping forwardFocus={0}
    >
      <Show
        when={!movies.error}
        fallback={
          <CatalogStatus
            title="We couldn't load the catalog"
            description="Check your connection and try again."
            onRetry={() => { refetch() }}
          />
        }
      >
        <Show
          when={movies()}
          fallback={
            <CatalogStatus
              title="Loading your next story..."
              description="Fetching the catalog with createResource."
            />
          }
        >
          {(items) => (
            <Show
              when={items().length > 0}
              fallback={
                <CatalogStatus
                  title="New stories are on their way"
                  description="The catalog is empty. Try loading it again."
                  onRetry={() => { refetch() }}
                />
              }
            >
              <StreamingHome movies={items()} />
            </Show>
          )}
        </Show>
      </Show>
    </view>
  )
}
