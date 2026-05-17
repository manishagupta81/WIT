import { useState } from 'react';

const styles = {
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,31,23,0.6)',
    backdropFilter: 'blur(4px)', zIndex: 10000,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '1rem',
  },
  modal: {
    background: '#fff', borderRadius: '20px', maxWidth: '460px', width: '100%',
    maxHeight: '90vh', overflowY: 'auto',
    boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
  },
  header: {
    padding: '1.5rem 2rem', borderRadius: '20px 20px 0 0', color: '#fff',
  },
  headerTitle: { fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.2rem' },
  headerSub: { fontSize: '0.82rem', opacity: 0.85 },
  body: { padding: '1.5rem 2rem 2rem' },
  field: { marginBottom: '1.1rem' },
  label: {
    display: 'block', fontSize: '0.85rem', fontWeight: 600,
    color: '#003B2D', marginBottom: '0.35rem',
  },
  input: {
    width: '100%', padding: '0.65rem 1rem', border: '1px solid #d8e0dc',
    borderRadius: '10px', fontSize: '0.9rem', outline: 'none',
  },
  actions: {
    display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.25rem',
  },
  btnSubmit: {
    padding: '0.65rem 1.6rem', borderRadius: '50px', fontSize: '0.9rem',
    fontWeight: 600, border: 'none', cursor: 'pointer',
    color: '#fff', transition: 'background 0.2s',
  },
  btnCancel: {
    padding: '0.65rem 1.6rem', borderRadius: '50px', fontSize: '0.9rem',
    fontWeight: 600, border: '2px solid #d8e0dc', cursor: 'pointer',
    background: 'transparent', color: '#5A6F68',
  },
  success: { textAlign: 'center', padding: '2.5rem 2rem' },
  successIcon: { fontSize: '2.5rem', marginBottom: '0.75rem' },
  successTitle: { fontSize: '1.1rem', fontWeight: 700, color: '#003B2D', marginBottom: '0.4rem' },
  successText: { fontSize: '0.88rem', color: '#5A6F68', marginBottom: '1.25rem' },
};

export default function TrackRegistration({ track, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ fullName: '', department: '', email: '' });

  function handleChange(field) {
    return (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(`[Track Registration — ${track.name}]`, form);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div style={styles.overlay} onClick={onClose}>
        <div style={styles.modal} onClick={e => e.stopPropagation()}>
          <div style={{ ...styles.header, background: track.color }}>
            <div style={styles.headerTitle}>{track.name}</div>
          </div>
          <div style={styles.success}>
            <div style={styles.successIcon}>✅</div>
            <div style={styles.successTitle}>You're Registered!</div>
            <p style={styles.successText}>
              You've registered for <strong>{track.name}</strong> (10:30 AM – 12:00 PM). We'll send details to your email before the event.
            </p>
            <button style={{ ...styles.btnSubmit, background: track.color }} onClick={onClose}>Done</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <div style={{ ...styles.header, background: track.color }}>
          <div style={styles.headerTitle}>Register: {track.name}</div>
          <div style={styles.headerSub}>{track.description}</div>
        </div>
        <form style={styles.body} onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Full Name *</label>
            <input
              style={styles.input}
              value={form.fullName}
              onChange={handleChange('fullName')}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Department *</label>
            <input
              style={styles.input}
              value={form.department}
              onChange={handleChange('department')}
              placeholder="e.g., IT, InfoSec, CCO, Investments"
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Email Address *</label>
            <input
              style={styles.input}
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              placeholder="your.name@company.com"
              required
            />
          </div>
          <div style={styles.actions}>
            <button type="button" style={styles.btnCancel} onClick={onClose}>Cancel</button>
            <button type="submit" style={{ ...styles.btnSubmit, background: track.color }}>Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}
