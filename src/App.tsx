import React, { useState, useCallback, useRef, useEffect } from 'react';
import { FOOD_ITEMS, SOUNDS } from './constants';
import { triggerConfetti } from './utils';
import Wheel from './components/Wheel';
import ResultCard from './components/ResultCard';
import { FoodItem } from './types';

const App: React.FC = () => {
  const [rotation, setRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [winner, setWinner] = useState<FoodItem | null>(null);

  const spinAudioRef = useRef<HTMLAudioElement | null>(null);
  const winAudioRef = useRef<HTMLAudioElement | null>(null);
  const confettiAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    spinAudioRef.current = new Audio(SOUNDS.SPIN_TUNE);
    spinAudioRef.current.loop = true;
    spinAudioRef.current.volume = 0.5;

    winAudioRef.current = new Audio(SOUNDS.WIN_SFX);
    winAudioRef.current.volume = 0.6;

    confettiAudioRef.current = new Audio(SOUNDS.CONFETTI_SFX);
    confettiAudioRef.current.volume = 0.6;
  }, []);

  const handleSpin = useCallback(() => {
    if (isSpinning) return;

    setWinner(null);
    setIsSpinning(true);

    if (spinAudioRef.current) {
      spinAudioRef.current.currentTime = 0;
      spinAudioRef.current.play().catch(e => console.warn('Audio play blocked:', e));
    }

    const randomAngle = Math.floor(Math.random() * 360);
    const fullSpins = 360 * 5;
    const newRotation = rotation + fullSpins + randomAngle;
    setRotation(newRotation);
  }, [isSpinning, rotation]);

  const handleSpinEnd = useCallback(() => {
    setIsSpinning(false);
    if (spinAudioRef.current) {
      spinAudioRef.current.pause();
      spinAudioRef.current.currentTime = 0;
    }

    if (winAudioRef.current) {
      winAudioRef.current.currentTime = 0;
      winAudioRef.current.play().catch(e => console.warn('Audio play blocked:', e));
    }

    setTimeout(() => {
      triggerConfetti();
      if (confettiAudioRef.current) {
        confettiAudioRef.current.currentTime = 0;
        confettiAudioRef.current.play().catch(e => console.warn('Audio play blocked:', e));
      }
    }, 150);

    const actualRotation = rotation % 360;
    const degreesPerSlice = 360 / FOOD_ITEMS.length;
    const pointerAngle = 270;
    const wheelAngleUnderPointer = (pointerAngle - actualRotation + 360) % 360;
    const winningIndex = Math.floor(wheelAngleUnderPointer / degreesPerSlice);
    const safeIndex = Math.max(0, Math.min(winningIndex, FOOD_ITEMS.length - 1));
    setWinner(FOOD_ITEMS[safeIndex]);

  }, [rotation]);

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-vn-red drop-shadow-sm mb-2">
          Hôm Nay Ăn Gì?
        </h1>
        <p className="text-gray-600 font-medium text-lg">
          Trưa nay không biết ăn gì? Để vũ trụ quyết định!
        </p>
      </header>

      <main className="flex flex-col items-center w-full max-w-4xl gap-8">
        <div className="scale-75 md:scale-100 transform transition-transform duration-300">
          <Wheel 
            items={FOOD_ITEMS} 
            rotation={rotation} 
            isSpinning={isSpinning} 
            onTransitionEnd={handleSpinEnd}
          />
        </div>

        {!winner && (
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className={`
              mt-4 px-12 py-4 rounded-full text-2xl font-bold text-white shadow-lg transition-all transform
              ${isSpinning 
                ? 'bg-gray-400 cursor-not-allowed scale-95 opacity-80' 
                : 'bg-gradient-to-r from-vn-red to-orange-500 hover:scale-105 hover:shadow-orange-500/50 active:scale-95'
              }
            `}
          >
            {isSpinning ? 'Đang quay...' : 'QUAY NGAY!'}
          </button>
        )}

        <ResultCard winner={winner} onReset={handleSpin} />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 w-full max-w-2xl">
          {FOOD_ITEMS.map((item) => (
            <div 
              key={item.id} 
              className={`flex items-center space-x-2 p-3 rounded-lg bg-white shadow-sm border border-orange-50 transition-opacity ${winner && winner.id !== item.id ? 'opacity-40' : 'opacity-100'}`}
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs text-white font-bold"
                style={{ backgroundColor: item.color, color: item.textColor }}
              >
                {item.icon}
              </div>
              <span className="font-medium text-gray-700">{item.name}</span>
            </div>
          ))}
        </div>
      </main>

      <footer className="mt-16 text-gray-400 text-sm font-medium">
        Made with ❤️ for Vietnamese Food Lovers
      </footer>
    </div>
  );
};

export default App;

