import React, { useMemo } from 'react';
import { FoodItem } from '../types';
import { WHEEL_SIZE } from '../constants';

interface WheelProps {
  items: FoodItem[];
  rotation: number;
  isSpinning: boolean;
  onTransitionEnd: () => void;
}

const Wheel: React.FC<WheelProps> = ({ items, rotation, isSpinning, onTransitionEnd }) => {
  const radius = WHEEL_SIZE / 2;
  const numSegments = items.length;
  const anglePerSegment = 360 / numSegments;
  
  const createSlicePath = (index: number) => {
    const startAngle = (index * anglePerSegment * Math.PI) / 180;
    const endAngle = ((index + 1) * anglePerSegment * Math.PI) / 180;

    const x1 = radius + radius * Math.cos(startAngle);
    const y1 = radius + radius * Math.sin(startAngle);
    const x2 = radius + radius * Math.cos(endAngle);
    const y2 = radius + radius * Math.sin(endAngle);

    return `M ${radius} ${radius} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
  };

  const wheelSegments = useMemo(() => {
    return items.map((item, index) => {
      const path = createSlicePath(index);
      const midAngle = ((index + 0.5) * anglePerSegment * Math.PI) / 180;
      const textRadius = radius * 0.75; 
      const tx = radius + textRadius * Math.cos(midAngle);
      const ty = radius + textRadius * Math.sin(midAngle);
      const textRotation = (index + 0.5) * anglePerSegment + 90;

      return (
        <g key={item.id}>
          <path d={path} fill={item.color} stroke="white" strokeWidth="2" />
          <g transform={`translate(${tx}, ${ty}) rotate(${textRotation - 90})`}>
             <text
              x="0"
              y="0"
              fill={item.textColor}
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-bold uppercase tracking-wider"
              style={{ fontSize: '14px' }}
            >
              {item.name}
            </text>
            <text
              x="0"
              y="20"
              fill={item.textColor}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{ fontSize: '18px' }}
            >
              {item.icon}
            </text>
          </g>
        </g>
      );
    });
  }, [items, radius, anglePerSegment]);

  return (
    <div className="wheel-container relative flex justify-center items-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-20">
        <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[40px] border-t-vn-red filter drop-shadow-lg"></div>
      </div>

      <div 
        className="rounded-full overflow-hidden border-4 border-white shadow-2xl bg-white"
        style={{
          width: WHEEL_SIZE,
          height: WHEEL_SIZE,
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning ? 'transform 4s cubic-bezier(0.15, 0, 0.20, 1)' : 'none'
        }}
        onTransitionEnd={onTransitionEnd}
      >
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}
        >
          {wheelSegments}
        </svg>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-lg z-10 flex items-center justify-center border-4 border-gray-100">
         <span className="text-2xl">🇻🇳</span>
      </div>
    </div>
  );
};

export default Wheel;

