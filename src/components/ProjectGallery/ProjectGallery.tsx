import React, { useRef } from 'react';
import type { Language } from '../../types/language';
import type { ProjectCopy, ProjectScreenshot } from '../../data/types';
import ImagePopup from '../ImagePopup/ImagePopup';
import { useSlider } from '../../hooks/useSlider';
import SliderFrame from '../SliderFrame/SliderFrame';
import SliderTrack from '../SliderTrack/SliderTrack';
import SlideIndicators from '../SlideIndicators/SlideIndicators';
import './project-gallery.scss';

interface ProjectGalleryProps {
  images: readonly [ProjectScreenshot, ...ProjectScreenshot[]];
  language: Language;
  labels: Pick<ProjectCopy, 'gallery' | 'previous' | 'next' | 'open' | 'close' | 'slide'>;
}

/** Показывает скриншоты и синхронизирует выбранный кадр с открытым попапом. */
export default function ProjectGallery({ images, language, labels }: ProjectGalleryProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const count = images.length;
  const { slide, atStart, atEnd, step, goTo } = useSlider(count);
  /** Связывает каждый URL с подписью для обычного и увеличенного просмотра. */
  const frames = images.map(({ image, caption }) => ({
    image,
    caption: caption[language],
  }));
  const caption = frames[slide]?.caption ?? images[0].caption[language];
  /** Передаёт галерее и попапу одинаковые обработчики и ограничения перелистывания. */
  const navigation = { labels: count > 1 ? labels : undefined, step, atStart, atEnd };

  return (
    <section className="project-gallery" aria-label={labels.gallery}>
      <SliderFrame {...navigation}>
        <figure className="project-gallery__figure">
          <SliderTrack slide={slide} className="project-gallery__viewport">
            {frames.map(({ image, caption: frameCaption }, index) => (
              <button
                key={image}
                type="button"
                className="project-gallery__preview"
                aria-label={`${labels.open} — ${frameCaption}`}
                inert={index !== slide}
                onClick={() => dialog.current?.showModal()}
              >
                <img className="project-gallery__image" src={image} alt="" />
              </button>
            ))}
          </SliderTrack>
          <figcaption className="project-gallery__caption" aria-live="polite">{caption}</figcaption>
        </figure>
      </SliderFrame>
      {count > 1 && <SlideIndicators count={count} current={slide} onChange={goTo} getLabel={labels.slide} />}
      <ImagePopup dialogRef={dialog} caption={caption} closeLabel={labels.close}>
        <SliderFrame className="project-gallery__popup-slider" {...navigation}>
          <SliderTrack slide={slide} className="project-gallery__viewport project-gallery__viewport_popup">
            {frames.map(({ image, caption: frameCaption }, index) => (
              <img
                key={image}
                className="project-gallery__popup-image"
                src={image}
                alt={frameCaption}
                aria-hidden={index !== slide}
              />
            ))}
          </SliderTrack>
        </SliderFrame>
      </ImagePopup>
    </section>
  );
}
