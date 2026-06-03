import { Link } from 'react-router-dom'
import { Linkedin, Twitter, Mail, MapPin, ArrowRight } from 'lucide-react'

const pages = [
  { label: 'Home',     href: '/' },
  { label: 'Report',   href: '/report' },
  { label: 'Intel',    href: '/intel' },
  { label: 'Content',  href: '/content' },
  { label: 'Client',   href: '/client' },
]

const advisory = [
  { label: 'Global Equities',   href: '/advisory#equities' },
  { label: 'Asset Management',  href: '/advisory#asset-management' },
  { label: 'Global M&A',        href: '/advisory#ma' },
  { label: 'Global IPO',        href: '/advisory#ipo' },
]

export default function Footer() {
  return (
    <footer>
      {/* Pre-footer CTA band */}
      <div
        className="border-t border-slate-200 py-14 px-6 md:px-10"
        style={{ background: 'linear-gradient(135deg, #0B1624 0%, #073985 100%)' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="font-syne text-teal text-xs font-semibold tracking-widest uppercase mb-3">Start investing</p>
            <h3 className="font-barlow font-light text-white" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: 0.93 }}>
              Ready to invest with purpose?
            </h3>
          </div>
          <Link
            to="/advisory"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/25 text-white font-syne font-semibold text-xs tracking-widest uppercase hover:border-teal hover:text-teal transition-colors shrink-0"
          >
            Explore Advisory <ArrowRight size={13} aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-navy-950 border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-5">
              <div className="font-cormorant font-light italic text-white" style={{ fontSize: '1.4rem' }}>Blackstone</div>
              <div className="font-syne font-semibold text-teal uppercase" style={{ fontSize: '0.5rem', letterSpacing: '0.35em' }}>Islamic</div>
            </div>
            <p className="font-inter text-white/35 leading-relaxed" style={{ fontSize: '0.8rem', lineHeight: '1.7' }}>
              Shariah-compliant capital markets<br />for Pakistan's institutional investors.
            </p>
            <div className="flex gap-3 mt-7">
              {[
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Twitter,  label: 'X / Twitter' },
                { icon: Mail,     label: 'Email', href: 'mailto:info@blackstoneislamic.com' },
              ].map(({ icon: Icon, label, href = '#' }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center border border-white/12 text-white/30 hover:text-teal hover:border-teal transition-colors"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4 className="font-syne text-white/30 text-xs font-semibold tracking-widest uppercase mb-5">Pages</h4>
            <ul className="flex flex-col gap-3">
              {pages.map((p) => (
                <li key={p.href}>
                  <Link to={p.href} className="font-inter text-xs text-white/40 hover:text-white transition-colors">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Advisory */}
          <div>
            <h4 className="font-syne text-white/30 text-xs font-semibold tracking-widest uppercase mb-5">Advisory</h4>
            <ul className="flex flex-col gap-3">
              {advisory.map((a) => (
                <li key={a.href}>
                  <Link to={a.href} className="font-inter text-xs text-white/40 hover:text-white transition-colors">
                    {a.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices */}
          <div>
            <h4 className="font-syne text-white/30 text-xs font-semibold tracking-widest uppercase mb-5">Offices</h4>
            <div className="flex flex-col gap-6">
              {[
                { city: 'Lahore, Pakistan', sub: 'Pakistan Stock Exchange — PSX', icon: MapPin },
                { city: 'London, United Kingdom', sub: 'FCA Authorised', icon: MapPin },
              ].map(({ city, sub, icon: Icon }) => (
                <div key={city} className="flex gap-3">
                  <Icon size={13} className="text-teal mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-inter text-xs font-medium text-white/60">{city}</p>
                    <p className="font-inter text-xs text-white/25 mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 px-6 md:px-10 py-5 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <span className="font-inter text-xs text-white/25">© 2025 Blackstone Islamic. All rights reserved.</span>
          <span className="flex flex-wrap justify-center gap-5 font-inter text-xs text-white/20">
            <span>SECP Regulated (Pakistan)</span>
            <span>·</span>
            <span>FCA Authorised (UK)</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
