import catalog from './projects.json';
import type { ProjectScreenshot } from './types';
import type { Language } from '../types/language';

interface ProjectDescription {
  summary: string;
  description: string;
}

/** Проект из каталога с локализованным описанием и URL скриншотов. */
export interface Project {
  id: string;
  name: Record<Language, string>;
  technologies: readonly string[];
  repositoryUrl: string;
  demoUrl?: string;
  images: readonly [ProjectScreenshot, ...ProjectScreenshot[]];
  copy: Record<Language, ProjectDescription>;
}

/** Таблица URL, которую Vite подготавливает для файлов каталога. */
const screenshotUrls = import.meta.glob<string>('../assets/projects/*/*', {
  eager: true,
  import: 'default',
  query: '?url',
});

/** Находит URL по имени файла из JSON и сообщает об отсутствующем скриншоте. */
function resolveScreenshot(projectId: string, filename: string): string {
  const url = screenshotUrls[`../assets/projects/${projectId}/${filename}`];
  if (url === undefined) {
    throw new Error(`Project screenshot not found: ${projectId}/${filename}`);
  }
  return url;
}

/** Связывает запись скриншота из каталога с URL, который собрал Vite. */
function resolveFrame(projectId: string, { file, caption }: { file: string; caption: Record<Language, string> }): ProjectScreenshot {
  return { image: resolveScreenshot(projectId, file), caption };
}

/** Каталог проектов для карточек и страниц. Первый скриншот записи служит обложкой. */
export const projects: readonly Project[] = catalog.map(({ images, ...project }) => {
  const [cover, ...screenshots] = images;
  if (!cover) {
    throw new Error(`Project requires a cover screenshot: ${project.id}`);
  }
  return {
    ...project,
    images: [resolveFrame(project.id, cover), ...screenshots.map((frame) => resolveFrame(project.id, frame))],
  };
});
