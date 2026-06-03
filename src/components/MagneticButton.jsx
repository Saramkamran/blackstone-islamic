import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function MagneticButton({ children, className = '', as: Tag = 'button', href, to, ...props }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const onMove = (e) => {
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    setPos({
      x: (e.clientX - left - width / 2) * 0.28,
      y: (e.clientY - top - height / 2) * 0.28,
    })
  }

  const onLeave = () => setPos({ x: 0, y: 0 })

  const spring = { type: 'spring', stiffness: 180, damping: 14, mass: 0.1 }

  // Support Link from react-router-dom by forwarding to prop
  const Component = motion[Tag] ?? motion.button

  return (
    <Component
      ref={ref}
      animate={{ x: pos.x, y: pos.y }}
      transition={spring}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      {...(href ? { href } : {})}
      {...props}
    >
      {children}
    </Component>
  )
}
