import { useState, useRef, useEffect } from 'react'
import { ArrowRight, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import GlassCard from '../components/GlassCard'
import AnimatedSection from '../components/AnimatedSection'
import SectionHeading from '../components/SectionHeading'

const categories = ['All', 'Equity', 'Fixed Income', 'Macro', 'Sectoral']

const reports = [
  { category: 'Equity',       title: 'PSX KSE-100 Mid-Year Outlook 2025',                     date: 'June 2025',     excerpt: 'Sector rotation dynamics and index targets heading into H2 2025.' },
  { category: 'Macro',        title: 'Pakistan Economic Review: Inflation & Monetary Policy',  date: 'May 2025',      excerpt: 'SBP rate trajectory and implications for equities and fixed-income post-IMF.' },
  { category: 'Sectoral',     title: 'Pakistan Banking Sector Deep Dive',                      date: 'May 2025',      excerpt: 'Islamic banking growth, ADR ratios, and the investment case for Meezan and peers.' },
  { category: 'Fixed Income', title: 'Sukuk Market: Opportunities in Pakistan',                date: 'April 2025',    excerpt: 'Sovereign and corporate sukuk issuances, yield curves, and strategy for 2025.' },
  { category: 'Equity',       title: 'Technology & Fintech: Emerging Opportunities on PSX',   date: 'April 2025',    excerpt: 'Digital financial services adoption and investable PSX-listed technology companies.' },
  { category: 'Sectoral',     title: 'Energy Transition & Renewables: Pakistan Perspective',  date: 'March 2025',    excerpt: 'Renewable energy pipeline, IPP valuations, and policy risk assessment.' },
  { category: 'Macro',        title: 'FDI Inflows & Pakistan Market Sentiment',               date: 'March 2025',    excerpt: 'Cross-border capital flows and the role of overseas Pakistanis in PSX participation.' },
  { category: 'Fixed Income', title: 'Government Securities: T-Bills & PIBs Strategy',        date: 'February 2025', excerpt: 'Duration positioning and Shariah-compliant alternatives for fixed-income allocation.' },
]

function BarChartCanvas() {
  const ref = useRef(null)
  const [cursor, setCursor] = useState(null)
  const [tick, setTick] = useState(0)

  const bars = Array.from({ length: 26 }, (_, i) => ({
    id: i,
    x: (i + 0.5) / 26,
    phase: i * 0.65,
    base: 0.1 + Math.abs(Math.sin(i * 0.85 + 1.1)) * 0.28 + Math.abs(Math.cos(i * 0.45)) * 0.1,
  }))

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      setCursor({ x: (e.clientX - rect.left) / rect.width })
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', () => setCursor(null))
    const interval = setInterval(() => setTick(t => t + 1), 45)
    return () => { el.removeEventListener('mousemove', onMove); clearInterval(interval) }
  }, [])

  return (
    <div ref={ref} className="absolute inset-0 flex items-end" aria-hidden="true">
      <svg width="100%" height="100%" preserveAspectRatio="none">
        {bars.map((b) => {
          const wave = Math.sin(tick * 0.055 + b.phase) * 0.07
          const proximity = cursor ? Math.max(0, 1 - Math.abs(b.x - cursor.x) / 0.11) : 0
          const h = Math.max(0.04, b.base + wave + proximity * 0.42)
          return (
            <rect
              key={b.id}
              x={`${b.x * 100 - 1.7}%`}
              y={`${(1 - h) * 100}%`}
              width="2.8%"
              height={`${h * 100}%`}
              fill={`rgba(62,181,167,${0.07 + proximity * 0.3})`}
              style={{ transition: 'y 0.08s ease, height 0.08s ease, fill 0.1s ease' }}
            />
          )
        })}
        <line x1="0" y1="100%" x2="100%" y2="100%" stroke="rgba(62,181,167,0.12)" strokeWidth="1" />
      </svg>
    </div>
  )
}

function ReportHero() {
  return (
    <section className="relative bg-navy-900 overflow-hidden" style={{ minHeight: '380px' }}>
      <BarChartCanvas />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="font-syne text-teal text-xs font-semibold tracking-widest uppercase block mb-5">Research</span>
          <h1
            className="font-barlow font-light text-white"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 0.9 }}
          >
            Market Reports.
          </h1>
          <p className="font-inter text-white/45 mt-5 max-w-md" style={{ fontSize: '0.95rem', lineHeight: 1.7 }}>
            Institutional-grade research on Pakistan's equity, fixed income, and macroeconomic landscape.
          </p>
          <div className="flex items-center gap-6 mt-8">
            <div className="flex items-center gap-2">
              <span className="block w-1.5 h-1.5 rounded-full bg-teal animate-pulse" aria-hidden="true" />
              <span className="font-inter text-white/35 text-xs">8 Reports Available</span>
            </div>
            <span className="font-inter text-white/20 text-xs">·</span>
            <span className="font-inter text-white/35 text-xs">Updated June 2025</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function Report() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? reports : reports.filter((r) => r.category === active)

  return (
    <main className="pb-20">
      <ReportHero />

      <section className="section-pad max-w-7xl mx-auto">
        {/* Filter tabs */}
        <AnimatedSection className="flex flex-wrap gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4 py-2 text-xs font-syne font-medium tracking-widest uppercase transition-all border ${
                active === c
                  ? 'bg-navy-900 text-white border-navy-900'
                  : 'border-slate-200 text-slate-500 hover:text-navy-900 hover:border-navy-900'
              }`}
            >
              {c}
            </button>
          ))}
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((r, i) => (
            <AnimatedSection key={r.title} delay={i * 0.06}>
              <GlassCard className="h-full flex flex-col group">
                <div className="flex items-center justify-between mb-4">
                  <span className="t-label" style={{ fontSize: '0.57rem' }}>{r.category}</span>
                  <span className="flex items-center gap-1 text-xs font-inter text-slate-400">
                    <Calendar size={10} aria-hidden="true" /> {r.date}
                  </span>
                </div>
                <h3 className="font-barlow font-light text-navy-900 leading-snug flex-1 mb-4" style={{ fontSize: '1.3rem', lineHeight: 1.05 }}>{r.title}</h3>
                <p className="t-body mb-5" style={{ fontSize: '0.78rem', lineHeight: '1.7' }}>{r.excerpt}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                  <button className="flex items-center gap-1 text-xs font-inter text-teal hover:gap-2.5 transition-all font-semibold group">
                    Read Report <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </button>
                  <span className="block w-0 h-px bg-teal group-hover:w-8 transition-all duration-300" aria-hidden="true" />
                </div>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </main>
  )
}
