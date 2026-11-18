import React from 'react';
import type { PageId, SiteCopy } from '../../types/site';
import './header.scss';

interface HeaderProps {
  currentPage: PageId;
  labels: Pick<SiteCopy, 'navigation' | 'pages' | 'language' | 'switchLanguage'>;
  onLanguageChange: () => void;
}

/** Показывает меню, активный раздел и кнопку смены языка. */
export default function Header({ currentPage, labels, onLanguageChange }: HeaderProps) {
  return (
    <header className="site-header">
      <nav className="site-header__navigation" aria-label={labels.navigation}>
        <ul className="site-header__links">
          {Object.entries(labels.pages).map(([id, label]) => (
            <li className="site-header__item" key={id}>
              <a className="site-header__link" href={`#${id}`} aria-current={currentPage === id ? 'page' : undefined}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <button
        className="site-header__language"
        type="button"
        onClick={onLanguageChange}
        aria-label={labels.switchLanguage}
        title={labels.switchLanguage}
      >
        {labels.language}
      </button>
    </header>
  );
}
