import { Armchair, Gamepad, Gamepad2, Headphones, Keyboard, Monitor, Mouse } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export const categoryIcons: Record<string, LucideIcon> = {
  console: Gamepad2,
  controller: Gamepad,
  mouse: Mouse,
  keyboard: Keyboard,
  headset: Headphones,
  chair: Armchair,
  monitor: Monitor,
}