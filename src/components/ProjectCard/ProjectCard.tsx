import React from 'react';
import './project-card.scss';


interface ProjectCardProps {
  href: string;
  image: string;
  title: string;
  description: string;
  className?: string;
}

/** Показывает обложку и краткое описание со ссылкой на страницу проекта. */
export default function ProjectCard({ href, image, title, description, className = '' }: ProjectCardProps) {
  return (
    <a className={`project-card ${className}`.trim()} href={href}>
      <img className="project-card__image" src={image} alt="" />
      <h2 className="project-card__title">{title}</h2>
      <p className="project-card__description">{description}</p>
    </a>
  );
}
