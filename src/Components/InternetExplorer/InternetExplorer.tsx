import { useState } from 'react';
import styles from './InternetExplorer.module.css';

import Refresh from '../../assets/icons/REFRESH.svg';
import Back from '../../assets/icons/FlecheGauche.svg';
import Forward from '../../assets/icons/FlecheDroite.svg';
import Home from '../../assets/icons/Home.svg';
import SportSee from '../../assets/logo2.png';
import BankApi from '../../assets/ABlogo.png';
import Kasa from '../../assets/LOGO.png';


interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveLink?: string;
  githubLink?: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Bank-Api',
    description: 'A modern banking application developed with React, TypeScript, and Redux.',
    image: BankApi,
    technologies: ['React', 'TypeScript', 'Swagger', 'Redux'],
    githubLink: 'https://github.com/tompointcom/Bank-API',
  },
  {
    id: '2',
    title: 'SportSee-Front',
    description: 'A dashboard for sports tracking built with React and Recharts.',
    image: SportSee,
    technologies: ['React', 'TypeScript', 'Recharts'],
    githubLink: 'https://github.com/tompointcom/SportSee-Front',

  },
  {
    id: '3',
    title: 'Kasa',
    description: 'Real estate rental platform', 
    image: Kasa,
    technologies: ['React', 'TypeScript', 'React Router'],
    liveLink: 'https://tompointcom.github.io/Kasa/',
    githubLink: 'https://github.com/tompointcom/Kasa'
  },

];

export default function InternetExplorer() {
  const [currentUrl] = useState('https://courcy.dev/projects');

  return (
    <div className={styles.browser}>
      {/* Barre d'outils IE */}
      <div className={styles.toolbar}>
        <div className={styles.icons}>
          <img src={Back} alt="" />
          <img src={Forward} alt="" />
          <img src={Refresh} alt="" />
          <img src={Home} alt="" />
        </div>
        <div className={styles.addressBar}>
          <span className={styles.label}>Address:</span>
          <input type="text" value={currentUrl} readOnly className={styles.urlInput} />
          <button className={styles.goBtn}>Go</button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.webpage}>
          <header className={styles.header}>
            <h1>My Realisations</h1>
            <p>Front-End Developper • React • TypeScript</p>
          </header>

          <div className={styles.projects}>
            {projects.map(project => (
              <div key={project.id} className={styles.projectCard}>
                <img src={project.image} alt={project.title} className={styles.projectImage} />
                <div className={styles.projectInfo}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className={styles.technologies}>
                    {project.technologies.map(tech => (
                      <span key={tech} className={styles.tech}>{tech}</span>
                    ))}
                  </div>
                  <div className={styles.links}>
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                        See project
                      </a>
                    )}
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}