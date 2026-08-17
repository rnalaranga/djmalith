'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#music', label: 'Music' },
  { href: '#events', label: 'Events' },
  { href: '#packages', label: 'Packages' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setVisible(y < lastScrollY.current || y < 100);
      lastScrollY.current = y;

      // Active section
      const sections = navLinks.map(l => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.offsetTop - 120 <= y) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} ${!visible ? styles.hidden : ''}`}>
      <div className={`${styles.navInner} container`}>
        {/* Logo */}
        <a
          href="#home"
          className={styles.logo}
          onClick={e => { e.preventDefault(); handleNavClick('#home'); }}
        >
          <span className={styles.logoIcon}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="15" stroke="url(#logoGrad)" strokeWidth="1.5"/>
              <circle cx="16" cy="16" r="5" fill="url(#logoGrad)"/>
              <path d="M16 4 L16 11 M16 21 L16 28 M4 16 L11 16 M21 16 L28 16" stroke="url(#logoGrad)" strokeWidth="1.2"/>
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d91c29"/>
                  <stop offset="100%" stopColor="#a10b14"/>
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className={styles.logoText}>
            DJ <span className={styles.logoAccent}>Malith</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className={styles.navLinks}>
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`${styles.navLink} ${activeSection === link.href.slice(1) ? styles.active : ''}`}
                onClick={e => { e.preventDefault(); handleNavClick(link.href); }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className={styles.navCta}
          onClick={e => { e.preventDefault(); handleNavClick('#contact'); }}
        >
          Book Now
        </a>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`}>
        <ul className={styles.mobileLinks}>
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`${styles.mobileLink} ${activeSection === link.href.slice(1) ? styles.mobileActive : ''}`}
                onClick={e => { e.preventDefault(); handleNavClick(link.href); }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className={styles.mobileCta}
              onClick={e => { e.preventDefault(); handleNavClick('#contact'); }}
            >
              Book Now
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
