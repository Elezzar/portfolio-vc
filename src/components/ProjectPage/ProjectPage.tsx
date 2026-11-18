import React, { type ReactNode } from 'react';
import './project-page.scss';


interface ProjectPageProps {
  title: string;
  titleId: string;
  titleLanguage?: string;
  children: ReactNode;
  className?: string;
}

/** Задаёт общую разметку и заголовок для списка проектов и страницы проекта. */
export default function ProjectPage({ title, titleId, titleLanguage, children, className = '' }: ProjectPageProps) {
  return (
    <section className={`project-page ${className}`.trim()} aria-labelledby={titleId}>
      <h1 className="project-page__title" id={titleId} lang={titleLanguage}>{title}</h1>
      {children}
    </section>
  );
}
