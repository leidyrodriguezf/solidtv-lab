export default function CheatSheet() {
  return (
    <view width={700} height={310} color={0x1a1a2eff} borderRadius={10}
      $focus={{ color: 0x2d2b55ff, borderRadius: 10 }}>
      <text x={15} y={10} style={{ fontSize: 22, color: 0xf0e6d3ff }}>
        {'When to use each:'}
      </text>
      <text x={15} y={40} style={{ fontSize: 17, color: 0x9ca3afff, width: 660, contain: 'width' }}>
        {'Show  →  "if this is true, show this"\n   Can have multiple visible at once. Use fallback for an else branch.\n\nFor  →  dynamic list, keyed by ITEM\n   Each item is tracked by reference. Best for objects or unique values.\n\nIndex  →  stable list, keyed by POSITION\n   Each slot is a signal. Best for primitives or fixed-size arrays.\n\nSwitch / Match  →  "which one of these wins?"\n   Only the first truthy Match renders. Order matters.\n\nDynamic  →  "I know which component — just render it"\n   Takes a component variable. Perfect for registries and config-driven UI.'}
      </text>
    </view>
  )
}
