import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus, Clock, Zap } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import AnimatedSection from '../components/AnimatedSection'

const tags = ['All', 'PSX', 'Currency', 'Commodities', 'Global', 'Policy']

const feed = [
  { tag: 'PSX',         title: 'KSE-100 crosses 95,000 as banking stocks rally on SBP rate cut expectations', time: '2h ago',  trend: 'up' },
  { tag: 'Policy',      title: 'SBP holds policy rate at 15% citing sticky core inflation despite easing headline CPI', time: '4h ago',  trend: 'neutral' },
  { tag: 'Currency',    title: 'PKR stabilises near 278/USD as current account deficit narrows in April data', time: '5h ago',  trend: 'up' },
  { tag: 'PSX',         title: 'Oil & gas sector leads PSX gains; OGDC up 3.2% on crude price recovery', time: '6h ago',  trend: 'up' },
  { tag: 'Global',      title: 'MSCI Frontier Markets Index gains 1.8%; Pakistan weight increases marginally', time: '8h ago',  trend: 'up' },
  { tag: 'Commodities', title: 'Gold at $2,380/oz — dollar weakness supports precious metals run', time: '10h ago', trend: 'up' },
  { tag: 'PSX',         title: 'Textile sector under pressure as US tariff uncertainty weighs on export outlook', time: '12h ago', trend: 'down' },
  { tag: 'Policy',      title: 'IMF third review completed; $1.1B tranche disbursement confirmed for July', time: '1d ago',  trend: 'up' },
  { tag: 'Currency',    title: 'Remittances hit $3.1B in April — highest monthly inflow in 18 months', time: '1d ago',  trend: 'up' },
]

function TrendIcon({ trend }) {
  if (trend === 'up')   return <TrendingUp   size={13} className="text-emerald-500 shrink-0" aria-label="Positive trend" />
  if (trend === 'down') return <TrendingDown size={13} className="text-red-500 shrink-0"     aria-label="Negative trend" />
  return <Minus size={13} className="text-slate-400 shrink-0" aria-label="Neutral" />
}

function RadarCanvas() {
  const ref = useRef(null)
  const [cursor, setCursor] = useState({ x: 50, y: 50 })
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      setCursor({
        x: (e.clientX - rect.left) / rect.width * 100,
        y: (e.clientY - rect.top) / rect.height * 100,
      })
    }
    el.addEventListener('mousemove', onMove)
    const interval = setInterval(() => setTick(t => (t + 1) % 120), 40)
    return () => { el.removeEventListener('mousemove', onMove); clearInterval(interval) }
  }, [])

  const rings = [15, 28, 41, 54, 65]
  const sweepAngle = (tick / 120) * 360

  return (
    <div ref={ref} className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <svg width="100%" height="100%" style={{ overflow: 'visible' }}>
        {/* Radar rings */}
        {rings.map((r, i) => (
          <circle
            key={r}
            cx={`${cursor.x}%`}
            cy={`${cursor.y}%`}
            r={`${r}%`}
            fill="none"
            stroke={`rgba(62,181,167,${0.04 + i * 0.01})`}
            strokeWidth="1"
            style={{ transition: 'cx 0.1s ease-out, cy 0.1s ease-out' }}
          />
        ))}
        {/* Sweep line */}
        <line
          x1={`${cursor.x}%`}
          y1={`${cursor.y}%`}
          x2={`${cursor.x + 60 * Math.cos(sweepAngle * Math.PI / 180)}%`}
          y2={`${cursor.y + 60 * Math.sin(sweepAngle * Math.PI / 180)}%`}
          stroke="rgba(62,181,167,0.25)"
          strokeWidth="1"
          style={{ transition: 'x1 0.1s, y1 0.1s' }}
        />
        {/* Fade trail behind sweep */}
        {[30, 60, 90].map((offset, i) => {
          const angle = sweepAngle - offset
          return (
            <line
              key={offset}
              x1={`${cursor.x}%`}
              y1={`${cursor.y}%`}
              x2={`${cursor.x + 60 * Math.cos(angle * Math.PI / 180)}%`}
              y2={`${cursor.y + 60 * Math.sin(angle * Math.PI / 180)}%`}
              stroke={`rgba(62,181,167,${0.08 - i * 0.025})`}
              strokeWidth="1"
              style={{ transition: 'x1 0.1s, y1 0.1s' }}
            />
          )
        })}
        {/* Blip dots at ring intersections */}
        {[{ angle: 42, ring: 2 }, { angle: 158, ring: 3 }, { angle: 285, ring: 1 }].map((blip, i) => {
          const r = rings[blip.ring]
          return (
            <circle
              key={i}
              cx={`${cursor.x + r * Math.cos(blip.angle * Math.PI / 180)}%`}
              cy={`${cursor.y + r * Math.sin(blip.angle * Math.PI / 180)}%`}
              r="2.5"
              fill={`rgba(62,181,167,${0.3 + Math.sin(tick * 0.08 + i) * 0.2})`}
              style={{ transition: 'cx 0.1s, cy 0.1s' }}
            />
          )
        })}
      </svg>
    </div>
  )
}

function IntelHero() {
  return (
    <section className="relative bg-navy-900 overflow-hidden" style={{ minHeight: '380px' }}>
      <RadarCanvas />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="font-syne text-teal text-xs font-semibold tracking-widest uppercase block mb-5">Intelligence</span>
          <h1
            className="font-barlow font-light text-white"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 0.9 }}
          >
            Market Intel.
          </h1>
          <p className="font-inter text-white/45 mt-5 max-w-md" style={{ fontSize: '0.95rem', lineHeight: 1.7 }}>
            Real-time signals, policy updates, and macro intelligence for Pakistan's capital markets.
          </p>
          <div className="flex items-center gap-2 mt-8">
            <span className="block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            <span className="font-inter text-white/35 text-xs tracking-wide">Live feed · Updated hourly</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function GeometricSidebar() {
  const containerRef = useRef(null)
  const [shapes] = useState(() =>
    Array.from({ length: 9 }, (_, i) => ({
      id: i,
      cx: 8 + (i % 3) * 35,
      cy: 15 + Math.floor(i / 3) * 38,
      size: 28 + (i % 3) * 18,
      rotate: i * 22,
      type: i % 3,
    }))
  )
  const [offsets, setOffsets] = useState(shapes.map(() => ({ r: 0, s: 1 })))

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const mx = ((e.clientX - rect.left) / rect.width) * 100
      const my = ((e.clientY - rect.top) / rect.height) * 100
      setOffsets(shapes.map((s) => {
        const dx = s.cx - mx, dy = s.cy - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        return { r: s.rotate + (dist < 25 ? 18 : 2), s: dist < 20 ? 1.35 : 1 }
      }))
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [shapes])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-44 overflow-hidden flex items-center justify-center border border-slate-200"
      aria-hidden="true"
      style={{ background: 'linear-gradient(135deg, #0B1624 0%, #0D2040 100%)' }}
    >
      <svg width="100%" height="100%" className="absolute inset-0">
        {shapes.map((s, i) => {
          const t = `translate(${s.cx}%, ${s.cy}%) rotate(${offsets[i].r}deg) scale(${offsets[i].s}) translate(-${s.cx}%, -${s.cy}%)`
          return (
            <g key={s.id} style={{ transform: t, transformBox: 'fill-box', transition: 'transform 0.12s ease-out' }}>
              {s.type === 0 && <rect x={`${s.cx - s.size / 3}%`} y={`${s.cy - s.size / 3}%`} width={`${s.size / 3}%`} height={`${s.size / 3}%`} fill="none" stroke="rgba(62,181,167,0.25)" strokeWidth="1" />}
              {s.type === 1 && <circle cx={`${s.cx}%`} cy={`${s.cy}%`} r={`${s.size / 5}%`} fill="none" stroke="rgba(62,181,167,0.22)" strokeWidth="1" />}
              {s.type === 2 && <polygon points={`${s.cx}%,${s.cy - s.size / 4}% ${s.cx + s.size / 4}%,${s.cy + s.size / 4}% ${s.cx - s.size / 4}%,${s.cy + s.size / 4}%`} fill="none" stroke="rgba(62,181,167,0.22)" strokeWidth="1" />}
            </g>
          )
        })}
      </svg>
      <p className="relative z-10 font-syne text-teal/40 text-xs tracking-widest uppercase">Move to interact</p>
    </div>
  )
}

export default function Intel() {
  const [activeTag, setActiveTag] = useState('All')
  const filtered = activeTag === 'All' ? feed : feed.filter((f) => f.tag === activeTag)

  return (
    <main className="pb-20">
      <IntelHero />

      <section className="section-pad max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <AnimatedSection delay={0.1} className="lg:col-span-1 flex flex-col gap-4">
            <div className="gs-card p-5">
              <h3 className="text-xs font-syne font-semibold text-navy-900 mb-4 flex items-center gap-2">
                <Zap size={12} className="text-teal" aria-hidden="true" /> Filter by category
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTag(t)}
                    className={`px-3 py-1.5 text-xs font-syne font-medium border transition-all ${
                      activeTag === t
                        ? 'bg-navy-900 text-white border-navy-900'
                        : 'border-slate-200 text-slate-500 hover:text-navy-900 hover:border-navy-600'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <GeometricSidebar />
          </AnimatedSection>

          {/* Feed */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {filtered.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.05}>
                <GlassCard className="flex items-start gap-4 py-4 group">
                  <TrendIcon trend={item.trend} />
                  <div className="flex-1 min-w-0">
                    <span className="t-label block mb-1" style={{ fontSize: '0.55rem' }}>{item.tag}</span>
                    <p className="text-sm font-inter text-navy-900 leading-snug group-hover:text-navy-600 transition-colors">{item.title}</p>
                    <span className="flex items-center gap-1 text-xs font-inter text-slate-400 mt-1.5">
                      <Clock size={10} aria-hidden="true" /> {item.time}
                    </span>
                  </div>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
