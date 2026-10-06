import {createRenderer, Config, registerDefaultShaders, type CoreShaderManager} from '@solidtv/solid'
import { useFocusManager } from '@solidtv/solid/primitives'
import { WebGlRenderer } from '@solidtv/renderer/webgl'
import { CanvasTextRenderer } from '@solidtv/renderer/canvas'
import App from './App'

Config.fontSettings.fontFamily = 'sans-serif'
Config.fontSettings.fontSize = 28

const { renderer, render } = createRenderer({
  appWidth: 1920,
  appHeight: 1080,
  renderEngine: WebGlRenderer,
  fontEngines: [CanvasTextRenderer],
  clearColor: 0x00000000,
})

// borderRadius, border, and shadow won't render without registering shaders first
registerDefaultShaders(renderer.stage.shManager as CoreShaderManager)

render(() => {
  useFocusManager()
  return <App />
})
