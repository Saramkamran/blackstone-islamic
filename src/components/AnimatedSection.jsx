import { motion } from 'framer-motion'

const variants = {
  'fade-up':    { hidden: { opacity: 0, y: 36 },  visible: { opacity: 1, y: 0 } },
  'fade-in':    { hidden: { opacity: 0 },          visible: { opacity: 1 } },
  'slide-left': { hidden: { opacity: 0, x: -32 },  visible: { opacity: 1, x: 0 } },
  'slide-right':{ hidden: { opacity: 0, x: 32 },   visible: { opacity: 1, x: 0 } },
  'scale':      { hidden: { opacity: 0, scale: 0.96 }, visible: { opacity: 1, scale: 1 } },
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  variant = 'fade-up',
}) {
  const v = variants[variant] ?? variants['fade-up']
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-72px' }}
      variants={v}
      transition={{ duration: 0.72, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
