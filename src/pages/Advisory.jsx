import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import SectionHeading from '../components/SectionHeading'

const services = [
  {
    id: 'equities', num: '01', label: 'Global Equities',
    title: 'Shariah-Screened<br/>Equity Advisory.',
    desc: 'Institutional-grade equity research and execution across the Pakistan Stock Exchange and select international markets. Every security is rigorously screened for Shariah compliance before inclusion in any advisory or discretionary mandate.',
    points: [
      'PSX KSE-100 and KSE-30 full coverage',
      'Business activity & financial ratio Shariah screening',
      'Sector-specific thematic research',
      'Block trade execution and market-making',
      'Model portfolio management',
    ],
  },
  {
    id: 'asset-management', num: '02', label: 'Asset Management',
    title: 'Portfolio Construction<br/>& Wealth Management.',
    desc: 'Our asset management division builds bespoke Shariah-compliant portfolios for high-net-worth individuals, family offices, and institutional investors — combining quantitative frameworks with deep local market knowledge.',
    points: [
      'Discretionary and advisory mandates',
      'Sukuk and Islamic fixed-income allocation',
      'Multi-asset Shariah-compliant fund strategies',
      'Ongoing risk management and rebalancing',
      'Consolidated reporting and client dashboards',
    ],
  },
  {
    id: 'ma', num: '03', label: 'Global M&A',
    title: 'Mergers, Acquisitions<br/>& Corporate Finance.',
    desc: 'Advisory on cross-border transactions with deep expertise in structuring deals to meet Shariah requirements. We bridge Pakistani and international capital across all transaction types — buy-side, sell-side, and special situations.',
    points: [
      'Buy-side and sell-side advisory',
      'Shariah-compliant deal structuring (Musharakah, Mudarabah)',
      'Valuation and financial modelling',
      'Due diligence coordination',
      'Cross-border transaction management — Pakistan & UK',
    ],
  },
  {
    id: 'ipo', num: '04', label: 'Global IPO',
    title: 'Capital Markets<br/>& IPO Advisory.',
    desc: 'End-to-end IPO advisory for companies preparing for public listings on the Pakistan Stock Exchange and the London Stock Exchange — capital structure optimisation, regulatory coordination, and investor marketing within a Shariah-compliant framework.',
    points: [
      'IPO readiness assessment and structuring',
      'PSX and LSE listing advisory',
      'Book-building and investor roadshow management',
      'Prospectus and regulatory documentation',
      'Post-listing investor relations advisory',
    ],
  },
]

function NetworkCanvas() {
  const ref = useRef(null)
  const cursorRef = useRef({ x: 50, y: 50 })
  const nodesRef = useRef(
    Array.from({ length: 28 }, () => ({
      x: Math.random() * 86 + 7,
      y: Math.random() * 72 + 14,
      vx: (Math.random() - 0.5) * 0.11,
      vy: (Math.random() - 0.5) * 0.08,
    }))
  )
  const [, rerender] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      cursorRef.current = {
        x: (e.clientX - rect.left) / rect.width * 100,
        y: (e.clientY - rect.top) / rect.height * 100,
      }
    }
    document.addEventListener('mousemove', onMove)
    const interval = setInterval(() => {
      const cx = cursorRef.current.x, cy = cursorRef.current.y
      nodesRef.current = nodesRef.current.map(n => {
        let { x, y, vx, vy } = n
        const dx = cx - x, dy = cy - y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 28 && dist > 0) {
          vx += (dx / dist) * 0.022
          vy += (dy / dist) * 0.022
        }
        vx *= 0.97
        vy *= 0.97
        x += vx
        y += vy
        if (x < 3 || x > 97) vx *= -1
        if (y < 5 || y > 95) vy *= -1
        return { x: Math.max(3, Math.min(97, x)), y: Math.max(5, Math.min(95, y)), vx, vy }
      })
      rerender(r => r + 1)
    }, 40)
    return () => { document.removeEventListener('mousemove', onMove); clearInterval(interval) }
  }, [])

  const nodes = nodesRef.current
  const cursor = cursorRef.current

  const lines = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x
      const dy = nodes[i].y - nodes[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 22) lines.push({ i, j, opacity: (1 - dist / 22) * 0.26 })
    }
  }

  return (
    <div ref={ref} className="absolute inset-0" aria-hidden="true">
      <svg width="100%" height="100%">
        {lines.map((l, idx) => (
          <line
            key={idx}
            x1={`${nodes[l.i].x}%`} y1={`${nodes[l.i].y}%`}
            x2={`${nodes[l.j].x}%`} y2={`${nodes[l.j].y}%`}
            stroke={`rgba(62,181,167,${l.opacity})`}
            strokeWidth="0.6"
          />
        ))}
        {nodes.map((n, i) => {
          const dx = n.x - cursor.x, dy = n.y - cursor.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const glow = Math.max(0, 1 - dist / 18)
          return (
            <circle key={i} cx={`${n.x}%`} cy={`${n.y}%`}
              r={1.2 + glow * 2.8} fill={`rgba(62,181,167,${0.22 + glow * 0.52})`} />
          )
        })}
        <circle
          cx={`${cursor.x}%`} cy={`${cursor.y}%`} r="3.5%"
          fill="none" stroke="rgba(62,181,167,0.08)" strokeWidth="0.5"
          style={{ transition: 'cx 0.05s, cy 0.05s' }}
        />
      </svg>
    </div>
  )
}

function AdvisoryHero() {
  return (
    <section className="relative bg-navy-900 overflow-hidden" style={{ minHeight: '380px' }}>
      <NetworkCanvas />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="font-syne text-teal text-xs font-semibold tracking-widest uppercase block mb-5">Advisory Services</span>
          <h1
            className="font-barlow font-light text-white"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 0.9 }}
          >
            Four Disciplines.<br />
            <em className="not-italic text-teal">One Standard.</em>
          </h1>
          <p className="font-inter text-white/45 mt-5 max-w-md" style={{ fontSize: '0.95rem', lineHeight: 1.7 }}>
            All Shariah-compliant. All institutional grade. Delivered from Lahore and London.
          </p>
          <div className="flex flex-wrap items-center gap-6 mt-8">
            {['Equities', 'Asset Management', 'M&A', 'IPO'].map((s, i) => (
              <a key={s} href={`#${['equities', 'asset-management', 'ma', 'ipo'][i]}`}
                className="font-inter text-white/35 text-xs hover:text-teal transition-colors flex items-center gap-1.5"
              >
                <span className="block w-4 h-px bg-current" aria-hidden="true" />
                {s}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function Advisory() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    }
  }, [hash])

  return (
    <main className="pb-20">
      <AdvisoryHero />

      {services.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          className={`section-pad scroll-mt-24 border-t border-slate-200 ${i % 2 === 1 ? 'bg-slate-50' : 'bg-white'}`}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <AnimatedSection className={i % 2 === 1 ? 'lg:order-2' : ''}>
              <span className="font-barlow font-light text-navy-400/30" style={{ fontSize: '5rem', lineHeight: 1, display: 'block', marginBottom: '-1rem' }}>
                {s.num}
              </span>
              <SectionHeading label={s.label} title={s.title} />
              <p className="t-body mt-6 mb-8" style={{ lineHeight: '1.85' }}>{s.desc}</p>
              <ul className="flex flex-col gap-3">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-xs font-inter text-slate-500">
                    <CheckCircle size={13} className="text-teal mt-0.5 shrink-0" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.15} className={`${i % 2 === 1 ? 'lg:order-1' : ''} hidden lg:block`}>
              <div
                className="relative overflow-hidden flex flex-col items-start justify-end p-12 min-h-[320px] border-l-2 border-teal"
                style={{ background: 'linear-gradient(135deg, #0B1624 0%, #0D2040 100%)' }}
              >
                <span
                  className="absolute top-6 right-8 font-barlow font-light text-white/5 pointer-events-none select-none"
                  style={{ fontSize: '10rem', lineHeight: 1 }}
                  aria-hidden="true"
                >
                  {s.num}
                </span>
                <span className="font-syne text-teal/60 text-xs font-semibold tracking-widest uppercase mb-3">{s.label}</span>
                <div className="bg-teal" style={{ width: '2.5rem', height: '2px' }} aria-hidden="true" />
              </div>
            </AnimatedSection>
          </div>
        </section>
      ))}
    </main>
  )
}
