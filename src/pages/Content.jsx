import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import AnimatedSection from '../components/AnimatedSection'
import SectionHeading from '../components/SectionHeading'

const articles = [
  {
    category: 'Market Outlook',
    title: "Pakistan's Capital Market Renaissance: What Investors Need to Know in 2025",
    date: 'June 3, 2025',
    author: 'Blackstone Research',
    excerpt: "After a record-breaking 2024 on the KSE-100, Pakistan's equity market enters 2025 with renewed foreign interest, declining inflation, and an improving fiscal picture. We break down the key themes for the year ahead.",
    featured: true,
  },
  {
    category: 'Islamic Finance',
    title: "The Rise of Sukuk: Pakistan's Islamic Debt Market Comes of Age",
    date: 'May 28, 2025',
    author: 'Advisory Desk',
    excerpt: "Corporate sukuk issuance in Pakistan hit a five-year high in FY2024-25. We examine the drivers, the key issuers, and what this means for fixed-income investors.",
  },
  {
    category: 'Equities',
    title: 'Banking on Banks: Why PSX Financial Stocks Still Have Room to Run',
    date: 'May 20, 2025',
    author: 'Equity Research',
    excerpt: "Despite a strong rally, Pakistan's banking sector trades at a significant discount to regional peers. We revisit the investment case for Islamic banking names.",
  },
  {
    category: 'Macro',
    title: 'SBP Rate Cycle: Timing the Turn for Fixed-Income Positioning',
    date: 'May 12, 2025',
    author: 'Macro Strategy',
    excerpt: 'With inflation on a sustained downward trajectory, markets are pricing in rate cuts by Q3 2025. What does this mean for duration positioning in Shariah-compliant portfolios?',
  },
  {
    category: 'Global',
    title: 'London-Listed Pakistani Stocks: A Guide for the Diaspora Investor',
    date: 'May 5, 2025',
    author: 'Advisory Desk',
    excerpt: "For overseas Pakistanis looking to invest through a UK-regulated entity, Blackstone Islamic's London office opens a direct pathway into Pakistani capital markets.",
  },
  {
    category: 'Equities',
    title: 'Technology Sector on PSX: Early Stage, High Potential',
    date: 'April 25, 2025',
    author: 'Equity Research',
    excerpt: "Pakistan's tech sector remains a small component of the KSE-100, but the pipeline of listings and improving regulatory environment signal a structural shift.",
  },
]

const [featured, ...rest] = articles

function VortexCanvas() {
  const ref = useRef(null)
  const cursorRef = useRef({ x: 50, y: 50 })
  const particlesRef = useRef(
    Array.from({ length: 70 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.09,
      vy: (Math.random() - 0.5) * 0.09,
      r: Math.random() * 1.6 + 0.7,
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
      particlesRef.current = particlesRef.current.map(p => {
        let { x, y, vx, vy, r } = p
        const dx = x - cx, dy = y - cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 32 && dist > 0) {
          vx += (-dy / dist) * 0.05
          vy += (dx / dist) * 0.05
        }
        vx *= 0.96
        vy *= 0.96
        x += vx
        y += vy
        if (x < 0) x += 100
        if (x > 100) x -= 100
        if (y < 0) y += 100
        if (y > 100) y -= 100
        return { x, y, vx, vy, r }
      })
      rerender(n => n + 1)
    }, 35)
    return () => { document.removeEventListener('mousemove', onMove); clearInterval(interval) }
  }, [])

  const particles = particlesRef.current
  const cursor = cursorRef.current

  const connLines = []
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const d = Math.sqrt(dx * dx + dy * dy)
      if (d < 11) connLines.push({ i, j, op: (1 - d / 11) * 0.18 })
    }
  }

  return (
    <div ref={ref} className="absolute inset-0" aria-hidden="true">
      <svg width="100%" height="100%">
        {connLines.map((l, idx) => (
          <line key={idx}
            x1={`${particles[l.i].x}%`} y1={`${particles[l.i].y}%`}
            x2={`${particles[l.j].x}%`} y2={`${particles[l.j].y}%`}
            stroke={`rgba(62,181,167,${l.op})`} strokeWidth="0.5"
          />
        ))}
        {particles.map((p, i) => {
          const dx = p.x - cursor.x, dy = p.y - cursor.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const glow = Math.max(0, 1 - dist / 28)
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
          return (
            <circle key={i}
              cx={`${p.x}%`} cy={`${p.y}%`}
              r={p.r + glow * 2.2}
              fill={`rgba(62,181,167,${0.18 + glow * 0.42 + Math.min(speed * 2.5, 0.18)})`}
            />
          )
        })}
        <circle
          cx={`${cursor.x}%`} cy={`${cursor.y}%`} r="4%"
          fill="none" stroke="rgba(62,181,167,0.1)" strokeWidth="0.5" strokeDasharray="5 7"
          style={{ transition: 'cx 0.05s, cy 0.05s' }}
        />
      </svg>
    </div>
  )
}

function ContentHero() {
  return (
    <section className="relative bg-navy-900 overflow-hidden" style={{ minHeight: '380px' }}>
      <VortexCanvas />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="font-syne text-teal text-xs font-semibold tracking-widest uppercase block mb-5">Insights</span>
          <h1
            className="font-barlow font-light text-white"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 0.9 }}
          >
            Market Insights.
          </h1>
          <p className="font-inter text-white/45 mt-5 max-w-md" style={{ fontSize: '0.95rem', lineHeight: 1.7 }}>
            Analysis and market commentary from the Blackstone Islamic research desk.
          </p>
          <div className="flex items-center gap-6 mt-8">
            <span className="font-inter text-white/35 text-xs">6 Articles</span>
            <span className="font-inter text-white/20 text-xs">·</span>
            <span className="font-inter text-white/35 text-xs">PSX · Islamic Finance · Macro</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function Content() {
  return (
    <main className="pb-20">
      <ContentHero />

      <section className="section-pad max-w-7xl mx-auto">
        {/* Featured */}
        <AnimatedSection>
          <article className="gs-card grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden mb-5">
            <div className="p-10 lg:p-14 flex flex-col justify-between gap-8">
              <div>
                <span className="t-label block mb-5">{featured.category} — Featured</span>
                <h2 className="font-barlow font-light text-navy-900 leading-tight mb-5" style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)', lineHeight: 0.95 }}>
                  {featured.title}
                </h2>
                <p className="t-body" style={{ lineHeight: '1.85', fontSize: '0.88rem' }}>{featured.excerpt}</p>
              </div>
              <div>
                <div className="flex items-center gap-5 text-xs font-inter text-slate-400 mb-6">
                  <span className="flex items-center gap-1"><User size={10} aria-hidden="true" /> {featured.author}</span>
                  <span className="flex items-center gap-1"><Calendar size={10} aria-hidden="true" /> {featured.date}</span>
                </div>
                <button className="btn-primary text-xs">Read Article <ArrowRight size={12} aria-hidden="true" /></button>
              </div>
            </div>
            <div className="hidden lg:flex items-end justify-end p-10 min-h-[320px] relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #0B1624 0%, #073985 100%)' }}
            >
              <span
                className="absolute inset-0 flex items-center justify-center font-barlow font-light text-white/5 pointer-events-none select-none"
                style={{ fontSize: '14rem', lineHeight: 1 }}
                aria-hidden="true"
              >
                01
              </span>
              <span className="font-syne text-teal/60 relative z-10" style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}>FEATURED ANALYSIS</span>
            </div>
          </article>
        </AnimatedSection>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((a, i) => (
            <AnimatedSection key={a.title} delay={i * 0.07}>
              <GlassCard className="h-full flex flex-col group">
                <span className="t-label mb-4" style={{ fontSize: '0.57rem' }}>{a.category}</span>
                <h3 className="font-barlow font-light text-navy-900 leading-snug flex-1 mb-4" style={{ fontSize: '1.25rem', lineHeight: 1.1 }}>{a.title}</h3>
                <p className="t-body mb-5" style={{ fontSize: '0.78rem', lineHeight: '1.7' }}>{a.excerpt}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-xs font-inter text-slate-400">
                    <span className="flex items-center gap-1"><User size={9} aria-hidden="true" /> {a.author}</span>
                    <span className="flex items-center gap-1"><Calendar size={9} aria-hidden="true" /> {a.date}</span>
                  </div>
                  <ArrowRight size={12} className="text-slate-300 group-hover:text-teal group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
                </div>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </main>
  )
}
