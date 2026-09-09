'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Reels.module.css';

const reels = [
  { id: 1, title: 'Live at Neon Nights', views: '12K', cover: '/images/gallery1.jpg' },
  { id: 2, title: 'Epic Drop @ Club Silk', views: '45K', cover: '/images/gallery2.jpg' },
  { id: 3, title: 'Sunset Chill Mix', views: '8K', cover: '/images/gallery3.jpg' },
  { id: 4, title: 'VIP Afterparty Vibes', views: '22K', cover: '/images/gallery4.jpg' },
];

export default function Reels() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="reels" className={styles.reelsSection} ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className={`${styles.header} reveal`}>
          <span className="section-label">Socials</span>
          <h2 className="section-title">
            Recent <span className="gradient-text">Reels</span>
          </h2>
          <p className="section-subtitle">
            Catch the latest energy and behind-the-scenes action straight from Instagram.
          </p>
        </div>

        {/* Grid */}
        <div className={styles.reelsGrid}>
          {reels.map((reel, i) => (
            <div 
              key={reel.id} 
              className={`${styles.reelCard} reveal`}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={reel.cover}
                  alt={reel.title}
                  fill
                  className={styles.reelImage}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className={styles.overlay}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              <div className={styles.reelInfo}>
                <h3 className={styles.reelTitle}>{reel.title}</h3>
                <span className={styles.reelViews}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                  {reel.views} Views
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className={`${styles.ctaContainer} reveal`}>
          <a href="#" className="btn btn-secondary" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            Follow on Instagram
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
