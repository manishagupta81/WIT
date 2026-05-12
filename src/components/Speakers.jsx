import data from '../data/eventData.json';

export default function Speakers() {
  return (
    <section className="speakers" id="speakers">
      <div className="container">
        <div className="section-header">
          <h2>Speakers &amp; Leaders</h2>
          <p>The voices driving innovation and inclusion forward.</p>
        </div>
        <div className="speakers-grid">
          {data.speakers.map((s) => (
            <div className="speaker-card" key={s.name + s.role}>
              <div className="speaker-avatar">{s.initial}</div>
              <h3>{s.name}</h3>
              <div className="role">{s.role}</div>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
