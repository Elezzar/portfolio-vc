import type { Language } from '../types/language';

/** Кадр проекта с адресом изображения и подписями на обоих языках. */
export interface ProjectScreenshot {
  image: string;
  caption: Record<Language, string>;
}

/** Подписи и сообщения списка проектов, страницы проекта и галереи для одного языка. */
export interface ProjectCopy {
  heading: string;
  projects: string;
  gallery: string;
  previous: string;
  next: string;
  slide: (index: number) => string;
  open: string;
  close: string;
  back: string;
  about: string;
  technologies: string;
  repository: string;
  missing: string;
}
