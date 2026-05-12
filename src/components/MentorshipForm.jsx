import { useState } from 'react';

const formStyles = {
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,31,23,0.6)',
    backdropFilter: 'blur(4px)', zIndex: 10000,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '1rem',
  },
  modal: {
    background: '#fff', borderRadius: '20px', maxWidth: '500px', width: '100%',
    maxHeight: '90vh', overflowY: 'auto',
    boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
  },
  header: {
    background: 'linear-gradient(135deg, #003B2D 0%, #00594A 50%, #007A64 100%)',
    padding: '1.5rem 2rem', borderRadius: '20px 20px 0 0', color: '#fff',
  },
  headerTitle: { fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.3rem' },
  headerSub: { fontSize: '0.85rem', opacity: 0.8 },
  body: { padding: '1.5rem 2rem 2rem' },
  field: { marginBottom: '1.25rem' },
  label: {
    display: 'block', fontSize: '0.85rem', fontWeight: 600,
    color: '#003B2D', marginBottom: '0.4rem',
  },
  input: {
    width: '100%', padding: '0.7rem 1rem', border: '1px solid #d8e0dc',
    borderRadius: '10px', fontSize: '0.9rem', outline: 'none',
    transition: 'border-color 0.2s',
  },
  textarea: {
    width: '100%', padding: '0.7rem 1rem', border: '1px solid #d8e0dc',
    borderRadius: '10px', fontSize: '0.9rem', outline: 'none',
    minHeight: '100px', resize: 'vertical', fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  },
  actions: {
    display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem',
  },
  btnSubmit: {
    padding: '0.7rem 1.8rem', borderRadius: '50px', fontSize: '0.95rem',
    fontWeight: 600, border: 'none', cursor: 'pointer',
    background: '#B8977E', color: '#fff', transition: 'background 0.2s',
  },
  btnCancel: {
    padding: '0.7rem 1.8rem', borderRadius: '50px', fontSize: '0.95rem',
    fontWeight: 600, border: '2px solid #d8e0dc', cursor: 'pointer',
    background: 'transparent', color: '#5A6F68', transition: 'all 0.2s',
  },
  success: {
    textAlign: 'center', padding: '3rem 2rem',
  },
  successIcon: { fontSize: '3rem', marginBottom: '1rem' },
  successTitle: { fontSize: '1.2rem', fontWeight: 700, color: '#003B2D', marginBottom: '0.5rem' },
  successText: { fontSize: '0.9rem', color: '#5A6F68', marginBottom: '1.5rem' },
};

const roleConfig = {
  mentor: {
    title: 'Mentor Application',
    subtitle: 'Share your expertise in AI & Data with emerging talent',
    openLabel: 'What expertise can you offer as a mentor?',
    openPlaceholder: 'e.g., Data governance, ML model deployment, AI strategy, cloud architecture, data engineering...',
    successMsg: 'Your mentor application has been submitted. We will be in touch with next steps before the event.',
  },
  mentee: {
    title: 'Mentee Application',
    subtitle: 'Learn from senior leaders in AI & Data strategy',
    openLabel: 'What are you seeking from this mentorship?',
    openPlaceholder: 'e.g., Guidance on AI career path, hands-on data engineering skills, understanding enterprise AI strategy...',
    successMsg: 'Your mentee application has been submitted. We will be in touch with next steps before the event.',
  },
};

export default function MentorshipForm({ role, onClose }) {
  const config = roleConfig[role];
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ fullName: '', department: '', email: '', openField: '' });

  function handleChange(field) {
    return (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(`[Mentorship ${role} application]`, form);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div style={formStyles.overlay} onClick={onClose}>
        <div style={formStyles.modal} onClick={e => e.stopPropagation()}>
          <div style={formStyles.header}>
            <div style={formStyles.headerTitle}>{config.title}</div>
          </div>
          <div style={formStyles.success}>
            <div style={formStyles.successIcon}>✅</div>
            <div style={formStyles.successTitle}>Thank You!</div>
            <p style={formStyles.successText}>{config.successMsg}</p>
            <button style={formStyles.btnSubmit} onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={formStyles.overlay} onClick={onClose}>
      <div style={formStyles.modal} onClick={e => e.stopPropagation()}>
        <div style={formStyles.header}>
          <div style={formStyles.headerTitle}>{config.title}</div>
          <div style={formStyles.headerSub}>{config.subtitle}</div>
        </div>
        <form style={formStyles.body} onSubmit={handleSubmit}>
          <div style={formStyles.field}>
            <label style={formStyles.label}>Full Name *</label>
            <input
              style={formStyles.input}
              value={form.fullName}
              onChange={handleChange('fullName')}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div style={formStyles.field}>
            <label style={formStyles.label}>Department *</label>
            <input
              style={formStyles.input}
              value={form.department}
              onChange={handleChange('department')}
              placeholder="e.g., IT, InfoSec, CCO, Engineering"
              required
            />
          </div>
          <div style={formStyles.field}>
            <label style={formStyles.label}>Email Address *</label>
            <input
              style={formStyles.input}
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              placeholder="your.name@company.com"
              required
            />
          </div>
          <div style={formStyles.field}>
            <label style={formStyles.label}>{config.openLabel} *</label>
            <textarea
              style={formStyles.textarea}
              value={form.openField}
              onChange={handleChange('openField')}
              placeholder={config.openPlaceholder}
              required
            />
          </div>
          <div style={formStyles.actions}>
            <button type="button" style={formStyles.btnCancel} onClick={onClose}>Cancel</button>
            <button type="submit" style={formStyles.btnSubmit}>Submit Application</button>
          </div>
        </form>
      </div>
    </div>
  );
}
