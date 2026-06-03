import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

function Counter({ target, suffix = '' }) {
  const [n, setN] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1600
    const step = 14
    const inc = target / (duration / step)
    const t = setInterval(() => {
      start += inc
      if (start >= target) { setN(target); clearInterval(t) }
      else setN(Math.floor(start))
    }, step)
    return () => clearInterval(t)
  }, [inView, target])

  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>
}

const stats = [
  { value: 40,   suffix: '+', label: 'Markets Covered' },
  { value: 3200, suffix: '+', label: 'Screened Instruments' },
  { text: '2',               label: 'Offices — Lahore & London' },
]

export default function StatsBar() {
  return (
    <div className="bg-white border-t border-b border-slate-200 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
      {stats.map((s, i) => (
        <div key={i} className="flex flex-col items-center justify-center py-10 px-8 text-center gap-2">
          <span className="font-barlow font-light text-navy-900" style={{ fontSize: 'clamp(3rem,5vw,4.5rem)', lineHeight: 1 }}>
            {s.value != null ? <Counter target={s.value} suffix={s.suffix} /> : s.text}
          </span>
          <span className="t-label" style={{ fontSize: '0.6rem' }}>{s.label}</span>
        </div>
      ))}
    </div>
  )
}
