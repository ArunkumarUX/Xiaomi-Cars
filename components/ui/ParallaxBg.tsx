'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxBgProps {
  src: string
  alt?: string
  strength?: number  // default 80
  className?: string
  imgClassName?: string
  children?: React.ReactNode
  style?: React.CSSProperties
}

export default function ParallaxBg({ src, alt = '', strength = 80, className, imgClassName, children, style }: ParallaxBgProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength])

  return (
    <div ref={ref} className={className} style={{ position: 'relative', overflow: 'hidden', ...style }}>
      <motion.div
        style={{ y, position: 'absolute', inset: -strength * 1.5, willChange: 'transform' }}
      >
        <img
          src={src}
          alt={alt}
          className={imgClassName}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          loading="lazy"
        />
      </motion.div>
      {children}
    </div>
  )
}
