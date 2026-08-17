'use client';

import { useEffect, useRef } from 'react';
import styles from './Events.module.css';

const events = [
  {
    id: 1,
    date: { day: '24', month: 'AUG', year: '2026' },
    title: 'Neon Nights Festival',
    venue: 'Club Silk, Colombo',
    type: 'Festival',
    time: '10:00 PM — 4:00 AM',
    status: 'upcoming',
    tickets: true,
  },
  {
    id: 2,
    date: { day: '06', month: 'SEP', year: '2026' },
    title: 'Gold & Glass Private Party',
    venue: 'Cinnamon Grand Rooftop, Colombo',
    type: 'Private Event',
    time: '8:00 PM — 2:00 AM',
    status: 'upcoming',
    tickets: false,
  },
  {
    id: 3,
    date: { day: '18', month: 'SEP', year: '2026' },
    title: 'Malith Live @ Elevate',
    venue: 'Elevate Nightclub, Kandy',
    type: 'Club Night',
    time: '11:00 PM — 5:00 AM',
    status: 'upcoming',
    tickets: true,
  },
  {
    id: 4,
    date: { day: '04', month: 'OCT', year: '2026' },
    title: 'Sri Lanka Music Awards',
    venue: 'BMICH, Colombo',
    type: 'Awards Show',
    time: '7:00 PM — 12:00 AM',
    status: 'upcoming',
    tickets: true,
  },
  {
    id: 5,
    date: { day: '15', month: 'NOV', year: '2026' },
    title: 'Sunset Sessions Galle',
    venue: 'Galle Fort, Galle',
    type: 'Outdoor',
    time: '4:00 PM — 10:00 PM',
    status: 'upcoming',
    tickets: true,
  },
];

export default function Events() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
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
    <section id="events" className={styles.events} ref={sectionRef}>
      <div className={styles.bgAccent} />

      <div className="container">
        {/* Header */}
        <div className={`${styles.header} reveal`}>
          <span className="section-label">Upcoming</span>
          <h2 className="section-title">
            Live <span className="gradient-text">Events</span>
          </h2>
          <p className="section-subtitle">
            Catch DJ Malith live at these exclusive upcoming shows. Every performance is a unique experience designed to move you.
          </p>
        </div>

        {/* Event list */}
        <div className={styles.eventList}>
          {events.map((event, i) => (
            <div
              key={event.id}
              className={`${styles.eventCard} reveal`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Date block */}
              <div className={styles.dateBlock}>
                <span className={styles.dateDay}>{event.date.day}</span>
                <span className={styles.dateMonth}>{event.date.month}</span>
                <span className={styles.dateYear}>{event.date.year}</span>
              </div>

              {/* Connector line */}
              <div className={styles.connector}>
                <div className={styles.connectorDot} />
                {i < events.length - 1 && <div className={styles.connectorLine} />}
              </div>

              {/* Event info */}
              <div className={styles.eventInfo}>
                <div className={styles.eventTop}>
                  <span className={styles.eventType}>{event.type}</span>
                  <div className={styles.eventTime}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {event.time}
                  </div>
                </div>

                <h3 className={styles.eventTitle}>{event.title}</h3>

                <div className={styles.eventVenue}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  {event.venue}
                </div>
              </div>

              {/* Ticket button */}
              <div className={styles.eventAction}>
                {event.tickets ? (
                  <a href="#" className={styles.ticketBtn}>
                    Get Tickets
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>
                ) : (
                  <span className={styles.privateTag}>Private Event</span>
                )}
              </div>

              {/* Hover glow */}
              <div className={styles.cardGlow} />
            </div>
          ))}
        </div>

        {/* View all */}
        <div className={`${styles.viewAll} reveal`}>
          <button className="btn btn-secondary">
            View All Events
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
