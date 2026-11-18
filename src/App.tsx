import React, { useSyncExternalStore } from 'react';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Projects from './pages/Projects/Projects';
import ProjectDetail from './pages/ProjectDetail/ProjectDetail';
import { siteCopy } from './data/siteCopy';
import type { PageId } from './types/site';
import type { Language } from './types/language';

const params = new URLSearchParams(window.location.search);
/** Выбирает язык из URL и поддерживает прежний параметр name. */
const language: Language = (params.get('lang') ?? params.get('name')) === 'en' ? 'en' : 'ru';
const copy = siteCopy[language];

document.documentElement.lang = language;
document.documentElement.toggleAttribute('data-layout-debug', params.get('debug') === '1');
document.title = `${copy.name} — ${copy.description}`;

/** Перезагружает текущий раздел на другом языке, сохраняя остальные параметры и маршрут. */
function toggleLanguage() {
  const url = new URL(window.location.href);
  url.searchParams.delete('name');
  if (language === 'ru') {
    url.searchParams.set('lang', 'en');
  } else {
    url.searchParams.delete('lang');
  }
  window.location.assign(url.href);
}

/** Подписывает React на навигацию по фрагменту URL и возвращает функцию отписки. */
function subscribeToLocation(onChange: () => void) {
  window.addEventListener('hashchange', onChange);
  return () => window.removeEventListener('hashchange', onChange);
}

/** Возвращает фрагмент URL без начального символа #. */
function getCurrentRoute() {
  return window.location.hash.slice(1);
}

/** Проверяет, что фрагмент адреса соответствует разделу меню. */
function isPageId(value: string | undefined): value is PageId {
  return value !== undefined && Object.hasOwn(copy.pages, value);
}

/** Собирает общий хэдер и страницу, выбранную по URL. */
export default function App() {
  const route = useSyncExternalStore(subscribeToLocation, getCurrentRoute);
  const [page, projectId] = route.split('/');
  const currentPage = isPageId(page) ? page : 'home';
  const centerContent = currentPage === 'about' || (currentPage === 'projects' && !projectId);

  return (
    <div className="site-layout">
      <Header currentPage={currentPage} labels={copy} onLanguageChange={toggleLanguage} />
      <main className={centerContent ? "site-layout__main_centered" : undefined}>
        {currentPage === 'home' && <Home name={copy.name} description={copy.description} />}
        {currentPage === 'about' && <About language={language} />}
        {currentPage === 'projects' && (
          projectId
            ? <ProjectDetail key={projectId} language={language} projectId={projectId} />
            : <Projects language={language} />
        )}
      </main>
    </div>
  );
}
