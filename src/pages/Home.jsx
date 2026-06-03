import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Globe, BarChart3 } from 'lucide-react'
import { motion } from 'framer-motion'
import InteractiveHero from '../components/InteractiveHero'
import StatsBar from '../components/StatsBar'
import AnimatedSection from '../components/AnimatedSection'
import SectionHeading from '../components/SectionHeading'

const services = [
  { num: '01', label: 'Global Equities',   href: '/advisory#equities',         desc: 'Shariah-screened equity research and execution across PSX and international markets.' },
  { num: '02', label: 'Asset Management',  href: '/advisory#asset-management', desc: 'Tailored portfolio construction — sukuk, equity funds, and Shariah-compliant alternatives.' },
  { num: '03', label: 'Global M&A',        href: '/advisory#ma',               desc: 'Cross-border mergers and acquisition advisory with full Shariah compliance structuring.' },
  { num: '04', label: 'Global IPO',        href: '/advisory#ipo',              desc: 'Book-running and listing advisory for IPOs on the Pakistan Stock Exchange and the LSE.' },
]

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Shariah-First Approach',
    desc: 'Every instrument is screened before advisory — not as an afterthought. We apply AAOIFI standards with full documentation for every mandate.',
  },
  {
    icon: Globe,
    title: 'Two Regulated Jurisdictions',
    desc: 'SECP-regulated in Lahore. FCA-authorised in London. Dual regulation unlocks cross-border capital flows that single-jurisdiction firms cannot access.',
  },
  {
    icon: BarChart3,
    title: 'Institutional-Grade Research',
    desc: 'Our research desk covers the KSE-100 with the rigour of an international house — sector deep dives, quantitative screens, and macro overlays.',
  },
]

export default function Home() {
  return (
    <main>
      <InteractiveHero />
      <StatsBar />

      {/* ── Global Presence ───────────────────────── */}
      <section className="section-pad max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <AnimatedSection>
            <SectionHeading
              label="Our Presence"
              title="Two cities.<br/>One mission."
            />
          </AnimatedSection>

          <AnimatedSection delay={0.15} variant="slide-right">
            <p className="t-body mb-10" style={{ fontSize: '0.95rem', lineHeight: '1.85' }}>
              Founded in Lahore, Pakistan's financial capital, with a regulated presence in London.
              Two offices. One mission: make Shariah-compliant investing accessible at institutional scale — on the Pakistan Stock Exchange and beyond.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-slate-200">
              {[
                { city: 'Lahore', country: 'Pakistan', sub: 'PSX — KSE-100', badge: 'SECP Regulated' },
                { city: 'London', country: 'United Kingdom', sub: 'Cross-border access', badge: 'FCA Authorised' },
              ].map((o, i) => (
                <div key={o.city} className={`p-8 group hover:bg-slate-50 transition-colors ${i === 0 ? 'border-b sm:border-b-0 sm:border-r border-slate-200' : ''}`}>
                  <p className="t-label mb-3">{o.country}</p>
                  <h3 className="font-barlow font-light text-navy-900 mb-1 group-hover:text-navy-600 transition-colors" style={{ fontSize: '2.2rem', lineHeight: 1 }}>{o.city}</h3>
                  <p className="t-body" style={{ fontSize: '0.78rem' }}>{o.sub}</p>
                  <div className="mt-5 pt-5 border-t border-slate-100 flex items-center gap-2">
                    <span className="block w-1.5 h-1.5 rounded-full bg-teal" aria-hidden="true" />
                    <span className="font-inter text-teal text-xs font-semibold">{o.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Advisory Services (numbered list) ────── */}
      <section className="section-pad bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <SectionHeading label="Advisory" title="How we can help." />
          </AnimatedSection>

          <div className="mt-16">
            {services.map((s, i) => (
              <AnimatedSection key={s.num} delay={i * 0.07}>
                <Link
                  to={s.href}
                  className="service-row group"
                  aria-label={s.label}
                >
                  <span className="font-barlow font-light text-navy-400/50 group-hover:text-teal transition-colors" style={{ fontSize: '0.9rem', lineHeight: 1 }}>
                    {s.num}
                  </span>
                  <div>
                    <p className="font-inter font-semibold text-navy-900 text-sm mb-1 group-hover:text-navy-600 transition-colors">{s.label}</p>
                    <p className="t-body" style={{ fontSize: '0.78rem' }}>{s.desc}</p>
                  </div>
                  <motion.div
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight
                      size={16}
                      className="text-slate-300 group-hover:text-teal transition-colors shrink-0"
                      aria-hidden="true"
                    />
                  </motion.div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Blackstone Islamic ─────────────────── */}
      <section className="section-pad max-w-7xl mx-auto">
        <AnimatedSection>
          <SectionHeading label="Why Us" title="Built differently." />
        </AnimatedSection>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-0 border border-slate-200">
          {pillars.map((p, i) => (
            <AnimatedSection key={p.title} delay={i * 0.1}>
              <div className={`p-8 h-full group hover:bg-slate-50 transition-colors ${i < 2 ? 'md:border-r border-b md:border-b-0 border-slate-200' : ''}`}>
                <div className="w-10 h-10 flex items-center justify-center border border-slate-200 mb-6 group-hover:border-teal transition-colors">
                  <p.icon size={16} className="text-teal" aria-hidden="true" />
                </div>
                <h3 className="font-inter font-semibold text-navy-900 mb-3">{p.title}</h3>
                <p className="t-body" style={{ fontSize: '0.82rem', lineHeight: '1.8' }}>{p.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ── Pull quote (navy contrast) ───────────── */}
      <section className="section-pad bg-navy-900">
        <AnimatedSection variant="fade-in" className="max-w-4xl mx-auto text-center">
          <span className="font-syne text-teal text-xs font-semibold tracking-widest uppercase block mb-10">Our Standard</span>
          <blockquote
            className="font-barlow font-light text-white leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', lineHeight: 0.93 }}
          >
            "Every instrument we advise on passes rigorous Shariah screening — no interest, no ambiguity, no compromise."
          </blockquote>
          <div
            className="mx-auto mt-10 bg-teal"
            style={{ width: '3rem', height: '2px' }}
            aria-hidden="true"
          />
          <p className="font-inter text-white/35 text-xs mt-5">Blackstone Islamic — Research Mandate</p>
        </AnimatedSection>
      </section>

    </main>
  )
}
