'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Packages.module.css';

const packages = [
  {
    id: 'silver',
    tier: 'Silver',
    tagline: 'Perfect Start',
    price: '25,000',
    currency: 'LKR',
    duration: '3 Hours',
    highlight: false,
    color: 'silver',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
      </svg>
    ),
    features: [
      '3 Hours Live Set',
      'Professional Sound System',
      'Basic Lighting Setup',
      'Up to 100 Guests',
      'Playlist Consultation',
      'Social Media Shoutout',
    ],
    excluded: ['Custom Song Requests', 'LED Visual Effects', 'Photographer'],
    cta: 'Get Started',
  },
  {
    id: 'gold',
    tier: 'Gold',
    tagline: 'Most Popular',
    price: '55,000',
    currency: 'LKR',
    duration: '5 Hours',
    highlight: true,
    color: 'gold',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    features: [
      '5 Hours Live Set',
      'Premium Sound System',
      'Advanced LED Lighting',
      'Up to 300 Guests',
      'Custom Song Requests',
      'LED Visual Effects',
      'Pre-Event Consultation',
      'Social Media Coverage',
    ],
    excluded: ['Professional Photographer'],
    cta: 'Book This Package',
  },
  {
    id: 'platinum',
    tier: 'Platinum',
    tagline: 'Ultimate Experience',
    price: '120,000',
    currency: 'LKR',
    duration: '8 Hours',
    highlight: false,
    color: 'rose',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    features: [
      '8 Hours Live Set',
      'World-Class Sound System',
      'Full LED + Visual FX Stage',
      'Unlimited Guests',
      'Unlimited Custom Requests',
      'Live Mixing Broadcast',
      'Professional Photographer',
      'Post-Event Mix Recording',
      'Dedicated Event Manager',
      'VIP After-Party Set',
    ],
    excluded: [],
    cta: 'Go Platinum',
  },
];

const addOns = [
  { name: 'Extra Hour', price: '10,000 LKR' },
  { name: 'Live Saxophone / Percussion', price: '15,000 LKR' },
  { name: 'Event Teaser Video', price: '20,000 LKR' },
  { name: 'Live Stream Setup', price: '25,000 LKR' },
];

export default function Packages() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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

  const handleBook = (tier: string) => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="packages" className={styles.packages} ref={sectionRef}>
      {/* Animated BG */}
      <div className={styles.bgImage} />
      <div className={styles.bgOverlay} />
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />

      {/* Floating orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      <div className={`${styles.inner} container`}>
        {/* Header */}
        <div className={`${styles.header} reveal`}>
          <span className="section-label">Packages</span>
          <h2 className={`section-title ${styles.title}`}>
            Choose Your <span className="gradient-text">Experience</span>
          </h2>
          <p className={`section-subtitle ${styles.subtitle}`}>
            Every event is unique. Choose the package that matches your vision, or let us craft something custom just for you.
          </p>
        </div>

        {/* Package Cards */}
        <div className={styles.cardsGrid}>
          {packages.map((pkg, i) => (
            <div
              key={pkg.id}
              className={`${styles.card} ${pkg.highlight ? styles.cardHighlight : ''} ${styles[`card_${pkg.color}`]} reveal`}
              style={{ transitionDelay: `${i * 0.15}s` }}
              onMouseEnter={() => setHoveredCard(pkg.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Shine sweep effect */}
              <div className={styles.cardShine} />

              {/* Top bar */}
              {pkg.highlight && (
                <div className={styles.popularBadge}>
                  <span className={styles.popularDot} />
                  Most Popular
                </div>
              )}

              {/* Icon + Tier */}
              <div className={styles.cardHeader}>
                <div className={styles.tierIcon}>{pkg.icon}</div>
                <div>
                  <div className={styles.tierLabel}>{pkg.tagline}</div>
                  <h3 className={styles.tierName}>{pkg.tier}</h3>
                </div>
              </div>

              {/* Price */}
              <div className={styles.priceBlock}>
                <span className={styles.currency}>{pkg.currency}</span>
                <span className={styles.price}>{pkg.price}</span>
                <div className={styles.priceMeta}>
                  <span className={styles.duration}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {pkg.duration}
                  </span>
                  <span className={styles.perEvent}>/ event</span>
                </div>
              </div>

              {/* Divider */}
              <div className={styles.cardDivider} />

              {/* Features */}
              <ul className={styles.featureList}>
                {pkg.features.map(f => (
                  <li key={f} className={styles.featureItem}>
                    <span className={styles.featureCheck}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
                {pkg.excluded.map(f => (
                  <li key={f} className={`${styles.featureItem} ${styles.featureExcluded}`}>
                    <span className={styles.featureCross}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`${styles.ctaBtn} ${pkg.highlight ? styles.ctaBtnHighlight : ''}`}
                onClick={() => handleBook(pkg.tier)}
              >
                {pkg.cta}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>

              {/* Hover glow */}
              <div className={`${styles.cardGlow} ${hoveredCard === pkg.id ? styles.cardGlowVisible : ''}`} />
            </div>
          ))}
        </div>

        {/* Add-ons strip */}
        <div className={`${styles.addOns} reveal`}>
          <div className={styles.addOnsInner}>
            <div className={styles.addOnsLabel}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
              </svg>
              Add-On Services
            </div>
            <div className={styles.addOnsList}>
              {addOns.map(a => (
                <div key={a.name} className={styles.addOnItem}>
                  <span className={styles.addOnName}>{a.name}</span>
                  <span className={styles.addOnPrice}>{a.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Custom note */}
        <div className={`${styles.customNote} reveal`}>
          <div className={styles.customIcon}>✨</div>
          <p>
            Need something special? <strong>All packages can be fully customized.</strong>{' '}
            Contact us to discuss your dream event.
          </p>
          <a
            href="#contact"
            className={styles.customLink}
            onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            Get Custom Quote →
          </a>
        </div>
      </div>
    </section>
  );
}
