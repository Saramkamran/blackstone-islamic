import { motion } from 'framer-motion'

export default function GlassCard({ children, className = '', hover = true }) {
  return (
    <motion.div
      className={`gs-card p-6 relative overflow-hidden ${className}`}
      whileHover={hover ? { boxShadow: '0 8px 32px rgba(9,74,171,0.09)' } : {}}
      transition={{ duration: 0.2 }}
    >
      {/* Teal left border grows on hover */}
      {hover && (
        <motion.div
          className="absolute left-0 top-0 bottom-0 bg-teal"
          style={{ width: '2px', scaleY: 0, transformOrigin: 'top', originY: 0 }}
          whileHover={{ scaleY: 1 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          aria-hidden="true"
        />
      )}
      {children}
    </motion.div>
  )
}
