import React from 'react';
import './slider-arrow.scss';


interface SliderArrowProps {
  previous?: boolean;
  disabled: boolean;
  label: string;
  onClick: () => void;
  className?: string;
}

/** Показывает стрелку заданного направления и блокирует её на границе ленты. */
export default function SliderArrow({ previous = false, disabled, label, onClick, className = '' }: SliderArrowProps) {
  return (
    <button type="button" className={`slider-arrow ${className}`.trim()} disabled={disabled} aria-label={label} onClick={onClick}>
      <svg className="slider-arrow__icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d={previous ? 'M15 5 9 12l6 7' : 'M9 5l6 7-6 7'} />
      </svg>
    </button>
  );
}
