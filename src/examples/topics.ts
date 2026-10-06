export interface Topic {
  id: string
  label: string
  path: string
  description: string
  category: 'SolidJS' | 'SolidTV'
}

export const topics: Topic[] = [
  // SolidJS
  {
    id: '00-lifecycle',
    label: 'Lifecycle (mount/cleanup)',
    path: '/00-lifecycle',
    description: 'onMount, onCleanup and component lifecycle',
    category: 'SolidJS',
  },
  {
    id: '01-signals',
    label: 'Signals (reactive state)',
    path: '/01-signals',
    description: 'Basic createSignal (counter)',
    category: 'SolidJS',
  },
  {
    id: '02-effects',
    label: 'Effects (side effects)',
    path: '/02-effects',
    description: 'createEffect + onMount/onCleanup',
    category: 'SolidJS',
  },
  {
    id: '03-memos',
    label: 'Memos (derived values)',
    path: '/03-memos',
    description: 'createMemo for derived values',
    category: 'SolidJS',
  },
  {
    id: '04-control-flow',
    label: 'Control Flow (Show/For)',
    path: '/04-control-flow',
    description: 'Show, For and Switch/Match',
    category: 'SolidJS',
  },
  {
    id: '05-stores',
    label: 'Stores (nested state)',
    path: '/05-stores',
    description: 'createStore with nested objects',
    category: 'SolidJS',
  },
  {
    id: '06-context',
    label: 'Context (shared state)',
    path: '/06-context',
    description: 'createContext/useContext for shared state',
    category: 'SolidJS',
  },
  {
    id: '07-resources',
    label: 'Resources (async data)',
    path: '/07-resources',
    description: 'createResource simulating a fetch',
    category: 'SolidJS',
  },
  {
    id: '08-batch-untrack',
    label: 'Batch & Untrack',
    path: '/08-batch-untrack',
    description: 'batch groups updates; untrack reads without subscribing',
    category: 'SolidJS',
  },
  // SolidTV
  {
    id: '09-view-text',
    label: 'View & Text (elements)',
    path: '/09-view-text',
    description: 'Using view and text elements',
    category: 'SolidTV',
  },
  {
    id: '10-styles',
    label: 'Styles (colors/borders)',
    path: '/10-styles',
    description: 'Styles, colors, borders, shadows',
    category: 'SolidTV',
  },
  {
    id: '11-theming',
    label: 'Theming (dark/light)',
    path: '/11-theming',
    description: 'Spread styles, $state theming, dynamic themes',
    category: 'SolidTV',
  },
  {
    id: '12-row-column',
    label: 'Row & Column (layout)',
    path: '/12-row-column',
    description: 'Row and Column with automatic navigation',
    category: 'SolidTV',
  },
  {
    id: '13-focus-management',
    label: 'Focus (navigation)',
    path: '/13-focus-management',
    description: 'useFocusManager, autofocus, onFocus/onBlur',
    category: 'SolidTV',
  },
  {
    id: '14-remote-keys',
    label: 'Remote Keys (input)',
    path: '/14-remote-keys',
    description: 'keyMap and onEnter/onLeft/onRight handling',
    category: 'SolidTV',
  },
  {
    id: '15-routing',
    label: 'Routing (pages)',
    path: '/15-routing',
    description: 'Router and Route with 2 screens',
    category: 'SolidTV',
  },
  {
    id: '16-animations',
    label: 'Animations (transitions)',
    path: '/16-animations',
    description: 'Simple animation with animate',
    category: 'SolidTV',
  },
  {
    id: '17-images',
    label: 'Images (textures)',
    path: '/17-images',
    description: 'Loading an image/texture',
    category: 'SolidTV',
  },
  {
    id: '18-large-lists',
    label: 'Large Lists (scroll)',
    path: '/18-large-lists',
    description: 'Large list with scroll/virtualization',
    category: 'SolidTV',
  },
  {
    id: '19-grid',
    label: 'Grid (layout)',
    path: '/19-grid',
    description: 'Grid component with 2D navigation',
    category: 'SolidTV',
  },
  {
    id: '20-streaming-home',
    label: 'SolidTV: Streaming Home',
    path: '/20-streaming-home',
    description: 'Reactive hero, two carousels and shared favorites with JSON data and createResource',
    category: 'SolidTV',
  },
]
