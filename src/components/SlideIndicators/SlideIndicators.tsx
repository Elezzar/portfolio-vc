import React from 'react';
import './slide-indicators.scss';

interface SlideIndicatorsProps {
  count: number;
  current: number;
  onChange: (index: number) => void;
  getLabel: (index: number) => string;
}

/** Показывает доступные позиции ленты и даёт перейти к любой из них. */
export default function SlideIndicators({ count, current, onChange, getLabel }: SlideIndicatorsProps) {
  return (
    <div className="slide-indicators">
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          className="slide-indicators__button"
          type="button"
          aria-label={getLabel(index + 1)}
          aria-current={current === index ? 'true' : undefined}
          onClick={() => onChange(index)}
        />
      ))}
    </div>
  );
}
