import data from '../data/eventData.json';

export default function Logistics() {
  return (
    <section className="logistics" id="logistics">
      <div className="container">
        <div className="section-header">
          <h2>Event Details</h2>
          <p>Everything you need to know before the day.</p>
        </div>
        <div className="logistics-grid">
          {data.logistics.map((item) => (
            <div className="logistics-item" key={item.title}>
              <div className="logistics-icon">{item.icon}</div>
              <div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
