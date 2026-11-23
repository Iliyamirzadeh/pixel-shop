import { Headset, RefreshCw, Rocket, ShieldCheck } from 'lucide-react'

const perks = [
  {
    icon: ShieldCheck,
    color: 'text-pixel',
    title: 'ضمانت اصالت کالا',
    text: 'همه‌ی کالاها اورجینال هستن و سلامت فیزیکی‌شون هنگام ارسال بررسی میشه',
  },
  {
    icon: Rocket,
    color: 'text-violet',
    title: 'ارسال فوق‌سریع',
    text: 'ارسال به سراسر کشور در کمتر از ۴۸ ساعت، با پیگیری لحظه‌ای مرسوله',
  },
  {
    icon: RefreshCw,
    color: 'text-cyan',
    title: 'گارانتی تعویض بی‌قیدوشرط',
    text: 'تا ۷ روز فرصت داری اگه کالا مشکل داشت، بدون ایراد تعویضش کنی',
  },
  {
    icon: Headset,
    color: 'text-pixel',
    title: 'مشاوره‌ی تخصصی',
    text: 'گیمرهای باتجربه‌ی تیم ما کمکت میکنن بهترین تجهیزات رو برای بودجه‌ات انتخاب کنی',
  },
]

function PerksSection() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {perks.map((perk) => (
        <div key={perk.title} className="rounded-xl border border-line bg-surface p-5">
          <span className="grid size-10 place-items-center rounded-lg bg-raised">
            <perk.icon size={20} className={perk.color} />
          </span>
          <h3 className="mt-5 font-bold">{perk.title}</h3>
          <p className="mt-2 text-sm leading-7 text-muted">{perk.text}</p>
        </div>
      ))}
    </section>
  )
}

export default PerksSection