// see https://docs.solidjs.com/reference/basic-reactivity/create-resource#createresource

import { createSignal, createResource, Show } from 'solid-js'
import { Column } from '@solidtv/solid/primitives'

interface User {
  id: number
  name: string
  email: string
}

const fakeUsers: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
  { id: 3, name: 'Carol Williams', email: 'carol@example.com' },
]

// (Fetcher) Simulates a fetch with a 1s delay
async function fetchUser(id: number): Promise<User> {
  return new Promise(resolve => {
    setTimeout(() => resolve(fakeUsers[id - 1]), 1000)
  })
}

export default function ResourcesExample() {
  const [userId, setUserId] = createSignal(1)

  // createResource re-fetches whenever userId() changes
    // When the value (userId()) is undefined, null, or false, the fetcher is not called.
    // Otherwise the current value is passed as the first fetcher argument. Each change triggers the fetcher again.
  const [user, { refetch }] = createResource(userId, fetchUser)

  const cycleUser = () => {
    setUserId(id => (id % 3) + 1)
  }

  const boxStyle = {
    width: 600,
    height: 60,
    color: 0x1a1a2eff,
    borderRadius: 12,
    $focus: { color: 0x2d2b55ff },
  }

  return (
    <Column gap={16} scroll="none" style={{ width: 800, height: 750 }}>
      <view width={700} height={35} skipFocus>
        <text style={{ fontSize: 28, color: 0xf0e6d3ff }}>
          {'createResource: async data fetching'}
        </text>
      </view>

      <view style={boxStyle} onEnter={cycleUser}>
        <text x={20} y={14} style={{ fontSize: 26, color: 0xc084fcff }}>
          {`Fetch user #${userId()} — press Enter to cycle`}
        </text>
      </view>

      <view style={boxStyle} onEnter={() => { refetch() }}>
        <text x={20} y={14} style={{ fontSize: 26, color: 0x60a5faff }}>
          {'Refetch current user'}
        </text>
      </view>

      <view width={700} height={30} skipFocus>
        <text style={{ fontSize: 24, color: 0xf0e6d3ff }}>
          {'Result:'}
        </text>
      </view>

      <view width={700} height={80} skipFocus>
        <Show when={user.loading}>
          <text style={{ fontSize: 22, color: 0xf59e0bff }}>
            {'Loading...'}
          </text>
        </Show>
        <Show when={user.error}>
          <text style={{ fontSize: 22, color: 0xef4444ff }}>
            {`Error: ${user.error}`}
          </text>
        </Show>
        <Show when={!user.loading && user()}>
          <text y={0} style={{ fontSize: 22, color: 0x34d399ff }}>
            {`Name: ${user()?.name}`}
          </text>
          <text y={30} style={{ fontSize: 22, color: 0x34d399ff }}>
            {`Email: ${user()?.email}`}
          </text>
        </Show>
      </view>

      <view width={700} height={30} skipFocus>
        <text style={{ fontSize: 22, color: 0xf0e6d3ff }}>
          {'How it works:'}
        </text>
      </view>

      <view width={700} height={250} skipFocus>
        <text style={{ fontSize: 18, color: 0x9ca3afff, width: 680, contain: 'width' }}>
          {`createResource(source, fetcher) takes a reactive source signal and an async fetcher function. It returns a resource with built-in states:

resource() — the resolved data (undefined while loading)
resource.loading — true while the fetcher is running
resource.error — the error if the fetcher threw

When the source signal changes (userId), the fetcher re-runs automatically. You can also call refetch() to manually re-run it.

This replaces the pattern of useEffect + useState + loading/error state you'd write in React.`}
        </text>
      </view>
    </Column>
  )
}
