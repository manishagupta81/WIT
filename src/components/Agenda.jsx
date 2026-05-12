import data from '../data/eventData.json';

export default function Agenda() {
  return (
    <section className="agenda" id="agenda">
      <div className="container">
        <div className="section-header">
          <h2>Event Agenda</h2>
          <p>6 hours of keynotes, demos, panels, and networking — all under one roof.</p>
        </div>
        <div className="timeline">
          {data.agenda.map((item, i) => (
            <div className={`t-item ${item.variant || ''}`} key={i}>
              <div className="t-dot" />
              <div className="t-time">{item.time}</div>
              <div className="t-card">
                <h3>{item.title}</h3>
                {item.speaker && <div className="t-speaker">{item.speaker}</div>}
                {item.description && <p>{item.description}</p>}
                {item.tag && <span className={`t-tag ${item.tagClass}`}>{item.tag}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
