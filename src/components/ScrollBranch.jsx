import { motion, useTransform } from 'framer-motion';

// Branches start large/overlapping the hero, then settle into their resting
// corner position as `progress` (tied to scroll past the hero) goes 0 -> 1.
export default function ScrollBranch({ name, side, top, offset, width, rotate, opacity, src, progress }) {
  const scale = useTransform(progress, [0, 1], [1.55, 1]);
  const settleY = useTransform(progress, [0, 1], [-(top - 160), 0]);
  const settleX = useTransform(progress, [0, 1], [side === 'l' ? 160 : -160, 0]);
  const fade = useTransform(progress, [0, 1], [0, opacity]);

  return (
    <motion.img
      data-branch={name}
      src={src}
      alt=""
      style={{
        position: 'absolute',
        top,
        [side === 'l' ? 'left' : 'right']: offset,
        width,
        pointerEvents: 'none',
        zIndex: 2,
        x: settleX,
        y: settleY,
        scale,
        rotate: `${rotate}deg`,
        opacity: fade,
      }}
    />
  );
}
