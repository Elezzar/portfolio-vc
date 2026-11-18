import React, { useSyncExternalStore, type CSSProperties } from 'react';
import type { Language } from '../../types/language';
import ProjectPage from '../../components/ProjectPage/ProjectPage';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { useSlider } from '../../hooks/useSlider';
import SliderFrame from '../../components/SliderFrame/SliderFrame';
import SlideIndicators from '../../components/SlideIndicators/SlideIndicators';
import { projects } from '../../data/projects';
import { projectTranslations } from '../../data/projectTranslations';
import '../../styles/slider-motion.scss';
import './projects.scss';

interface ProjectsProps {
  language: Language;
}

const desktop = window.matchMedia('(min-width: 960px)');
const tablet = window.matchMedia('(min-width: 640px)');

/** Подписывается на изменение ширины окна на границах раскладки карточек. */
function subscribeToCardCount(onChange: () => void) {
  desktop.addEventListener('change', onChange);
  tablet.addEventListener('change', onChange);
  return () => {
    desktop.removeEventListener('change', onChange);
    tablet.removeEventListener('change', onChange);
  };
}

/** Возвращает количество карточек, видимых одновременно при текущей ширине окна. */
function getCardCount() {
  if (desktop.matches) return 3;
  return tablet.matches ? 2 : 1;
}

/** Показывает каталог и листает его на одну карточку за шаг. */
export default function Projects({ language }: ProjectsProps) {
  const copy = projectTranslations[language];
  const cardCount = useSyncExternalStore(subscribeToCardCount, getCardCount);
  /** Число позиций, при котором на последней позиции ряд остаётся заполненным. */
  const slideCount = projects.length - cardCount + 1;
  const { slide, atStart, atEnd, step, goTo } = useSlider(slideCount);

  const cardsStyle: CSSProperties & { '--project-columns': number; '--project-slide': number } = {
    '--project-columns': cardCount,
    '--project-slide': slide,
  };

  return (
    <ProjectPage title={copy.heading} titleId="projects-title" className="projects">
      <section aria-label={copy.projects}>
        <SliderFrame labels={copy} step={step} atStart={atStart} atEnd={atEnd} className="projects__slider">
          <ul className="projects__cards" style={cardsStyle} aria-live="polite">
            {projects.map((project, index) => (
              <li className="projects__item slider-motion" key={project.id} inert={index < slide || index >= slide + cardCount}>
                <ProjectCard
                  className="projects__card"
                  href={`#projects/${project.id}`}
                  image={project.images[0].image}
                  title={project.name[language]}
                  description={project.copy[language].summary}
                />
              </li>
            ))}
          </ul>
        </SliderFrame>
        <SlideIndicators count={slideCount} current={slide} onChange={goTo} getLabel={copy.slide} />
      </section>
    </ProjectPage>
  );
}
