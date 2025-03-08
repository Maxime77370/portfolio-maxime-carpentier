import * as motion from 'motion/react-client';
import { useState, useEffect } from 'react';

type AnimatedBackgroundProps = {
  fromColor: string;
  toColor: string;
  ballColor: string;
};

export default function AnimatedBackground({
  fromColor = 'rgba(0, 0, 0, 1)',
  toColor = 'rgba(0, 0, 0, 1)',
  ballColor = 'rgba(255, 255, 255, 1)',
}: AnimatedBackgroundProps) {
  type BallAnimation = {
    id: number;
    size: number;
    top: string;
    left: string;
    delay: number;
    xKeyframes: number[];
    yKeyframes: number[];
    scaleKeyframes: number[];
    opacityKeyframes: number[];
  };

  const [ballAnimations, setBallAnimations] = useState<BallAnimation[] | null>(
    null
  );

  useEffect(() => {
    const numberOfBalls = 5;
    // Génère aléatoirement les propriétés de base pour chaque boule
    const balls = Array.from({ length: numberOfBalls }, (_, i) => ({
      id: i + 1,
      size: Math.floor(Math.random() * (450 - 150 + 1)) + 150, // taille entre 150 et 450px
      top: `${Math.random() * 100}%`, // position verticale aléatoire
      left: `${Math.random() * 100}%`, // position horizontale aléatoire
      delay: Math.random() * 3, // délai aléatoire entre 0 et 3 secondes
    }));

    // Pour chaque boule, on génère des keyframes d'animation complexes
    const animations = balls.map((ball) => {
      const x1 = Math.random() * 400 - 200;
      const x2 = Math.random() * 400 - 200;
      const y1 = Math.random() * 400 - 200;
      const y2 = Math.random() * 400 - 200;
      return {
        ...ball,
        xKeyframes: [0, x1, x2, 0],
        yKeyframes: [0, y1, y2, 0],
        scaleKeyframes: [1, 1.1, 0.9, 1],
        opacityKeyframes: [1, 0.8, 1],
      };
    });
    setBallAnimations(animations);
  }, []);

  // Tant que les données ne sont pas prêtes, on ne rend rien pour éviter l'hydratation incohérente
  if (!ballAnimations) return null;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{
        background: `linear-gradient(to bottom right, ${fromColor}, ${toColor})`,
      }}
    >
      {ballAnimations.map((ball) => (
        <motion.div
          key={ball.id}
          className="absolute rounded-full"
          style={{
            width: `${ball.size}px`,
            height: `${ball.size}px`,
            top: ball.top,
            left: ball.left,
            background: ballColor,
            filter: 'blur(40px)',
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
          }}
          animate={{
            x: ball.xKeyframes,
            y: ball.yKeyframes,
            scale: ball.scaleKeyframes,
            opacity: ball.opacityKeyframes,
          }}
          transition={{
            delay: ball.delay,
            duration: 16,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
