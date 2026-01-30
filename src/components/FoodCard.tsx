import React from 'react'
import { Food } from '../types'
import { motion } from 'framer-motion'

function publicPath(p: string){
  // assets in /public should be referenced from root
  return p.replace('/public','')
}

export default function FoodCard({ food }: { food: Food }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36 }}
      className="food-item"
    >
      <img src={publicPath(food.image)} alt={food.name} />
      <div style={{flex:1}}>
        <div style={{ fontWeight: 800 }}>{food.name}</div>
        <div style={{ fontSize: 13, color: 'var(--muted)' }}>{food.description}</div>
      </div>
      <div className="indicator" style={{background: '#ff6933', borderColor: '#ff6933'}} />
    </motion.div>
  )
}
