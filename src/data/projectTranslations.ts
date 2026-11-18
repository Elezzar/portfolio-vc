import type { Language } from '../types/language';

import type { ProjectCopy } from './types';

/** Тексты интерфейса раздела проектов по языкам. */
export const projectTranslations: Record<Language, ProjectCopy> = {
  ru: {
    heading: 'Мои проекты', projects: 'Слайды проектов', gallery: 'Скриншоты проекта',
    previous: 'Предыдущий слайд', next: 'Следующий слайд', slide: (index) => `Слайд ${index}`,
    open: 'Увеличить изображение', close: 'Закрыть', back: 'Назад к проектам',
    about: 'О проекте', technologies: 'Технологии', repository: 'Код на GitHub',
    missing: 'Проект не найден',
  },
  en: {
    heading: 'My projects', projects: 'Project slides', gallery: 'Project screenshots',
    previous: 'Previous slide', next: 'Next slide', slide: (index) => `Slide ${index}`,
    open: 'Enlarge image', close: 'Close', back: 'Back to projects',
    about: 'About the project', technologies: 'Technologies', repository: 'Code on GitHub',
    missing: 'Project not found',
  },
};
