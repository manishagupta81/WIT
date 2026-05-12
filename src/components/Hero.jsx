import data from '../data/eventData.json';

export default function Hero() {
  const { event } = data;
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-badge">{event.organization} &bull; Bessemer</div>
        <h1>B<span className="highlight">Innovative</span> <span style={{ fontSize: '0.5em', fontWeight: 400, opacity: 0.85 }}>with</span> <span className="highlight">Women in Tech</span></h1>
        <p className="subtitle">{event.tagline}</p>
        <p className="meta">
          <strong>{event.date}</strong> &nbsp;|&nbsp; {event.time} &nbsp;|&nbsp; {event.location} &nbsp;|&nbsp; {event.format}
        </p>
        <div className="hero-cta">
          <a href="#agenda" className="btn btn-primary">View Agenda</a>
          <a href="#mentorship" className="btn btn-outline">Mentor / Mentee Sign-Up</a>
        </div>
      </div>
    </section>
  );
}
