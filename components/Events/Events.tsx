'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Events.module.css';

const events = [
  {
    id: 1,
    date: { day: '24', month: 'AUG', year: '2026' },
    fullDate: '2026-08-24',
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
    fullDate: '2026-09-06',
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
    fullDate: '2026-09-18',
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
    fullDate: '2026-10-04',
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
    fullDate: '2026-11-15',
    title: 'Sunset Sessions Galle',
    venue: 'Galle Fort, Galle',
    type: 'Outdoor',
    time: '4:00 PM — 10:00 PM',
    status: 'upcoming',
    tickets: true,
  },
];

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Events() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1)); // September 2026

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

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className={styles.emptyDay}></div>);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const dayEvents = events.filter(e => e.fullDate === dateStr);
    const hasEvent = dayEvents.length > 0;

    days.push(
      <div key={d} className={`${styles.calendarDay} ${hasEvent ? styles.hasEvent : ''}`}>
        <span className={styles.dayNumber}>{d}</span>
        {hasEvent && <div className={styles.eventDot}></div>}
      </div>
    );
  }

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

        <div className={styles.calendarContainer}>
          {/* Calendar View */}
          <div className={`${styles.calendarSection} reveal`}>
            <div className={styles.calendarHeader}>
              <button onClick={prevMonth} className={styles.monthNav}>&lt;</button>
              <h3 className={styles.currentMonth}>{months[month]} {year}</h3>
              <button onClick={nextMonth} className={styles.monthNav}>&gt;</button>
            </div>
            
            <div className={styles.calendarGrid}>
              {daysOfWeek.map(d => (
                <div key={d} className={styles.dayName}>{d}</div>
              ))}
              {days}
            </div>
          </div>

          {/* Event list (sidebar style) */}
          <div className={`${styles.eventListSide} reveal`} style={{ transitionDelay: '0.2s' }}>
            <h3 className={styles.upcomingTitle}>Upcoming Shows</h3>
            <div className={styles.eventSideCards}>
              {events.filter(e => {
                  const evDate = new Date(e.fullDate);
                  return evDate.getFullYear() === year && evDate.getMonth() === month;
                }).length > 0 ? (
                  events.filter(e => {
                    const evDate = new Date(e.fullDate);
                    return evDate.getFullYear() === year && evDate.getMonth() === month;
                  }).map((event) => (
                  <div key={event.id} className={styles.eventSideCard}>
                    <div className={styles.eventSideDate}>
                      <span className={styles.sideDay}>{event.date.day}</span>
                      <span className={styles.sideMonth}>{event.date.month}</span>
                    </div>
                    <div className={styles.eventSideInfo}>
                      <h4 className={styles.sideTitle}>{event.title}</h4>
                      <p className={styles.sideVenue}>{event.venue}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className={styles.noEvents}>No events this month.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
