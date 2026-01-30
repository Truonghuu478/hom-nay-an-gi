import { useCallback, useState } from 'react'

export default function useSpinWheel() {
  const [spinning, setSpinning] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const startSpin = useCallback(async (segments: number) => {
    if (spinning) return null
    setSpinning(true)
    // Randomly pick a target index
    const target = Math.floor(Math.random() * segments)
    // Random extra rotations and degree target
    const extraRotations = 3 + Math.floor(Math.random() * 3) // 3-5 rotations
    const degreesPerSegment = 360 / segments
    // We'll compute a final degree to rotate to (negative for clockwise feel)
    const finalDegree = -(extraRotations * 360 + target * degreesPerSegment + degreesPerSegment / 2)

    // Duration depends on rotations
    const duration = 3 + Math.random() * 2 // 3-5 seconds

    // Return values for the animation consumer
    setSelectedIndex(null)
    return new Promise<{ finalDegree: number; duration: number; targetIndex: number }>((resolve) => {
      // small timeout to allow animation to start in consumer
      setTimeout(() => {
        resolve({ finalDegree, duration, targetIndex: target })
      }, 10)
    }).finally(() => {
      setSpinning(false)
      setSelectedIndex(target)
    })
  }, [spinning])

  return { spinning, selectedIndex, startSpin }
}
