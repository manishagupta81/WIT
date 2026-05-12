import data from '../data/eventData.json';

export default function Torch() {
  return (
    <section className="torch" id="torch">
      <div className="container">
        <div className="section-header">
          <h2>Passing the Torch</h2>
          <p>Celebrating the journey and welcoming the next generation of WIT leadership.</p>
        </div>
        <div className="torch-leaders">
          {data.torch.map((l) => (
            <div className="torch-person" key={l.name}>
              <div className="avatar">{l.initial}</div>
              <h3>{l.name}</h3>
              <div className="title">{l.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
