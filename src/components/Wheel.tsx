import React, { useMemo, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import useSpinWheel from '../hooks/useSpinWheel'
import { FOODS } from '../utils/constants'
import { Food } from '../types'

const COLORS = ['#FFADAD','#FFD6A5','#FDFFB6','#CAFFBF','#9BF6FF','#BDB2FF']

export default function Wheel({ onResult }: { onResult: (food: Food) => void }) {
  const segments = FOODS.length
  const radius = 160
  const center = radius
  const { spinning, startSpin } = useSpinWheel()
  const controls = useAnimation()
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)

  const segmentAngle = 360 / segments

  const handleSpin = async () => {
    if (spinning) return
    const res = await startSpin(segments)
    if (!res) return
    // animate wheel rotation
    await controls.start({ rotate: res.finalDegree }, { duration: res.duration, ease: [0.22, 1, 0.36, 1] })
    // compute final index normalized
    const target = ((res.targetIndex % segments) + segments) % segments
    const food = FOODS[target]
    setCurrentIndex(target)
    onResult(food)
  }

  const slices = useMemo(() => FOODS.map((f, i) => {
    const start = i * segmentAngle
    const end = start + segmentAngle
    const largeArc = segmentAngle > 180 ? 1 : 0
    const x1 = center + radius * Math.cos((Math.PI/180) * start)
    const y1 = center + radius * Math.sin((Math.PI/180) * start)
    const x2 = center + radius * Math.cos((Math.PI/180) * end)
    const y2 = center + radius * Math.sin((Math.PI/180) * end)
    const path = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`
    return { path, color: COLORS[i % COLORS.length], label: f.name }
  }), [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{ position: 'relative', width: radius * 2, height: radius * 2 }}>
        <motion.svg viewBox={`0 0 ${radius*2} ${radius*2}`} style={{ width: '100%', height: '100%' }} animate={controls} initial={{ rotate: 0 }}>
          {slices.map((s, i) => (
            <path key={i} d={s.path} fill={s.color} stroke="#fff" strokeWidth={2} />
          ))}
          {slices.map((s, i) => {
            const angle = (i * segmentAngle) + segmentAngle/2 - 90
            const x = center + Math.cos((Math.PI/180)*angle) * (radius * 0.6)
            const y = center + Math.sin((Math.PI/180)*angle) * (radius * 0.6)
            return (
              <text key={`t-${i}`} x={x} y={y} fill="#222" fontSize={12} textAnchor="middle" dominantBaseline="middle" style={{ pointerEvents: 'none' }}>{FOODS[i].name}</text>
            )
          })}
        </motion.svg>
        <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '12px solid transparent', borderRight: '12px solid transparent', borderBottom: '18px solid #111' }} />
      </div>
      <div style={{ display:'flex', gap:12 }}>
        <button onClick={handleSpin} style={{ padding: '10px 16px', background: '#0ea5a4', color: 'white', border: 'none', borderRadius: 8 }}>Quay ngay</button>
      </div>
    </div>
  )
}
