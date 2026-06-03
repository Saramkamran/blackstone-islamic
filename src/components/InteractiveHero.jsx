import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function InteractiveHero() {
  const canvasRef  = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const canvas  = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setSize = () => {
      canvas.width  = section.offsetWidth
      canvas.height = section.offsetHeight
    }
    setSize()

    let particles = []
    let raf = 0

    const count = () => Math.floor((canvas.width * canvas.height) / 6000)

    const make = () => {
      const fadeDelay = Math.random() * 600 + 100
      return {
        x:        Math.random() * canvas.width,
        y:        Math.random() * canvas.height,
        speed:    Math.random() / 5 + 0.1,
        opacity:  0.7,
        fadeDelay,
        fadeStart: Date.now() + fadeDelay,
        fadingOut: false,
      }
    }

    const reset = (p) => {
      p.x         = Math.random() * canvas.width
      p.y         = Math.random() * canvas.height
      p.speed     = Math.random() / 5 + 0.1
      p.opacity   = 0.7
      p.fadeDelay = Math.random() * 600 + 100
      p.fadeStart = Date.now() + p.fadeDelay
      p.fadingOut = false
    }

    const init = () => {
      particles = []
      for (let i = 0; i < count(); i++) particles.push(make())
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        const rdx = p.x - mousePos.x
        const rdy = p.y - mousePos.y
        const rdist = Math.sqrt(rdx * rdx + rdy * rdy)
        if (rdist < 90 && rdist > 0) {
          const force = (90 - rdist) / 90 * 0.55
          p.x += (rdx / rdist) * force
          p.y += (rdy / rdist) * force
        }
        p.y -= p.speed
        if (p.y < 0) reset(p)
        if (!p.fadingOut && Date.now() > p.fadeStart) p.fadingOut = true
        if (p.fadingOut) {
          p.opacity -= 0.008
          if (p.opacity <= 0) reset(p)
        }
        ctx.fillStyle = `rgba(250, 250, 250, ${p.opacity})`
        ctx.fillRect(p.x, p.y, 0.6, Math.random() * 2 + 1)
      })
      raf = requestAnimationFrame(draw)
    }

    const onResize = () => { setSize(); init() }

    let mousePos = { x: -9999, y: -9999 }
    const onMouseMove = (e) => {
      const rect = section.getBoundingClientRect()
      mousePos = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onMouseLeave = () => { mousePos = { x: -9999, y: -9999 } }

    window.addEventListener('resize', onResize)
    section.addEventListener('mousemove', onMouseMove)
    section.addEventListener('mouseleave', onMouseLeave)
    init()
    raf = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', onResize)
      section.removeEventListener('mousemove', onMouseMove)
      section.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden', background: '#0B1624' }}
    >
      <style>{`
        /* Teal accent lines that draw in on mount */
        .bi-hline, .bi-vline {
          position: absolute;
          background: rgba(62, 181, 167, 0.18);
          will-change: transform, opacity;
        }
        .bi-hline {
          height: 1px; left: 0; right: 0;
          transform: scaleX(0);
          transform-origin: 50% 50%;
          animation: bi-drawX 900ms cubic-bezier(.22,.61,.36,1) forwards;
        }
        .bi-hline:nth-child(1) { top: 20%; animation-delay: 200ms; }
        .bi-hline:nth-child(2) { top: 50%; animation-delay: 350ms; }
        .bi-hline:nth-child(3) { top: 80%; animation-delay: 500ms; }
        .bi-vline {
          width: 1px; top: 0; bottom: 0;
          transform: scaleY(0);
          transform-origin: 50% 0%;
          animation: bi-drawY 1000ms cubic-bezier(.22,.61,.36,1) forwards;
        }
        .bi-vline:nth-child(4) { left: 25%; animation-delay: 620ms; }
        .bi-vline:nth-child(5) { left: 50%; animation-delay: 740ms; }
        .bi-vline:nth-child(6) { left: 75%; animation-delay: 860ms; }

        .bi-hline::after, .bi-vline::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(62,181,167,.35), transparent);
          opacity: 0;
          animation: bi-shimmer 900ms ease-out forwards;
        }
        .bi-hline:nth-child(1)::after { animation-delay: 200ms; }
        .bi-hline:nth-child(2)::after { animation-delay: 350ms; }
        .bi-hline:nth-child(3)::after { animation-delay: 500ms; }
        .bi-vline:nth-child(4)::after { animation-delay: 620ms; }
        .bi-vline:nth-child(5)::after { animation-delay: 740ms; }
        .bi-vline:nth-child(6)::after { animation-delay: 860ms; }

        @keyframes bi-drawX {
          0%   { transform: scaleX(0); opacity: 0; }
          60%  { opacity: 1; }
          100% { transform: scaleX(1); opacity: 0.18; }
        }
        @keyframes bi-drawY {
          0%   { transform: scaleY(0); opacity: 0; }
          60%  { opacity: 1; }
          100% { transform: scaleY(1); opacity: 0.18; }
        }
        @keyframes bi-shimmer {
          0%   { opacity: 0; }
          30%  { opacity: .35; }
          100% { opacity: 0; }
        }

        /* Hero content entrance */
        .bi-hero-content {
          opacity: 0;
          transform: translateY(24px);
          animation: bi-rise 900ms cubic-bezier(.25,.1,.25,1) 300ms forwards;
        }
        @keyframes bi-rise {
          to { opacity: 1; transform: translateY(0); }
        }

        /* Market ticker scroll */
        @keyframes bi-ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* CTA buttons */
        .bi-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.75rem;
          background: #ffffff;
          color: #0B1624;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-decoration: none;
          transition: background 0.22s, color 0.22s;
          border: none;
          cursor: pointer;
        }
        .bi-btn-primary:hover { background: #3EB5A7; color: #ffffff; }

        .bi-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.75rem;
          border: 1px solid rgba(255,255,255,0.22);
          color: #ffffff;
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-decoration: none;
          transition: border-color 0.22s, color 0.22s;
          background: transparent;
          cursor: pointer;
        }
        .bi-btn-ghost:hover { border-color: #3EB5A7; color: #3EB5A7; }
      `}</style>

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          mixBlendMode: 'screen',
          opacity: 0.55,
        }}
        aria-hidden="true"
      />

      {/* Animated accent grid lines */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden="true">
        <div className="bi-hline" />
        <div className="bi-hline" />
        <div className="bi-hline" />
        <div className="bi-vline" />
        <div className="bi-vline" />
        <div className="bi-vline" />
      </div>

      {/* Hero body — centred */}
      <div
        className="bi-hero-content"
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          minHeight: '100vh',
          padding: 'clamp(5rem,10vw,8rem) clamp(1.5rem,6vw,6rem) 5rem',
          pointerEvents: 'none',
        }}
      >
        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <span style={{ display: 'block', width: '2rem', height: '1px', background: '#3EB5A7', flexShrink: 0 }} aria-hidden="true" />
          <span style={{ fontFamily: 'Syne, sans-serif', color: '#3EB5A7', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            Shariah-Compliant Capital Markets
          </span>
          <span style={{ display: 'block', width: '2rem', height: '1px', background: '#3EB5A7', flexShrink: 0 }} aria-hidden="true" />
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: 'Barlow Condensed, Arial Narrow, sans-serif',
            fontWeight: 300,
            fontSize: 'clamp(4rem, 9vw, 9rem)',
            lineHeight: 0.88,
            color: '#ffffff',
            margin: '0 0 1.75rem',
            letterSpacing: '-0.01em',
          }}
        >
          Institutional Grade.<br />
          <span style={{ color: '#3EB5A7' }}>Globally Connected.</span>
        </h1>

        {/* Sub-headline */}
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.88rem, 1.6vw, 1rem)', color: 'rgba(255,255,255,0.48)', maxWidth: '28rem', lineHeight: 1.75, marginBottom: '2.5rem' }}>
          Pakistan's leading Shariah-compliant brokerage. Serving institutional investors from Lahore and London.
        </p>

        {/* CTAs — pointer-events restored for buttons */}
        <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', justifyContent: 'center', pointerEvents: 'auto' }}>
          <Link to="/advisory" className="bi-btn-primary">
            Explore Advisory <ArrowRight size={13} aria-hidden="true" />
          </Link>
          <Link to="/report" className="bi-btn-ghost">
            View Reports <ArrowRight size={13} aria-hidden="true" />
          </Link>
        </div>

        {/* Office indicators */}
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '3.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)', width: '100%', maxWidth: '28rem' }}>
          {[
            { label: 'Lahore', sub: 'PSX / SECP' },
            { label: 'London', sub: 'FCA Authorised' },
          ].map((o) => (
            <div key={o.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <span
                style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3EB5A7', marginTop: '4px', flexShrink: 0, animation: 'bi-pulse 2.4s ease-in-out infinite' }}
                aria-hidden="true"
              />
              <div>
                <p style={{ fontFamily: 'Syne, sans-serif', color: '#ffffff', fontSize: '0.72rem', fontWeight: 600, margin: 0 }}>{o.label}</p>
                <p style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(255,255,255,0.32)', fontSize: '0.68rem', margin: 0 }}>{o.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom strip — regulatory + live ticker */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10,
          borderTop: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(11,22,36,0.7)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.75rem clamp(1.5rem,6vw,6rem)',
          gap: '1rem',
          flexWrap: 'wrap',
          overflow: 'hidden',
        }}
      >
        {/* Regulatory badges */}
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexShrink: 0 }}>
          {['SECP Regulated', 'FCA Authorised', 'Shariah-Compliant'].map((b, i) => (
            <span key={b} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {i > 0 && <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>}
              {b}
            </span>
          ))}
        </div>

        {/* Scrolling market ticker */}
        <div style={{ overflow: 'hidden', flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', gap: '3rem', whiteSpace: 'nowrap', animation: 'bi-ticker 30s linear infinite' }}>
            {[
              'KSE-100 · 95,240 ↑0.83%',
              'PKR/USD · 278.50',
              'OGDC · 183.40 ↑1.2%',
              'MEEZAN · 212.80 ↑0.5%',
              'HBL · 166.20 ↓0.3%',
              'LUCK · 1,088 ↑2.1%',
              'PSO · 344.60 ↑0.7%',
              'KSE-100 · 95,240 ↑0.83%',
              'PKR/USD · 278.50',
              'OGDC · 183.40 ↑1.2%',
              'MEEZAN · 212.80 ↑0.5%',
              'HBL · 166.20 ↓0.3%',
              'LUCK · 1,088 ↑2.1%',
              'PSO · 344.60 ↑0.7%',
            ].map((item, i) => (
              <span key={i} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.04em' }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bi-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>
    </section>
  )
}
