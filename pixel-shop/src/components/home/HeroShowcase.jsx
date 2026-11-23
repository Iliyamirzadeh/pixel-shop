import { useState } from 'react'
import { Gamepad2, Headphones, Mouse } from 'lucide-react'

const callouts = [
  { icon: Gamepad2, text: 'CONSOLE // 4K 120FPS', position: 'start-4 top-6', delay: '0s' },
  { icon: Mouse, text: 'MOUSE // 8000HZ', position: 'end-4 top-1/3', delay: '1.2s' },
  { icon: Headphones, text: 'AUDIO // SPATIAL 7.1', position: 'start-6 bottom-6', delay: '2.4s' },
]

const specs = [
  { label: 'Response', value: '1ms' },
  { label: 'Refresh', value: '240Hz' },
  { label: 'Latency', value: '0.2ms' },
]

function HeroShowcase() {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span dir="ltr" className="tech-label">
          Serial PX-90024
        </span>
        <span dir="ltr" className="tech-label flex items-center gap-2">
          Pixel Rig
          <span className="size-1.5 rounded-full bg-pixel" />
        </span>
      </div>

      <div className="pixel-grid relative aspect-[4/3] overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,106,0,0.18),transparent_65%)]" />

        {!imageFailed && (
          <img
            src="/images/hero.jpg"
            alt="تجهیزات گیمینگ پیکسل شاپ"
            onError={() => setImageFailed(true)}
            className="absolute inset-0 size-full object-cover"
          />
        )}

        {callouts.map((item) => (
          <div
            key={item.text}
            dir="ltr"
            className={`absolute ${item.position} flex animate-float items-center gap-2 rounded-md border border-line bg-ink/80 px-3 py-2 font-mono text-[11px] backdrop-blur`}
            style={{ animationDelay: item.delay }}
          >
            <item.icon size={14} className="text-pixel" />
            {item.text}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-px border-t border-line bg-line">
        {specs.map((spec) => (
          <div key={spec.label} className="bg-surface px-4 py-3">
            <p className="tech-label">{spec.label}</p>
            <p className="mt-1 font-mono text-sm font-bold">{spec.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HeroShowcase