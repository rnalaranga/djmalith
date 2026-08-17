'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';
import Image from 'next/image';

const heroImages = [
  { src: '/images/gallery1.jpg', alt: 'DJ Malith Live Event' },
  { src: '/images/dj_profile.jpg', alt: 'DJ Malith Profile' },
  { src: '/images/crowd.jpg', alt: 'Massive Crowd' },
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleBookNow = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleListenNow = () => {
    document.getElementById('music')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className={styles.hero}>
      {/* Background Image Slider */}
      <div className={styles.sliderContainer}>
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`${styles.slide} ${index === currentImageIndex ? styles.activeSlide : ''}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              className={styles.slideImage}
            />
            {/* Overlay to ensure text readability */}
            <div className={styles.slideOverlay} />
          </div>
        ))}
      </div>

      {/* Decorative Elements */}
      <div className={styles.aurora1} />
      <div className={styles.aurora2} />

      {/* Main Content inside a massive Glass Panel */}
      <div className={`${styles.heroContent} container`}>
        <div className={styles.glassPanel}>
          <div className={styles.textBlock}>
            {/* Label */}
            <div className={styles.heroLabel}>
              <span className={styles.labelDot} />
              <span className={styles.labelLine} />
              World Class DJ &amp; Music Producer
              <span className={styles.labelLine} />
              <span className={styles.labelDot} />
            </div>

            {/* Main heading */}
            <h1 className={styles.heroTitle}>
              <span className={styles.titleLine1}>THE ONE &amp;</span>
              <span className={styles.titleLine2}>ONLY</span>
              <span className={styles.titleDj}>
                DJ <span className={styles.titleMalith}>MALITH</span>
              </span>
            </h1>

            <p className={styles.heroSubtitle}>
              Crafting unforgettable sonic experiences. From luxury private events to massive festival stages — where music becomes magic.
            </p>

            {/* Waveform visualizer */}
            <div className={styles.waveform}>
              {Array.from({ length: 28 }).map((_, i) => (
                <div
                  key={i}
                  className={styles.waveBar}
                  style={{
                    animationDelay: `${i * 0.06}s`,
                    '--wave-h': `${Math.random() * 40 + 10}px`,
                  } as React.CSSProperties}
                />
              ))}
            </div>

            {/* CTAs */}
            <div className={styles.heroCtas}>
              <button id="hero-book-btn" className="btn btn-primary" onClick={handleBookNow}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>
                </svg>
                Book Now
              </button>
              <button id="hero-listen-btn" className="btn btn-secondary" onClick={handleListenNow}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5.14v14l11-7-11-7z"/>
                </svg>
                Listen Now
              </button>
            </div>
            
            {/* Slider Controls (Dots) */}
            <div className={styles.sliderDots}>
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.dot} ${index === currentImageIndex ? styles.activeDot : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel} />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
