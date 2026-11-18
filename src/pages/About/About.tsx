import React from 'react';
import illustration from '../../assets/about.webp';
import { aboutCopy } from '../../data/siteCopy';
import type { Language } from '../../types/language';
import './about.scss';

interface AboutProps {
  language: Language;
}

/** Показывает локализованное описание автора и иллюстрацию. */
export default function About({ language }: AboutProps) {
  const { title, paragraphs } = aboutCopy[language] ?? aboutCopy.ru;

  return (
    <section className="about-page" aria-labelledby="about-title">
      <h1 className="about-page__title" id="about-title">{title}</h1>
      <div className="about-page__content">
        <div className="about-page__copy">
          {paragraphs.map((paragraph) => (
            <p className="about-page__paragraph" key={paragraph[0]}>
              {paragraph.map((part) => typeof part === 'string' ? part : (
                <a className="about-page__project-link" key={part.projectId} href={`#projects/${part.projectId}`}>
                  {part.text}
                </a>
              ))}
            </p>
          ))}
        </div>
        <img src={illustration} alt="" className="about-page__illustration" width="1000" height="569" />
      </div>
    </section>
  );
}
