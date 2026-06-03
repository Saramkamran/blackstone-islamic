import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function SectionHeading({ label, title, className = '', align = 'left' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isCenter = align === 'center'

  return (
    <div ref={ref} className={`${isCenter ? 'text-center' : ''} ${className}`}>
      <motion.span
        aria-hidden="true"
        className="rule-navy block mb-5"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        style={{
          transformOrigin: isCenter ? 'center' : 'left',
          maxWidth: isCenter ? '3rem' : '100%',
          ...(isCenter ? { margin: '0 auto 1.25rem' } : {}),
        }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      />

      {label && (
        <motion.p
          className="t-label mb-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          {label}
        </motion.p>
      )}

      <motion.h2
        className="t-heading"
        initial={{ opacity: 0, y: 22 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        dangerouslySetInnerHTML={{ __html: title }}
      />
    </div>
  )
}
