import data from '../data/eventData.json';

export default function Footer() {
  return (
    <footer>
      <p>{data.event.title} &bull; Hosted by <strong>{data.event.organization}</strong> &bull; Bessemer</p>
      <p style={{ marginTop: '0.3rem', fontSize: '0.8rem' }}>Empowering innovation through inclusion.</p>
    </footer>
  );
}
