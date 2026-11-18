import type { Language } from '../types/language';

import type { SiteCopy } from '../types/site';

interface AboutCopy {
  title: string;
  paragraphs: readonly (readonly [string, ...(string | { text: string; projectId: string })[]])[];
}

/** Тексты общей оболочки и главной страницы по языкам. */
export const siteCopy: Record<Language, SiteCopy> = {
  ru: {
    name: 'Никита Ворожищев',
    description: 'Разработка сайтов',
    navigation: 'Разделы портфолио',
    language: 'Русский',
    switchLanguage: 'Сменить язык на английский',
    pages: { home: 'Главная', about: 'Обо мне', projects: 'Мои проекты' },
  },
  en: {
    name: 'Nikita Vorozhishchev',
    description: 'Website Development',
    navigation: 'Portfolio sections',
    language: 'English',
    switchLanguage: 'Switch to Russian',
    pages: { home: 'Home', about: 'About me', projects: 'My projects' },
  },
};

/** Заголовок и абзацы страницы «Обо мне» по языкам. */
export const aboutCopy: Record<Language, AboutCopy> = {
  ru: {
    title: 'Обо мне',
    paragraphs: [
      ['Я Никита Ворожищев, фронтенд-разработчик. Верстаю адаптивные сайты по готовым макетам и разрабатываю веб-интерфейсы на React и TypeScript.'],
      [
        'В моём портфолио есть разные по масштабу задачи: адаптивная фотогалерея в ',
        { text: '«Путешествии по России»', projectId: 'russian-travel' },
        ', два блока главной страницы ',
        { text: 'фонда «Друзья»', projectId: 'friends-fund-project' },
        ', конструктор бургера с перетаскиванием ингредиентов и лента заказов с обновлениями в реальном времени в ',
        { text: 'Stellar Burgers', projectId: 'react-burger' },
        '. В Mesto я также работал с ',
        { text: 'серверной частью', projectId: 'mesto-project-plus' },
        ' на Node.js, Express и MongoDB.',
      ],
      ['В работе я сначала продумываю, как страница будет вести себя на разных экранах и что на ней сможет сделать пользователь. Затем собираю интерфейс из компонентов, выношу повторяющуюся логику и покрываю тестами важные сценарии.'],
    ],
  },
  en: {
    title: 'About me',
    paragraphs: [
      ['I’m Nikita Vorozhishchev, a front-end developer. I build responsive websites from supplied designs and develop web interfaces with React and TypeScript.'],
      [
        'My portfolio includes projects of different sizes: a responsive photo gallery in ',
        { text: 'Russian Travel', projectId: 'russian-travel' },
        ', two homepage sections for ',
        { text: 'Friends Foundation', projectId: 'friends-fund-project' },
        ', and a drag-and-drop burger builder and live order feed in ',
        { text: 'Stellar Burgers', projectId: 'react-burger' },
        '. For Mesto, I also worked on the ',
        { text: 'backend', projectId: 'mesto-project-plus' },
        ' with Node.js, Express, and MongoDB.',
      ],
      ['I start by thinking through how the page should behave on different screens and what users need to do. Then I build the interface from components, extract shared logic, and test the important user flows.'],
    ],
  },
};
