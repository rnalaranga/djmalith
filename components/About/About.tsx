'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './About.module.css';

const skills = [
  { label: 'Deep House', pct: 95 },
  { label: 'Commercial EDM', pct: 90 },
  { label: 'Hip Hop / R&B', pct: 88 },
  { label: 'Trap & Bass', pct: 85 },
  { label: 'Techno', pct: 78 },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
            // Animate skill bars
            entry.target.querySelectorAll<HTMLElement>('[data-pct]').forEach(el => {
              const pct = el.dataset.pct;
              setTimeout(() => {
                el.style.width = pct + '%';
              }, 500);
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className={styles.about} ref={sectionRef}>
      {/* Background glows */}
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />

      <div className={`${styles.aboutInner} container`}>
        {/* Left: Image */}
        <div className={`${styles.imageCol} reveal`}>
          <div className={styles.imageFrame}>
            <div className={styles.frameDecor} />
            <div className={styles.imageWrapper}>
              <Image
                src="/images/dj_profile.jpg"
                alt="DJ Malith"
                fill
                className={styles.profileImage}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className={styles.imageTint} />
            </div>
            {/* Badge */}
            <div className={styles.badge}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
              <span>Premium DJ</span>
            </div>
            {/* Ring decorator */}
            <div className={styles.ringDecor} />
          </div>

          {/* Floating stats card */}
          <div className={styles.statsCard}>
            <div className={styles.statsCardInner}>
              <div className={styles.miniStat}>
                <span className={styles.miniStatNum}>500+</span>
                <span className={styles.miniStatLabel}>Events</span>
              </div>
              <div className={styles.miniDivider} />
              <div className={styles.miniStat}>
                <span className={styles.miniStatNum}>10+</span>
                <span className={styles.miniStatLabel}>Years</span>
              </div>
              <div className={styles.miniDivider} />
              <div className={styles.miniStat}>
                <span className={styles.miniStatNum}>50+</span>
                <span className={styles.miniStatLabel}>Mixes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Text */}
        <div className={styles.textCol}>
          <div className={`reveal`}>
            <span className="section-label">About Me</span>
          </div>

          <h2 className={`${styles.aboutTitle} reveal reveal-delay-1`}>
            The Art of Sonic<br />
            <span className="gradient-text">Perfection</span>
          </h2>

          <div className="divider" style={{ marginTop: '24px' }} />

          <p className={`${styles.aboutText} reveal reveal-delay-2`}>
            DJ Malith is a world-renowned DJ and music producer with over a decade of experience electrifying crowds across Sri Lanka and beyond. Known for his impeccable ability to read the room and his signature fusion of deep house, commercial EDM, and hip-hop, Malith transforms every event into a transcendent musical journey.
          </p>

          <p className={`${styles.aboutText} reveal reveal-delay-2`} style={{ marginTop: '16px' }}>
            From intimate luxury private parties to massive festival stages, DJ Malith brings an unparalleled energy and technical mastery that keeps audiences coming back for more. His productions are characterized by seamless transitions, layered soundscapes, and an infectious passion for music that resonates deeply with every listener.
          </p>


          {/* Buttons */}
          <div className={`${styles.aboutCtas} reveal reveal-delay-4`}>
            <a href="#contact" className="btn btn-primary" onClick={e => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Book DJ Malith
            </a>
            <a href="#music" className="btn btn-secondary" onClick={e => {
              e.preventDefault();
              document.getElementById('music')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Hear the Mixes
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
