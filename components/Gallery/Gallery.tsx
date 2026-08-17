'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import styles from './Gallery.module.css';

type GalleryItem = {
  id: number;
  src: string;
  alt: string;
  category: string;
  span: 'tall' | 'wide' | 'square' | 'hero';
  year?: string;
};

const galleryItems: GalleryItem[] = [
  { id: 1, src: '/images/gallery3.jpg', alt: 'Rooftop Live Set — Colombo', category: 'Live Shows', span: 'hero', year: '2026' },
  { id: 2, src: '/images/gallery4.jpg', alt: 'Luxury Venue VIP Night', category: 'Events', span: 'wide', year: '2025' },
  { id: 3, src: '/images/crowd.jpg', alt: 'Festival Crowd Energy', category: 'Live Shows', span: 'wide', year: '2025' },
  { id: 4, src: '/images/gallery1.jpg', alt: 'Behind the Decks', category: 'Behind the Scenes', span: 'tall', year: '2026' },
  { id: 5, src: '/images/gallery2.jpg', alt: 'Pioneer CDJ Setup', category: 'Behind the Scenes', span: 'square', year: '2024' },
  { id: 6, src: '/images/equipment.jpg', alt: 'Pro Equipment Setup', category: 'Equipment', span: 'square', year: '2024' },
  { id: 7, src: '/images/mix1.jpg', alt: 'Midnight Gold Sessions', category: 'Studio', span: 'square', year: '2025' },
  { id: 8, src: '/images/dj_profile.jpg', alt: 'DJ Malith Editorial', category: 'Events', span: 'tall', year: '2026' },
];

const categories = ['All', 'Live Shows', 'Events', 'Behind the Scenes', 'Equipment', 'Studio'];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const filtered = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(i => i.category === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Keyboard nav for lightbox
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lightbox) return;
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') navigateLightbox(1);
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightbox, lightboxIndex, filtered]);

  const openLightbox = (item: GalleryItem) => {
    const idx = filtered.indexOf(item);
    setLightboxIndex(idx);
    setLightbox(item);
  };

  const navigateLightbox = useCallback((dir: number) => {
    setLightboxIndex(prev => {
      const next = (prev + dir + filtered.length) % filtered.length;
      setLightbox(filtered[next]);
      return next;
    });
  }, [filtered]);

  // Mouse parallax for hero item
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  };

  return (
    <section id="gallery" className={styles.gallery} ref={sectionRef}>
      {/* Section BG */}
      <div className={styles.bgDecor} />

      <div className="container">
        {/* Header */}
        <div className={`${styles.header} reveal`}>
          <span className="section-label">Gallery</span>
          <h2 className="section-title">
            Moments That <span className="gradient-text">Define</span> the Night
          </h2>
          <p className="section-subtitle">
            Every frame tells a story. Explore the worlds DJ Malith has ignited across Sri Lanka.
          </p>
        </div>

        {/* Category Filter */}
        <div className={`${styles.filterBar} reveal`}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
              {activeCategory === cat && <span className={styles.filterPill} />}
            </button>
          ))}
        </div>

        {/* ── HERO ITEM (first item if visible) ── */}
        {filtered[0]?.span === 'hero' && (
          <div
            className={`${styles.heroItem} reveal`}
            onClick={() => openLightbox(filtered[0])}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
          >
            <div
              className={styles.heroImageWrap}
              style={{ transform: `perspective(1200px) rotateY(${mousePos.x * 2}deg) rotateX(${-mousePos.y * 2}deg)` }}
            >
              <Image src={filtered[0].src} alt={filtered[0].alt} fill className={styles.heroImage} priority />
              <div className={styles.heroOverlay} />
              <div className={styles.heroContent}>
                <span className={styles.heroCat}>{filtered[0].category}</span>
                <h3 className={styles.heroCaption}>{filtered[0].alt}</h3>
                <div className={styles.heroMeta}>
                  <span className={styles.heroYear}>{filtered[0].year}</span>
                  <div className={styles.heroViewBtn}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                    </svg>
                    View Full
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.heroSideTag}>
              <span>Featured</span>
            </div>
          </div>
        )}

        {/* ── MASONRY GRID ── */}
        <div className={styles.masonryGrid}>
          {(filtered[0]?.span === 'hero' ? filtered.slice(1) : filtered).map((item, i) => (
            <div
              key={item.id}
              className={`${styles.gridItem} ${styles[`span_${item.span}`]} reveal`}
              style={{ transitionDelay: `${i * 0.07}s` }}
              onClick={() => openLightbox(item)}
            >
              <div className={styles.imgWrap}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className={styles.img}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Category strip */}
                <div className={styles.categoryStrip}>{item.category}</div>
                {/* Overlay on hover */}
                <div className={styles.imgOverlay}>
                  <div className={styles.overlayContent}>
                    <div className={styles.overlayZoom}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/>
                      </svg>
                    </div>
                    <p className={styles.overlayCaption}>{item.alt}</p>
                    {item.year && <span className={styles.overlayYear}>{item.year}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div className={styles.lightbox} onClick={() => setLightbox(null)}>
          {/* Close */}
          <button className={styles.lbClose} onClick={() => setLightbox(null)} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>

          {/* Prev / Next */}
          <button className={`${styles.lbNav} ${styles.lbPrev}`} onClick={e => { e.stopPropagation(); navigateLightbox(-1); }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button className={`${styles.lbNav} ${styles.lbNext}`} onClick={e => { e.stopPropagation(); navigateLightbox(1); }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>

          {/* Image */}
          <div className={styles.lbContent} onClick={e => e.stopPropagation()}>
            <div className={styles.lbImgWrap}>
              <Image src={lightbox.src} alt={lightbox.alt} fill className={styles.lbImage} />
            </div>
            <div className={styles.lbMeta}>
              <span className={styles.lbCat}>{lightbox.category}</span>
              <h3 className={styles.lbCaption}>{lightbox.alt}</h3>
              <span className={styles.lbCounter}>{lightboxIndex + 1} / {filtered.length}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
