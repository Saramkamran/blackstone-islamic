import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'

const advisoryLinks = [
  { label: 'Global Equities',   href: '/advisory#equities' },
  { label: 'Asset Management',  href: '/advisory#asset-management' },
  { label: 'Global M&A',        href: '/advisory#ma' },
  { label: 'Global IPO',        href: '/advisory#ipo' },
]

const navLinks = [
  { label: 'Home',     href: '/' },
  { label: 'Report',   href: '/report' },
  { label: 'Intel',    href: '/intel' },
  { label: 'Advisory', href: '/advisory', dropdown: advisoryLinks },
  { label: 'Client',   href: '/client' },
  { label: 'Content',  href: '/content' },
]

function NavLink({ href, children, active }) {
  return (
    <Link
      to={href}
      className={`relative px-3 py-2 text-xs font-syne font-medium tracking-widest uppercase transition-colors duration-200 group ${
        active ? 'text-white' : 'text-white/50 hover:text-white'
      }`}
    >
      {children}
      <span
        className="absolute bottom-0 left-3 right-3 h-px bg-teal scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
        aria-hidden="true"
      />
      {active && (
        <span className="absolute bottom-0 left-3 right-3 h-px bg-teal" aria-hidden="true" />
      )}
    </Link>
  )
}

export default function Navbar() {
  const [hidden, setHidden]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobile] = useState(false)
  const [dropOpen, setDrop]     = useState(false)
  const dropRef                 = useRef(null)
  const dropTriggerRef          = useRef(null)
  const { scrollY }             = useScroll()
  const location                = useLocation()
  const isHome                  = location.pathname === '/'

  useMotionValueEvent(scrollY, 'change', (cur) => {
    const prev = scrollY.getPrevious()
    setHidden(cur > prev && cur > 80)
    setScrolled(cur > 20)
  })

  useEffect(() => { setMobile(false); setDrop(false) }, [location])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { setDrop(false); dropTriggerRef.current?.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const onClick = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDrop(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const showSolid = scrolled || !isHome

  return (
    <motion.header
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.28, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showSolid
          ? 'bg-navy-950/95 backdrop-blur-md border-b border-white/8'
          : 'bg-transparent'
      }`}
      style={{ '--tw-bg-opacity': 1 }}
    >
      <nav
        className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-5"
        aria-label="Main navigation"
      >
        {/* Logo — previous Cormorant + Syne style */}
        <Link to="/" className="flex flex-col leading-none group" aria-label="Blackstone Islamic — Home">
          <span className="font-cormorant font-light italic text-white tracking-wide" style={{ fontSize: '1.2rem' }}>
            Blackstone
          </span>
          <span className="font-syne font-semibold text-teal uppercase" style={{ fontSize: '0.55rem', letterSpacing: '0.35em' }}>
            Islamic
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-0" role="menubar">
          {navLinks.map((link) =>
            link.dropdown ? (
              <li key={link.href} role="none" ref={dropRef} className="relative">
                <button
                  ref={dropTriggerRef}
                  role="menuitem"
                  aria-haspopup="true"
                  aria-expanded={dropOpen}
                  onClick={() => setDrop(v => !v)}
                  onMouseEnter={() => setDrop(true)}
                  className="flex items-center gap-1 px-3 py-2 text-xs font-syne font-medium tracking-widest uppercase text-white/50 hover:text-white transition-colors"
                >
                  {link.label}
                  <motion.span animate={{ rotate: dropOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={12} aria-hidden="true" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {dropOpen && (
                    <motion.div
                      role="menu"
                      aria-label="Advisory services"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.16 }}
                      onMouseLeave={() => setDrop(false)}
                      className="absolute top-full left-0 mt-2 w-60 bg-navy-900 border border-white/10 overflow-hidden shadow-2xl shadow-black/40"
                    >
                      {link.dropdown.map((d) => (
                        <Link
                          key={d.href}
                          to={d.href}
                          role="menuitem"
                          tabIndex={0}
                          className="block px-5 py-3.5 text-xs font-syne text-white/50 hover:text-white hover:bg-white/5 transition-colors border-b border-white/8 last:border-0"
                          onKeyDown={(e) => {
                            if (e.key === 'ArrowDown') { e.preventDefault(); e.currentTarget.nextElementSibling?.focus() }
                            if (e.key === 'ArrowUp')   { e.preventDefault(); e.currentTarget.previousElementSibling?.focus() }
                          }}
                        >
                          {d.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={link.href} role="none">
                <NavLink href={link.href} active={location.pathname === link.href}>
                  {link.label}
                </NavLink>
              </li>
            )
          )}
        </ul>

        {/* Right CTA + mobile toggle */}
        <div className="flex items-center gap-4">
          <Link
            to="/client"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 text-white font-syne font-semibold text-xs tracking-widest uppercase hover:border-teal hover:text-teal transition-colors"
            aria-label="Client login portal"
          >
            Client Login
          </Link>
          <button
            onClick={() => setMobile(v => !v)}
            className="md:hidden p-1.5 text-white/60 hover:text-white transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy-950 border-t border-white/10 overflow-hidden"
          >
            <ul className="px-6 py-6 flex flex-col gap-1" role="menu">
              {navLinks.map((link) => (
                <li key={link.href} role="none">
                  <Link
                    to={link.href}
                    role="menuitem"
                    className="block px-2 py-3.5 text-xs font-syne font-medium tracking-widest uppercase text-white/50 hover:text-white transition-colors border-b border-white/8"
                  >
                    {link.label}
                  </Link>
                  {link.dropdown && (
                    <ul className="ml-4 pb-2">
                      {link.dropdown.map((d) => (
                        <li key={d.href}>
                          <Link
                            to={d.href}
                            className="block py-2 text-xs font-syne text-white/30 hover:text-teal transition-colors"
                            role="menuitem"
                          >
                            — {d.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              <li className="pt-4">
                <Link to="/client" className="btn-primary text-center justify-center w-full">
                  Client Login
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
