import { useState } from 'react';
import data from '../data/eventData.json';
import TrackRegistration from './TrackRegistration';

export default function Tracks() {
  const { tracks } = data;
  const [selectedTrack, setSelectedTrack] = useState(null);

  return (
    <section className="tracks" id="tracks">
      <div className="container">
        <div className="section-header">
          <h2>Parallel Tracks — {tracks.time}</h2>
          <p>{tracks.description}</p>
        </div>
        <div className="tracks-grid">
          {tracks.items.map((track) => (
            <div className="track-card" key={track.name}>
              <div className="track-header" style={{ borderBottomColor: track.color }}>
                <span className="track-icon">{track.icon}</span>
                <h3>{track.name}</h3>
                <p className="track-desc">{track.description}</p>
              </div>
              <ul className="track-sessions">
                {track.sessions.map((s) => (
                  <li key={s.title}>
                    <div className="session-title">
                      <span className="session-dot" style={{ background: track.color }} />
                      {s.title}
                    </div>
                    <p className="session-desc">{s.description}</p>
                    <span className="session-duration">{s.duration}</span>
                  </li>
                ))}
              </ul>
              <div className="track-register">
                <button
                  className="btn btn-track-register"
                  style={{ background: track.color }}
                  onClick={() => setSelectedTrack(track)}
                >
                  Register for this Track
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedTrack && (
        <TrackRegistration track={selectedTrack} onClose={() => setSelectedTrack(null)} />
      )}
    </section>
  );
}
