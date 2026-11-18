import React from 'react';
import type { Language } from '../../types/language';
import ProjectPage from '../../components/ProjectPage/ProjectPage';
import ProjectGallery from '../../components/ProjectGallery/ProjectGallery';
import { projects } from '../../data/projects';
import { projectTranslations } from '../../data/projectTranslations';
import './project-detail.scss';

interface ProjectDetailProps {
  language: Language;
  projectId: string;
}

/** Показывает галерею и описание проекта по идентификатору из маршрута. */
export default function ProjectDetail({ language, projectId }: ProjectDetailProps) {
  const copy = projectTranslations[language];
  const project = projects.find(({ id }) => id === projectId);

  return (
    <ProjectPage title={project?.name[language] ?? copy.missing} titleId="project-title" className="project-detail">
      {project && (
        <div className="project-detail__content">
          <ProjectGallery key={project.id} images={project.images} language={language} labels={copy} />
          <div className="project-detail__copy">
            <h2 className="project-detail__heading">{copy.about}</h2>

            <p className="project-detail__paragraph">{project.copy[language].description}</p>
            <h2 className="project-detail__heading">{copy.technologies}</h2>
            <p className="project-detail__paragraph">{project.technologies.join(', ')}</p>
            <a className="project-detail__repository" href={project.repositoryUrl}>{copy.repository}</a>
          </div>
        </div>
      )}
      <a className="project-detail__back" href="#projects">{copy.back}</a>
    </ProjectPage>
  );
}
