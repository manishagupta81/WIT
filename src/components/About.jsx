import data from '../data/eventData.json';

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="section-header">
          <h2>What is BInnovative?</h2>
          <p>A full-day experience bringing together technology leaders, platform innovators, and forward-thinking teams to explore the frontier of AI and enterprise transformation.</p>
        </div>
        <div className="about-grid">
          {data.about.map((c) => (
            <div className="about-card" key={c.title}>
              <div className="about-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
