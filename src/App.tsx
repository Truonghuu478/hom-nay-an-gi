import React, { useState } from 'react'
import Header from './components/Header'
import Wheel from './components/Wheel'
import ResultModal from './components/ResultModal'
import { FOODS } from './utils/constants'
import { Food } from './types'

export default function App() {
  const [result, setResult] = useState<Food | null>(null)

  return (
    <div className="app-container">
      <Header />
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', justifyContent: 'center', flexWrap: 'wrap' }}>
        <div style={{ width: 360 }}>
          <Wheel onResult={(f) => setResult(f)} />
        </div>
        <div style={{ width: 360 }}>
          <h3>Danh sách món</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            {FOODS.map((f) => (
              <div key={f.id} style={{ padding: 12, background: 'var(--card)', borderRadius: 8, boxShadow: '0 6px 18px rgba(13, 27, 53, 0.06)' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <img src={f.image.replace('/public', '')} alt={f.name} width={80} height={60} style={{ borderRadius: 8 }} />
                  <div>
                    <div style={{ fontWeight: 700 }}>{f.name}</div>
                    <div style={{ color: 'var(--muted)', fontSize: 13 }}>{f.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ResultModal food={result} onClose={() => setResult(null)} onSpinAgain={() => setResult(null)} />
    </div>
  )
}
