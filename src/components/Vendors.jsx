import data from '../data/eventData.json';

export default function Vendors() {
  return (
    <section className="vendors" id="vendors">
      <div className="container">
        <div className="section-header">
          <h2>Technology Partners</h2>
          <p>Demo roadmaps and office hours with leading AI and integration platforms.</p>
        </div>
        <div className="vendor-grid">
          {data.vendors.map((v) => (
            <div className="vendor-card" key={v.name}>
              <div className="vendor-logo" style={{ color: v.color }}>{v.name}</div>
              <p>{v.description}</p>
              <div className="office-hours">{v.officeHours}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
