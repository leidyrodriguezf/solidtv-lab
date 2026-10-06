import { createStore, produce, reconcile } from 'solid-js/store'
import { Column } from '@solidtv/solid/primitives'

export default function StoresExample() {
  const [user, setUser] = createStore({
    name: 'Alice',
    age: 25,
    address: {
      city: 'NYC',
      zip: '10001',
    },
    tags: ['dev', 'solid'],
  })

  const names = ['Alice', 'Bob', 'Carol', 'Dave']
  const cities = ['NYC', 'LA', 'Chicago', 'Miami', 'Seattle']

  const cycleName = () => {
    const idx = (names.indexOf(user.name) + 1) % names.length
    setUser('name', names[idx])
  }

  const incrementAge = () => {
    setUser('age', a => a + 1)
  }

  const cycleCity = () => {
    const idx = (cities.indexOf(user.address.city) + 1) % cities.length
    setUser('address', 'city', cities[idx])
  }

  // Path setter: must return a new array — can't mutate directly
  const addTagPath = () => {
    setUser('tags', t => [...t, `p-${user.tags.length + 1}`])
  }

  // produce: get a mutable draft — CAN use push/splice/delete
  const addTagProduce = () => {
    setUser(produce(draft => {
      draft.tags.push(`m-${draft.tags.length + 1}`)
    }))
  }

  // reconcile: replace the entire store with new data (diffs automatically)
  const resetUser = () => {
    setUser(reconcile({
      name: 'Alice',
      age: 25,
      address: { city: 'NYC', zip: '10001' },
      tags: ['dev', 'solid'],
    }))
  }

  const boxStyle = {
    width: 600,
    height: 60,
    color: 0x1a1a2eff,
    borderRadius: 12,
    $focus: { color: 0x2d2b55ff },
  }

  return (
    <Column gap={14} scroll="always" style={{ width: 800, height: 850 }}>
      <view width={700} height={35} skipFocus>
        <text style={{ fontSize: 28, color: 0xf0e6d3ff }}>
          {'createStore: nested reactive objects'}
        </text>
      </view>

      <view style={boxStyle} onEnter={cycleName}>
        <text x={20} y={14} style={{ fontSize: 26, color: 0xc084fcff }}>
          {`Name: ${user.name}`}
        </text>
      </view>

      <view width={500} height={20} skipFocus>
        <text style={{ fontSize: 18, color: 0x9ca3afff }}>{'Press Enter to cycle name'}</text>
      </view>

      <view style={boxStyle} onEnter={incrementAge}>
        <text x={20} y={14} style={{ fontSize: 26, color: 0x60a5faff }}>
          {`Age: ${user.age}`}
        </text>
      </view>

      <view width={500} height={20} skipFocus>
        <text style={{ fontSize: 18, color: 0x9ca3afff }}>{'Press Enter to increment age'}</text>
      </view>

      <view style={boxStyle} onEnter={cycleCity}>
        <text x={20} y={14} style={{ fontSize: 26, color: 0x34d399ff }}>
          {`City: ${user.address.city} (zip: ${user.address.zip})`}
        </text>
      </view>

      <view width={500} height={20} skipFocus>
        <text style={{ fontSize: 18, color: 0x9ca3afff }}>{'Press Enter to cycle city'}</text>
      </view>

      <view width={700} height={35} skipFocus>
        <text style={{ fontSize: 28, color: 0xf0e6d3ff }}>
          {'produce vs path setter'}
        </text>
      </view>

      <view width={700} height={30} skipFocus>
        <text style={{ fontSize: 20, color: 0xf59e0bff }}>
          {`Tags: [${user.tags.join(', ')}]`}
        </text>
      </view>

      <view style={boxStyle} onEnter={addTagPath}>
        <text x={20} y={14} style={{ fontSize: 26, color: 0x60a5faff }}>
          {'Add tag (path setter)'}
        </text>
      </view>

      <view width={600} height={20} skipFocus>
        <text style={{ fontSize: 16, color: 0x6b7280ff }}>
          {"setUser('tags', t => [...t, newTag]) — returns a new array"}
        </text>
      </view>

      <view style={boxStyle} onEnter={addTagProduce}>
        <text x={20} y={14} style={{ fontSize: 26, color: 0xf59e0bff }}>
          {'Add tag (produce)'}
        </text>
      </view>

      <view width={600} height={20} skipFocus>
        <text style={{ fontSize: 16, color: 0x6b7280ff }}>
          {'setUser(produce(draft => draft.tags.push(newTag))) — mutates directly'}
        </text>
      </view>

      <view width={700} height={35} skipFocus>
        <text style={{ fontSize: 28, color: 0xf0e6d3ff }}>
          {'reconcile'}
        </text>
      </view>

      <view style={boxStyle} onEnter={resetUser}>
        <text x={20} y={14} style={{ fontSize: 26, color: 0xef4444ff }}>
          {'Reset all to defaults'}
        </text>
      </view>

      <view width={600} height={20} skipFocus>
        <text style={{ fontSize: 16, color: 0x6b7280ff }}>
          {'setUser(reconcile(newData)) — diffs and replaces the whole store'}
        </text>
      </view>

      <view width={700} height={50} color={0x1a1a2eff} skipFocus>
        <text x={20} y={10} style={{ fontSize: 20, color: 0xf59e0bff }}>
          {`Store: { name: "${user.name}", age: ${user.age}, city: "${user.address.city}", tags: [${user.tags.join(', ')}] }`}
        </text>
      </view>

      <view width={700} height={30} skipFocus>
        <text style={{ fontSize: 22, color: 0xf0e6d3ff }}>{'How it works:'}</text>
      </view>

      <view width={700} height={250} skipFocus>
        <text style={{ fontSize: 18, color: 0x9ca3afff, width: 680, contain: 'width' }}>
          {`Path setter: the store is a read-only proxy. You can't do store.tags.push() — it won't work. Instead you return a new value: setUser('tags', t => [...t, newTag]).

produce: gives you a mutable draft. You CAN do draft.tags.push(), draft.name = 'Bob', delete draft.field — like regular JS. Solid intercepts the mutations and only updates what changed. Same result as path setter, but easier for complex updates.

Both add "p-" or "m-" prefix tags so you can see which method added each one.

reconcile: replaces the entire store with new data from outside (e.g. an API response). Solid diffs old vs new and only re-renders what actually changed.`}
        </text>
      </view>
    </Column>
  )
}
