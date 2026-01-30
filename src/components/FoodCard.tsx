import React from 'react'
import { Food } from '../types'
import { motion } from 'framer-motion'

export default function FoodCard({ food }: { food: Food }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ display: 'flex', gap: 12, alignItems: 'center' }}
    >
      <img src={food.image.replace('/public', '')} alt={food.name} width={96} height={72} style={{ borderRadius: 8 }} />
      <div>
        <div style={{ fontWeight: 700 }}>{food.name}</div>
        <div style={{ fontSize: 12, color: '#666' }}>{food.description}</div>
      </div>
    </motion.div>
  )
}
