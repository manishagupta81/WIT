import data from '../data/eventData.json';

export default function Mentorship({ onOpenChat }) {
  const { mentorship } = data;
  return (
    <section className="mentorship" id="mentorship">
      <div className="container">
        <div className="section-header">
          <h2>{mentorship.headline}</h2>
          <p>{mentorship.subtitle}</p>
        </div>
        <div className="mentorship-content">
          <p>{mentorship.body}</p>
          <div className="cta-box">
            <h3>{mentorship.ctaTitle}</h3>
            <p>{mentorship.ctaBody}</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => onOpenChat('mentor')}>I Want to Mentor</button>
              <button className="btn btn-primary" onClick={() => onOpenChat('mentee')}>I Want to Be a Mentee</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
