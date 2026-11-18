import React, { type ReactNode } from 'react';
import SliderArrow from '../SliderArrow/SliderArrow';
import './slider-frame.scss';


interface SliderFrameProps {
  labels: { previous: string; next: string } | undefined;
  step: (delta: number) => void;
  atStart: boolean;
  atEnd: boolean;
  className?: string;
  children: ReactNode;
}

/** Размещает содержимое слайдера между стрелками и передаёт шаг обработчику. */
export default function SliderFrame({ labels, step, atStart, atEnd, className = '', children }: SliderFrameProps) {
  return (
    <div className={`slider-frame ${className}`.trim()}>
      {labels && (
        <SliderArrow previous label={labels.previous} disabled={atStart} onClick={() => step(-1)} className="slider-frame__arrow slider-frame__arrow_previous" />
      )}
      {children}
      {labels && (
        <SliderArrow label={labels.next} disabled={atEnd} onClick={() => step(1)} className="slider-frame__arrow slider-frame__arrow_next" />
      )}
    </div>
  );
}
