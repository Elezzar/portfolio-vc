import { useState } from 'react';

/** Управляет независимым слайдером по числу доступных позиций ленты, а не по числу элементов. */
export function useSlider(positionCount: number) {
  /** Хранит выбранную позицию до ограничения по текущей ширине ленты. */
  const [requestedSlide, setRequestedSlide] = useState(0);
  const lastSlide = Math.max(0, positionCount - 1);
  /** Ограничивает индекс границами ленты, включая случай с пустым набором. */
  const clamp = (index: number) => Math.max(0, Math.min(index, lastSlide));
  const slide = clamp(requestedSlide);

  return {
    slide,
    atStart: slide === 0,
    atEnd: slide === lastSlide,
    /** Сдвигает ленту на заданное число позиций от текущего видимого кадра. */
    step: (delta: number) => setRequestedSlide((current) => clamp(clamp(current) + delta)),
    /** Выбирает позицию напрямую и ограничивает её границами ленты. */
    goTo: (index: number) => setRequestedSlide(clamp(index)),
  };
}
