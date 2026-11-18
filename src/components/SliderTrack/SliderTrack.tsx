import type { CSSProperties, ReactNode } from 'react';
import '../../styles/slider-motion.scss';
import './slider-track.scss';

interface SliderTrackProps {
  slide: number;
  className: string;
  children: ReactNode;
}

/** Сдвигает ленту полноразмерных кадров до активной позиции и обрезает края по контейнеру. */
export default function SliderTrack({ slide, className, children }: SliderTrackProps) {
  const style: CSSProperties & { '--slider-position': number } = { '--slider-position': slide };

  return (
    <div className={`slider-track ${className}`}>
      <div className="slider-track__belt slider-motion" style={style}>
        {children}
      </div>
    </div>
  );
}
