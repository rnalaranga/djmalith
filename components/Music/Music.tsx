'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './Music.module.css';

const mixes = [
  {
    id: 1,
    title: 'Midnight Gold Vol. 1',
    genre: 'Deep House',
    duration: '58:24',
    bpm: 125,
    cover: '/images/mix1.jpg',
    description: 'An ethereal journey through the depths of house music, featuring warm basslines and hypnotic melodies.',
    tracks: 18,
    plays: '124K',
    tag: 'Featured',
  },
  {
    id: 2,
    title: 'Rose Neon Nights',
    genre: 'Commercial EDM',
    duration: '1:02:44',
    bpm: 128,
    cover: '/images/mix2.jpg',
    description: 'High-energy festival anthems mixed with precision, designed to light up any stage or dancefloor.',
    tracks: 22,
    plays: '98K',
    tag: 'Latest',
  },
  {
    id: 3,
    title: 'Black Velvet Sessions',
    genre: 'Hip Hop / R&B',
    duration: '47:15',
    bpm: 95,
    cover: '/images/equipment.jpg',
    description: 'A smooth blend of contemporary hip-hop and soulful R&B, perfect for luxury private events.',
    tracks: 15,
    plays: '76K',
    tag: 'Popular',
  },
];

export default function Music() {
  const sectionRef = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const togglePlay = (id: number) => {
    setPlaying(prev => prev === id ? null : id);
  };

  return (
    <section id="music" className={styles.music} ref={sectionRef}>
      <div className={styles.bgDecor}>
        <div className={styles.bgGlow} />
      </div>

      <div className="container">
        {/* Header */}
        <div className={`${styles.header} reveal`}>
          <span className="section-label">Music</span>
          <h2 className={`${styles.title} section-title`}>
            Signature <span className="gradient-text">Mixes</span>
          </h2>
          <p className="section-subtitle">
            Handcrafted sonic journeys that transport you to another dimension. Each mix is a masterclass in energy, flow, and musical storytelling.
          </p>
        </div>

        {/* Mix Cards */}
        <div className={styles.mixGrid}>
          {mixes.map((mix, i) => (
            <div
              key={mix.id}
              className={`${styles.mixCard} liquid-glass reveal`}
              style={{ transitionDelay: `${i * 0.15}s` } as React.CSSProperties}
            >
              {/* Cover */}
              <div className={styles.coverWrapper}>
                <Image
                  src={mix.cover}
                  alt={mix.title}
                  fill
                  className={styles.cover}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className={styles.coverOverlay} />

                {/* Tag */}
                <span className={`${styles.tag} ${styles[`tag${mix.tag}`]}`}>
                  {mix.tag}
                </span>

                {/* Play button */}
                <button
                  className={`${styles.playBtn} ${playing === mix.id ? styles.playing : ''}`}
                  onClick={() => togglePlay(mix.id)}
                  aria-label={playing === mix.id ? 'Pause' : 'Play'}
                >
                  {playing === mix.id ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16"/>
                      <rect x="14" y="4" width="4" height="16"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </button>

                {/* Equalizer animation when playing */}
                {playing === mix.id && (
                  <div className={styles.equalizer}>
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className={styles.eqBar} style={{ animationDelay: `${j * 0.12}s` }} />
                    ))}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className={styles.mixInfo}>
                <div className={styles.mixMeta}>
                  <span className={styles.genre}>{mix.genre}</span>
                  <span className={styles.bpm}>{mix.bpm} BPM</span>
                </div>
                <h3 className={styles.mixTitle}>{mix.title}</h3>
                <p className={styles.mixDesc}>{mix.description}</p>

                {/* Progress bar */}
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: playing === mix.id ? '35%' : '0%' }} />
                </div>
                <div className={styles.progressTimes}>
                  <span>{playing === mix.id ? '20:14' : '0:00'}</span>
                  <span>{mix.duration}</span>
                </div>

                {/* Footer */}
                <div className={styles.mixFooter}>
                  <div className={styles.mixStats}>
                    <span className={styles.mixStat}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                      </svg>
                      {mix.tracks} tracks
                    </span>
                    <span className={styles.mixStat}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                      </svg>
                      {mix.plays} plays
                    </span>
                  </div>
                  <button className={styles.downloadBtn}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SoundCloud / Mixcloud CTA */}
        <div className={`${styles.platformLinks} reveal`}>
          <p className={styles.platformText}>Listen on your favorite platform</p>
          <div className={styles.platforms}>
            {['SoundCloud', 'Mixcloud', 'Spotify', 'YouTube'].map(p => (
              <a key={p} href="#" className={styles.platformBtn}>
                <span>{p}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
