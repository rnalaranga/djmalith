import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop} />

      <div className={`${styles.footerInner} container`}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.brandLogo}>
            <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="15" stroke="url(#fLogoGrad)" strokeWidth="1.5"/>
              <circle cx="16" cy="16" r="5" fill="url(#fLogoGrad)"/>
              <path d="M16 4L16 11M16 21L16 28M4 16L11 16M21 16L28 16" stroke="url(#fLogoGrad)" strokeWidth="1.2"/>
              <defs>
                <linearGradient id="fLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d91c29"/>
                  <stop offset="100%" stopColor="#a10b14"/>
                </linearGradient>
              </defs>
            </svg>
            <span className={styles.brandName}>DJ <span className={styles.brandAccent}>MALITH</span></span>
          </div>
          <p className={styles.brandTagline}>
            Turning moments into memories through the universal language of music.
          </p>
          <div className={styles.socialRow}>
            {[
              { href: 'https://www.facebook.com/malith.harshajeewa.1/', label: 'FB' },
              { href: '#', label: 'IG' },
              { href: '#', label: 'YT' },
              { href: '#', label: 'SC' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className={styles.links}>
          <h4 className={styles.linksTitle}>Navigation</h4>
          <ul className={styles.linksList}>
            {['Home', 'About', 'Music', 'Events', 'Gallery', 'Contact'].map(l => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className={styles.link}>{l}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className={styles.links}>
          <h4 className={styles.linksTitle}>Services</h4>
          <ul className={styles.linksList}>
            {['Club Nights', 'Private Parties', 'Weddings', 'Corporate Events', 'Festivals', 'Online Mixes'].map(s => (
              <li key={s}><span className={styles.serviceItem}>{s}</span></li>
            ))}
          </ul>
        </div>

        {/* Contact info */}
        <div className={styles.contactInfo}>
          <h4 className={styles.linksTitle}>Get in Touch</h4>
          <div className={styles.infoList}>
            <p className={styles.infoItem}>
              <span className={styles.infoIcon}>✉</span>djmalith@gmail.com
            </p>
            <p className={styles.infoItem}>
              <span className={styles.infoIcon}>📞</span>+94 77 XXX XXXX
            </p>
            <p className={styles.infoItem}>
              <span className={styles.infoIcon}>📍</span>Colombo, Sri Lanka
            </p>
          </div>
          <a href="#contact" className={styles.bookBtn}>
            Book Now
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.footerBottom}>
        <div className={`${styles.footerBottomInner} container`}>
          <p className={styles.copyright}>
            © {year} DJ Malith. All Rights Reserved.
          </p>
          <div className={styles.bottomLine} />
          <p className={styles.credit}>
            Made with <span className={styles.heart}>♥</span> for the love of music
          </p>
        </div>
      </div>
    </footer>
  );
}
