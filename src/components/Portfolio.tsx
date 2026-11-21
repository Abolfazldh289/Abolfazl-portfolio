'use client';

import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import {
  ArrowDown, ArrowUpRight, Github, Linkedin, Send, Mail, Menu, X,
  Code2, Sparkles, ExternalLink, CheckCircle2, Lightbulb, Rocket,
  Smartphone, ShieldCheck, Layers3
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { content, type Locale } from '@/lib/content';

const Globe = dynamic(() => import('./Globe'), { ssr: false, loading: () => <div className="globe-fallback" /> });

const skills = [
  { name: 'HTML5', category: 'Core', logo: 'html5/html5-original.svg', note: 'Semantic structure and accessible markup.' },
  { name: 'CSS3', category: 'Core', logo: 'css3/css3-original.svg', note: 'Modern layouts, responsive styling and motion.' },
  { name: 'JavaScript', category: 'Core', logo: 'javascript/javascript-original.svg', note: 'Interactive interfaces and application logic.' },
  { name: 'React', category: 'Frameworks', logo: 'react/react-original.svg', note: 'Reusable components and interactive UI.' },
  { name: 'TypeScript', category: 'Frameworks', logo: 'typescript/typescript-original.svg', note: 'Typed, maintainable application code.' },
  { name: 'Next.js', category: 'Frameworks', logo: 'nextjs/nextjs-original.svg', note: 'React applications with routing and rendering.' },
  { name: 'Tailwind CSS', category: 'Styling', logo: 'tailwindcss/tailwindcss-original.svg', note: 'Utility-first styling and design systems.' },
  { name: 'Git', category: 'Workflow', logo: 'git/git-original.svg', note: 'Version control for iterative development.' },
  { name: 'GitHub', category: 'Workflow', logo: 'github/github-original.svg', note: 'Repositories and project collaboration.' },
  { name: 'Responsive Design', category: 'Styling', logo: '', note: 'Interfaces that adapt to different screens.' },
];

const projects = {
  simple: {
    key: 'simple', title: 'Simple Gole', status: 'published',
    cover: '/images/projects/simple-gole-dashboard.jpg',
    gallery: ['/images/projects/simple-gole-dashboard.jpg','/images/projects/simple-gole-character.jpg','/images/projects/simple-gole-tasks.jpg','/images/projects/simple-gole-calendar.jpg','/images/projects/simple-gole-routine.jpg'],
    stack: ['React Native', 'JavaScript', 'Mobile UI'],
    url: 'https://myket.ir/app/com.example.reminder'
  },
  kalro: {
    key: 'kalro', title: 'Kalro', status: 'development',
    cover: '/images/projects/kalro-dashboard.jpg',
    gallery: ['/images/projects/kalro-dashboard.jpg','/images/projects/kalro-profile.jpg','/images/projects/kalro-setup.jpg','/images/projects/kalro-history.jpg'],
    stack: ['Offline-first', 'PWA', 'Android APK', 'Jalali Calendar'],
    url: ''
  }
} as const;

export default function Portfolio({ locale }: { locale: Locale }) {
  const t = content[locale];
  const isFa = locale === 'fa';
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<'simple'|'kalro'|null>(null);
  const [cursor, setCursor] = useState({ x: -100, y: -100, active: false });
  const navIds = ['home', 'about', 'skills', 'projects', 'ideas', 'contact'];
  const otherLocale = isFa ? 'en' : 'fa';
  const fade = reduceMotion ? {} : {
    initial: { opacity: 0, y: 34 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.14 },
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const }
  };

  useEffect(() => {
    const fine = window.matchMedia('(pointer:fine)').matches;
    if (!fine || reduceMotion) return;
    const move = (e: MouseEvent) => setCursor(p => ({ ...p, x: e.clientX, y: e.clientY }));
    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      setCursor(p => ({ ...p, active: !!el?.closest('a,button,[data-cursor]') }));
    };
    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    return () => { window.removeEventListener('mousemove', move); document.removeEventListener('mouseover', over); };
  }, [reduceMotion]);

  useEffect(() => {
    if (!activeProject) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActiveProject(null); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [activeProject]);

  const project = activeProject ? projects[activeProject] : null;
  const projectText = activeProject === 'simple'
    ? { desc: t.simpleDetail, features: t.simpleFeatures }
    : { desc: t.kalroDetail, features: t.kalroFeatures };

  return <main dir={isFa ? 'rtl' : 'ltr'} lang={locale}>
    <div className={`custom-cursor ${cursor.active ? 'is-active' : ''}`} style={{ transform: `translate3d(${cursor.x}px,${cursor.y}px,0)` }} aria-hidden="true"/>
    <header className="site-header">
      <Link href={`/${locale}#home`} className="brand" aria-label="Abolfazl home"><span className="brand-mark">A<span>.</span></span><span>Abolfazl</span></Link>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
        {t.nav.map((label, i) => <a key={navIds[i]} href={`#${navIds[i]}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
      </nav>
      <div className="header-actions">
        <Link className="language-switch" href={`/${otherLocale}#home`} aria-label={t.language}>
          <span>{isFa ? 'فا' : 'EN'}</span><span className="language-divider">/</span><span>{isFa ? 'EN' : 'فا'}</span>
        </Link>
        <a className="header-cta" href="#contact">{t.secondary}<ArrowUpRight size={16}/></a>
      </div>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X/> : <Menu/>}</button>
    </header>

    <section id="home" className="hero-section">
      <div className="hero-stars"/><div className="hero-nebula nebula-a"/><div className="hero-nebula nebula-b"/>
      <div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/>
      <div className="hero-word" aria-hidden="true">BUILDING</div>
      <Globe/>
      <div className="hero-content">
        <motion.div className="portrait-wrap" initial={reduceMotion ? false : { opacity: 0, x: isFa ? 45 : -45, scale: .94 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 1.1, delay: .2 }}>
          <div className="portrait-glow"/><div className="portrait-frame"/>
          <Image src={`${basePath}/images/abolfazl-portrait.png`} alt="Abolfazl, Front-End Developer" fill priority sizes="(max-width: 800px) 85vw, 45vw" className="portrait-image"/>
          <div className="portrait-caption"><span className="status-dot"/>{t.availability}</div>
        </motion.div>
        <motion.div className="hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .4 }}>
          <div className="eyebrow"><Sparkles size={14}/>{t.hello}</div>
          <h1>Abolfazl<span className="emerald-dot">.</span></h1>
          <h2>{t.role}</h2>
          <p>{t.intro}</p>
          <div className="hero-tags"><span>React</span><span>TypeScript</span><span>Next.js</span><span>Tailwind CSS</span></div>
          <div className="hero-buttons"><a className="button-primary" href="#projects">{t.primary}<ArrowUpRight size={17}/></a><a className="button-ghost" href="https://t.me/Abolfazldh289" target="_blank" rel="noreferrer">{t.secondary}<Send size={16}/></a></div>
        </motion.div>
      </div>
      <a href="#about" className="scroll-cue"><span><ArrowDown size={15}/></span>{t.scroll}</a>
      <div className="hero-bottom-label">{t.eyebrow}</div>
      <div className="hero-side-note">CREATIVE DEVELOPMENT / 2026</div>
    </section>

    <section id="about" className="section about-section">
      <motion.div {...fade} className="section-heading"><span className="section-index">01 / ABOUT</span><h2>{t.aboutTitle}</h2></motion.div>
      <div className="about-grid">
        <motion.div {...fade} className="about-copy"><p className="about-lead">{t.aboutLead}</p><p className="about-body">{t.aboutBody}</p></motion.div>
        <motion.div {...fade} className="journey-card"><div className="journey-title"><Code2 size={18}/>{t.journeyTitle}</div>{t.journey.map((item, i) => <motion.div className="journey-item" key={item[0]} {...fade}><span className="journey-number">0{i+1}</span><div><h3>{item[0]}</h3><p>{item[1]}</p></div></motion.div>)}</motion.div>
      </div>
      <motion.div {...fade} className="experience-strip"><div className="experience-icon"><Layers3/></div><div><h3>{t.experienceTitle}</h3><p>{t.experienceText}</p></div><span className="experience-mark">PERSONAL<br/>PROJECTS</span></motion.div>
    </section>

    <section id="skills" className="section skills-section">
      <motion.div {...fade} className="section-heading"><span className="section-index">02 / TOOLKIT</span><h2>{t.skillsTitle}</h2><p>{t.skillsIntro}</p><span className="skill-hint">{t.skillHint}</span></motion.div>
      <div className="skills-grid">{skills.map((skill, i) => <motion.article {...fade} className="skill-card" key={skill.name} whileHover={reduceMotion ? undefined : { y: -7, scale: 1.025 }} whileTap={{ scale: .98 }} tabIndex={0} data-cursor>
        <span className="skill-number">0{i+1}</span>
        <div className="skill-logo">{skill.logo ? <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.logo}`} alt="" loading="lazy"/> : <Smartphone size={27}/>}</div>
        <h3>{skill.name === 'Responsive Design' && isFa ? 'طراحی واکنش‌گرا' : skill.name}</h3>
        <p>{isFa ? ({'HTML5':'ساختار معنایی صفحات وب','CSS3':'چیدمان و استایل‌دهی مدرن','JavaScript':'منطق و تعاملات رابط کاربری','React':'ساخت رابط‌های کامپوننت‌محور','TypeScript':'کدنویسی تایپ‌دار و قابل نگهداری','Next.js':'ساخت اپلیکیشن‌های مبتنی بر React','Tailwind CSS':'استایل‌دهی سریع و سیستماتیک','Git':'کنترل نسخه و مدیریت تغییرات','GitHub':'مخزن کد و همکاری روی پروژه‌ها','Responsive Design':'طراحی سازگار با نمایشگرهای مختلف'} as Record<string,string>)[skill.name] : skill.note}</p>
        <span className="skill-category">{skill.category}</span>
      </motion.article>)}</div>
    </section>

    <section id="projects" className="section projects-section">
      <motion.div {...fade} className="section-heading"><span className="section-index">03 / SELECTED WORK</span><h2>{t.projectsTitle}</h2><p>{t.projectsIntro}</p></motion.div>
      <div className="projects-grid">
        <motion.article {...fade} className="project-card project-featured" onClick={() => setActiveProject('simple')} whileHover={reduceMotion ? undefined : { y: -8 }} data-cursor tabIndex={0} onKeyDown={e => e.key === 'Enter' && setActiveProject('simple')}>
          <div className="project-cover"><Image src={projects.simple.cover} alt="Simple Gole app screenshot" fill sizes="(max-width: 800px) 90vw, 55vw"/><div className="cover-shade"/><span className="art-label">SIMPLE GOLE / MOBILE APP</span><span className="cover-open">{t.viewDetails}<ArrowUpRight size={16}/></span></div>
          <div className="project-meta"><div><span className="project-status"><CheckCircle2 size={13}/>{t.projectStatus}</span><h3>Simple Gole</h3><p>{t.simpleDesc}</p><div className="project-tags"><span>React Native</span><span>Productivity</span><span>Android</span></div></div><ArrowUpRight className="project-arrow"/></div>
        </motion.article>
        <motion.article {...fade} className="project-card" onClick={() => setActiveProject('kalro')} whileHover={reduceMotion ? undefined : { y: -8 }} data-cursor tabIndex={0} onKeyDown={e => e.key === 'Enter' && setActiveProject('kalro')}>
          <div className="project-cover kalro-cover"><Image src={projects.kalro.cover} alt="Kalro app screenshot" fill sizes="(max-width: 800px) 90vw, 45vw"/><div className="cover-shade"/><span className="art-label">KALRO / OFFLINE-FIRST APP</span><span className="cover-open">{t.viewDetails}<ArrowUpRight size={16}/></span></div>
          <div className="project-meta"><div><span className="project-status muted-status"><span className="pulse-dot"/>{t.inProgress}</span><h3>Kalro</h3><p>{t.kalroDesc}</p><div className="project-tags"><span>Offline-first</span><span>Persian RTL</span><span>PWA / Android</span></div></div><ArrowUpRight className="project-arrow"/></div>
        </motion.article>
      </div>
    </section>

    <section id="ideas" className="section ideas-section">
      <motion.div {...fade} className="section-heading"><span className="section-index">04 / IDEAS & COLLABORATION</span><h2>{t.ideasTitle}</h2><p>{t.ideasIntro}</p></motion.div>
      <div className="ideas-grid">
        <motion.article {...fade} className="idea-card"><div className="idea-icon"><Lightbulb/></div><span className="idea-number">01</span><h3>{t.ideaOneTitle}</h3><p>{t.ideaOneText}</p><span className="idea-decoration">IDEATE / EXPLORE</span></motion.article>
        <motion.article {...fade} className="idea-card idea-card-accent"><div className="idea-icon"><Rocket/></div><span className="idea-number">02</span><h3>{t.ideaTwoTitle}</h3><p>{t.ideaTwoText}</p><a href="https://t.me/Abolfazldh289" target="_blank" rel="noreferrer" className="idea-link">Start a conversation <ArrowUpRight size={16}/></a></motion.article>
      </div>
    </section>

    <section id="contact" className="contact-section">
      <div className="contact-glow"/><motion.div {...fade} className="contact-inner"><span className="section-index">05 / CONTACT</span><h2>{t.contactTitle}</h2><p>{t.contactText}</p><a className="button-primary" href="https://t.me/Abolfazldh289" target="_blank" rel="noreferrer">{t.contactButton}<Send size={17}/></a>
        <div className="social-links">
          <a href="https://github.com/Abolfazldh289" target="_blank" rel="noreferrer" aria-label="GitHub"><Github/></a>
          <a href="https://www.linkedin.com/in/mr-duck-b8846144a" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin/></a>
          <a href="https://t.me/Abolfazldh289" target="_blank" rel="noreferrer" aria-label="Telegram"><Send/></a>
        </div>
        <p className="social-note">{isFa ? 'اینستاگرام پس از دریافت آیدی اضافه می‌شود.' : 'Instagram will be added once the handle is confirmed.'}</p>
      </motion.div>
    </section>
    <footer className="site-footer"><span>© {new Date().getFullYear()} Abolfazl</span><span>{t.footer}</span><a href="#home">{t.backTop} ↑</a></footer>

    {project && <div className="project-modal-backdrop" role="presentation" onMouseDown={e => e.target === e.currentTarget && setActiveProject(null)}>
      <motion.div className="project-modal" role="dialog" aria-modal="true" aria-label={project.title} initial={reduceMotion ? false : { opacity: 0, y: 30, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .3 }}>
        <button className="modal-close" onClick={() => setActiveProject(null)} aria-label={t.close}><X/></button>
        <div className="modal-heading"><span className="section-index">{t.projectLabel} / {project.status === 'published' ? t.projectStatus : t.inProgress}</span><h2>{project.title}</h2><p>{projectText.desc}</p></div>
        <h3 className="modal-subtitle">{t.screenshots}</h3>
        <div className="modal-gallery">{project.gallery.map((src,i) => <div className="modal-shot" key={src}><Image src={src} alt={`${project.title} screenshot ${i+1}`} fill sizes="(max-width: 700px) 70vw, 240px"/></div>)}</div>
        <div className="modal-columns"><div><h3 className="modal-subtitle">{t.technologies}</h3><div className="project-tags">{project.stack.map(s=><span key={s}>{s}</span>)}</div></div><div><h3 className="modal-subtitle">{isFa ? 'امکانات کلیدی' : 'Key features'}</h3><ul className="feature-list">{projectText.features.map(f=><li key={f}><CheckCircle2 size={15}/>{f}</li>)}</ul></div></div>
        {activeProject === 'simple' ? <div className="modal-action-row"><a className="button-primary" href={project.url} target="_blank" rel="noreferrer">{t.openStore}<ExternalLink size={16}/></a><span className="modal-note">{t.noApk}</span></div> : <div className="development-note"><ShieldCheck/><div><strong>{isFa ? 'حریم خصوصی و معماری آفلاین' : 'Privacy-first, offline architecture'}</strong><p>{t.statusNote}</p></div></div>}
      </motion.div>
    </div>}
  </main>;
}
