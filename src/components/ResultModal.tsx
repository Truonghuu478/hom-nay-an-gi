import React from 'react'
import Confetti from 'react-confetti'
import { Food } from '../types'
import FoodCard from './FoodCard'
import { motion } from 'framer-motion'

export default function ResultModal({ food, onClose, onSpinAgain }: { food: Food | null; onClose: () => void; onSpinAgain: () => void }) {
  if (!food) return null

  return (
    <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
      <Confetti recycle={false} numberOfPieces={250} />
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }} style={{ background: 'white', padding: 24, borderRadius: 12, width: 360, boxShadow: '0 10px 30px rgba(0,0,0,0.12)' }}>
        <h2 style={{ marginTop: 0 }}>Kết quả:</h2>
        <FoodCard food={food} />
        <div style={{ display: 'flex', gap: 10, marginTop: 16, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '8px 12px' }}>Đóng</button>
          <button onClick={onSpinAgain} style={{ padding: '8px 12px', background: '#0ea5a4', color: 'white', border: 'none', borderRadius: 6 }}>Quay lại</button>
        </div>
      </motion.div>
    </div>
  )
}
