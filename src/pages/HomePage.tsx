import { onCleanup, onMount } from 'solid-js'
import presentationUrl from '../../docs/De_React_a_SolidTV.pdf?url'

export default function HomePage() {
  onMount(() => {
    const viewer = document.createElement('iframe')
    viewer.src = `${presentationUrl}#view=FitH`
    viewer.title = 'De React a SolidTV'
    viewer.setAttribute('aria-label', 'Presentación De React a SolidTV')

    Object.assign(viewer.style, {
      position: 'fixed',
      border: '0',
      borderRadius: '16px',
      background: '#1f2937',
      pointerEvents: 'auto',
      zIndex: '2147483647',
    })

    const alignViewer = () => {
      const canvas = document.querySelector('canvas')
      if (!canvas) return

      const bounds = canvas.getBoundingClientRect()
      const scaleX = bounds.width / 1920
      const scaleY = bounds.height / 1080

      Object.assign(viewer.style, {
        left: `${bounds.left + 440 * scaleX}px`,
        top: `${bounds.top + 20 * scaleY}px`,
        width: `${1460 * scaleX}px`,
        height: `${1040 * scaleY}px`,
      })
    }

    document.body.appendChild(viewer)
    alignViewer()
    window.addEventListener('resize', alignViewer)

    onCleanup(() => {
      window.removeEventListener('resize', alignViewer)
      viewer.remove()
    })
  })

  return (
    <view x={20} y={20} width={1460} height={1040} color={0x1f2937ff} borderRadius={16}>
      <text
        x={200}
        y={300}
        style={{ fontSize: 52, fontWeight: 700, color: 0xf9fafbff }}
      >
        {'Solid Lab'}
      </text>
      <text
        x={200}
        y={380}
        style={{ fontSize: 28, color: 0xc084fcff }}
      >
        {'Learn SolidJS + SolidTV step by step'}
      </text>
      <text
        x={200}
        y={440}
        style={{ fontSize: 22, color: 0x9ca3afff, width: 1000, contain: 'width' }}
      >
        {'Use arrow keys to navigate the sidebar and Enter to select a topic. Press Right to interact with the example.'}
      </text>
    </view>
  )
}
