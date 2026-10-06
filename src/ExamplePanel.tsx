import { Show } from '@solidtv/solid'
import type { JSXElement } from 'solid-js'

interface ExamplePanelProps {
  filePath: string
  title: string
  description?: string
  children: JSXElement
}

function forwardToLastChild(this: any) {
  for (let i = this.children.length - 1; i >= 0; i--) {
    const child = this.children[i];
    if (child?.setFocus) { child.setFocus(); return true; }
  }
  return false;
}

function forwardToFirstChild(this: any) {
  for (const child of this.children) {
    if (child?.setFocus) { child.setFocus(); return true; }
  }
  return false;
}

export default function ExamplePanel(props: ExamplePanelProps) {
  return (
    <view x={20} y={20} width={1460} height={1040} color={0x1f2937ff} borderRadius={16}
      forwardFocus={forwardToLastChild} clipping>
      <view x={0} y={0} width={1460} height={150} color={0x1f2937ff} zIndex={10}>
        <text x={30} y={20} style={{ fontSize: 38, color: 0xf9fafbff }}>
          {props.title}
        </text>
        <text x={30} y={70} style={{ fontSize: 20, color: 0x6b7280ff }}>
          {props.filePath}
        </text>
        <Show when={props.description}>
          <text x={30} y={100} style={{ fontSize: 24, color: 0x9ca3afff, width: 1400, contain: 'width' }}>
            {props.description!}
          </text>
        </Show>
      </view>

      <view x={30} y={160} width={1400} height={860} forwardFocus={forwardToFirstChild}>
        {props.children}
      </view>
    </view>
  )
}
