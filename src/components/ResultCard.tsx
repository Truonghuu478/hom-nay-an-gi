import React from 'react';
import { FoodItem } from '../types';

interface ResultCardProps {
  winner: FoodItem | null;
  onReset: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ winner, onReset }) => {
  if (!winner) return null;

  return (
    <div className="mt-8 p-6 bg-white rounded-2xl shadow-xl border-2 border-orange-100 animate-bounce-short max-w-md w-full text-center">
      <p className="text-gray-500 uppercase text-xs font-bold tracking-widest mb-2">Trưa nay ăn gì?</p>
      <h2 className="text-3xl md:text-4xl font-black text-vn-red mb-4">
        {winner.name}
      </h2>
      <div className="text-6xl mb-6 animate-pulse-slow">
        {winner.icon}
      </div>
      <button
        onClick={onReset}
        className="px-6 py-2 text-sm font-semibold text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
      >
        Quay lại (Spin Again)
      </button>
    </div>
  );
};

export default ResultCard;
