'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Contact.module.css';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', eventType: '', date: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/malith.harshajeewa.1/',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
        </svg>
      ),
    },
    {
      name: 'Instagram',
      url: '#',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      ),
    },
    {
      name: 'YouTube',
      url: '#',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
          <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#000"/>
        </svg>
      ),
    },
    {
      name: 'SoundCloud',
      url: '#',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.56 8.87V17h8.76c1.26 0 1.68-1.32 0-1.32h-7.44V8.87c0-2.16-3.32-2.16-3.32 0zM1.5 14.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5S5.38 12 4 12s-2.5 1.12-2.5 2.5z"/>
        </svg>
      ),
    },
  ];

  return (
    <section id="contact" className={styles.contact} ref={sectionRef}>
      <div className={styles.bgDecors}>
        <div className={styles.bgGold} />
        <div className={styles.bgRose} />
      </div>

      <div className="container">
        <div className={styles.inner}>
          {/* Left panel */}
          <div className={`${styles.infoPanel} reveal`}>
            <span className="section-label">Contact</span>
            <h2 className={`${styles.contactTitle} section-title`}>
              Book DJ <span className="gradient-text">Malith</span>
            </h2>
            <p className={styles.contactSubtitle}>
              Ready to elevate your event to world-class levels? Let&apos;s create an unforgettable experience together.
            </p>

            <div className={styles.contactDetails}>
              {[
                { icon: '📧', label: 'Email', value: 'djmalith@gmail.com' },
                { icon: '📞', label: 'Phone', value: '+94 77 XXX XXXX' },
                { icon: '📍', label: 'Based in', value: 'Colombo, Sri Lanka' },
                { icon: '🌐', label: 'Available', value: 'Worldwide' },
              ].map(item => (
                <div key={item.label} className={styles.contactItem}>
                  <span className={styles.contactIcon}>{item.icon}</span>
                  <div>
                    <span className={styles.contactLabel}>{item.label}</span>
                    <span className={styles.contactValue}>{item.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className={styles.socials}>
              <p className={styles.socialsLabel}>Follow the journey</p>
              <div className={styles.socialLinks}>
                {socialLinks.map(s => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialBtn}
                    aria-label={s.name}
                    title={s.name}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className={`${styles.formPanel} liquid-glass reveal reveal-delay-2`}>
            {submitted ? (
              <div className={styles.successMsg}>
                <div className={styles.successIcon}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h3 className={styles.successTitle}>Message Sent!</h3>
                <p className={styles.successText}>
                  Thank you for reaching out. DJ Malith will get back to you within 24 hours.
                </p>
                <button
                  className="btn btn-secondary"
                  onClick={() => setSubmitted(false)}
                  style={{ marginTop: '20px' }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <>
                <h3 className={styles.formTitle}>Booking Enquiry</h3>
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label htmlFor="name" className={styles.label}>Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="email" className={styles.label}>Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label htmlFor="phone" className={styles.label}>Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="+94 77 XXX XXXX"
                      />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="date" className={styles.label}>Event Date</label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className={`${styles.input} ${styles.inputDate}`}
                      />
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="eventType" className={styles.label}>Event Type</label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className={styles.select}
                    >
                      <option value="">Select event type</option>
                      <option>Private Party</option>
                      <option>Club Night</option>
                      <option>Festival / Concert</option>
                      <option>Wedding</option>
                      <option>Corporate Event</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="message" className={styles.label}>Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className={styles.textarea}
                      placeholder="Tell us about your event, expected audience size, venue..."
                      rows={4}
                    />
                  </div>

                  <button type="submit" id="contact-submit-btn" className={`${styles.submitBtn} btn btn-primary`}>
                    Send Booking Request
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
