import React from 'react';
import illustration from '../../assets/hero-sofa.webp';
import './home.scss';

interface HomeProps {
  name: string;
  description: string;
}

/** Показывает имя, направление работы и титульную иллюстрацию портфолио. */
export default function Home({ name, description }: HomeProps) {
  return (
    <section className="hero" id="home" aria-labelledby="portfolio-title">
      <h1 id="portfolio-title" className="hero__title">{name}</h1>
      <p className="hero__description">{description}</p>
      <img className="hero__illustration" src={illustration} alt="" />
    </section>
  );
}
