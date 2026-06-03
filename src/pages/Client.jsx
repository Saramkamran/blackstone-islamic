import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, BarChart2, FileText, History, MessageSquare, Shield, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import GlassCard from '../components/GlassCard'
import AnimatedSection from '../components/AnimatedSection'
import SectionHeading from '../components/SectionHeading'
import MagneticButton from '../components/MagneticButton'

const features = [
  { icon: BarChart2,     title: 'Portfolio Analytics', desc: 'Real-time performance dashboards, attribution analysis, and Shariah compliance reports.' },
  { icon: FileText,      title: 'Document Vault',      desc: 'Secure access to contract notes, statements, and regulatory documentation.' },
  { icon: History,       title: 'Trade History',       desc: 'Full trade history with Shariah screening status and settlement records.' },
  { icon: MessageSquare, title: 'Advisor Access',      desc: 'Direct secure messaging with your dedicated Blackstone Islamic advisor.' },
]

function ScannerCanvas() {
  const ref = useRef(null)
  const cursorRef = useRef({ x: 50, y: 50 })
  const [tick, setTick] = useState(0)

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
    el.addEventListener('mousemove', onMove)
    const interval = setInterval(() => setTick(t => (t + 1) % 200), 28)
    return () => { el.removeEventListener('mousemove', onMove); clearInterval(interval) }
  }, [])

  const cursor = cursorRef.current
  const scanY = (tick / 200) * 100

  const cols = 20, rows = 9
  const dots = Array.from({ length: cols * rows }, (_, i) => ({
    x: ((i % cols) + 0.5) / cols * 100,
    y: (Math.floor(i / cols) + 0.5) / rows * 100,
  }))

  return (
    <div ref={ref} className="absolute inset-0" aria-hidden="true">
      <svg width="100%" height="100%">
        <defs>
          <linearGradient id="scanBeam" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(62,181,167,0)" />
            <stop offset="50%" stopColor="rgba(62,181,167,0.18)" />
            <stop offset="100%" stopColor="rgba(62,181,167,0)" />
          </linearGradient>
        </defs>
        <rect x="0" y={`${Math.max(0, scanY - 4)}%`} width="100%" height="8%"
          fill="url(#scanBeam)" />
        <line x1="0" y1={`${scanY}%`} x2="100%" y2={`${scanY}%`}
          stroke="rgba(62,181,167,0.22)" strokeWidth="0.5" />
        {dots.map((d, i) => {
          const distToCursor = Math.sqrt((d.x - cursor.x) ** 2 + (d.y - cursor.y) ** 2)
          const cursorGlow = Math.max(0, 1 - distToCursor / 15)
          const scanGlow = Math.max(0, 1 - Math.abs(d.y - scanY) / 6)
          const opacity = 0.1 + cursorGlow * 0.55 + scanGlow * 0.3
          const r = 0.8 + cursorGlow * 2 + scanGlow * 0.7
          return (
            <circle key={i} cx={`${d.x}%`} cy={`${d.y}%`}
              r={r} fill={`rgba(62,181,167,${opacity})`} />
          )
        })}
        <circle cx={`${cursor.x}%`} cy={`${cursor.y}%`} r="5%"
          fill="rgba(62,181,167,0.04)" stroke="rgba(62,181,167,0.1)" strokeWidth="0.5"
          style={{ transition: 'cx 0.05s, cy 0.05s' }} />
      </svg>
    </div>
  )
}

function ClientHero() {
  return (
    <section className="relative bg-navy-900 overflow-hidden" style={{ minHeight: '380px' }}>
      <ScannerCanvas />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-flex items-center justify-center w-12 h-12 border border-teal/30 mb-6"
          >
            <Lock size={18} className="text-teal" />
          </motion.div>
          <span className="font-syne text-teal text-xs font-semibold tracking-widest uppercase block mb-5">Secure Portal</span>
          <h1
            className="font-barlow font-light text-white"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 0.9 }}
          >
            Your Portfolio,<br />
            <em className="not-italic text-teal">Secured.</em>
          </h1>
          <p className="font-inter text-white/45 mt-5 mx-auto max-w-sm" style={{ fontSize: '0.95rem', lineHeight: 1.7 }}>
            Existing Blackstone Islamic clients access their portfolio, documents, and advisor communications.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default function Client() {
  return (
    <main className="pb-20">
      <ClientHero />

      {/* Login CTA */}
      <section className="section-pad max-w-2xl mx-auto text-center">
        <AnimatedSection>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton className="btn-primary">
              <Lock size={13} aria-hidden="true" /> Log In to Portal
            </MagneticButton>
            <Link to="/advisory" className="btn-ghost flex items-center gap-2 justify-center">
              Become a Client <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
        </AnimatedSection>
      </section>

      {/* Features */}
      <section className="section-pad bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <SectionHeading label="Portal Features" title="Everything you need." align="center" />
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.1}>
                <GlassCard className="flex flex-col items-start gap-4 h-full group">
                  <div className="w-10 h-10 flex items-center justify-center border border-slate-200 group-hover:border-teal transition-colors">
                    <f.icon size={16} className="text-teal" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-inter font-semibold text-navy-900 text-sm mb-1">{f.title}</h3>
                    <p className="t-body" style={{ fontSize: '0.78rem', lineHeight: '1.7' }}>{f.desc}</p>
                  </div>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="section-pad max-w-2xl mx-auto text-center">
        <AnimatedSection>
          <div className="inline-flex items-center justify-center w-12 h-12 border border-teal/30 mb-6">
            <Shield size={20} className="text-teal" aria-hidden="true" />
          </div>
          <h3 className="font-barlow font-light text-navy-900 mb-4" style={{ fontSize: '2.2rem', lineHeight: 0.95 }}>Bank-Grade Security.</h3>
          <p className="t-body" style={{ fontSize: '0.82rem', lineHeight: '1.85' }}>
            All client data is encrypted in transit and at rest. Our portal infrastructure meets FCA and SECP data security requirements. Two-factor authentication is mandatory for all client accounts.
          </p>
          <div className="flex items-center justify-center gap-8 mt-10 pt-8 border-t border-slate-200">
            {['FCA Authorised', 'SECP Regulated', '256-bit AES', '2FA Required'].map((badge) => (
              <span key={badge} className="font-inter text-slate-400 text-xs">{badge}</span>
            ))}
          </div>
        </AnimatedSection>
      </section>
    </main>
  )
}
