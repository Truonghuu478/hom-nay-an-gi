export const triggerConfetti = () => {
  if ((window as any).confetti) {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      (window as any).confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#DA251D', '#FFFF00']
      });
      (window as any).confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#DA251D', '#FFFF00']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }
};
