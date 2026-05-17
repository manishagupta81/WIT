import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import data from '../data/eventData.json';

const e = data.event;

const KB = {
  agenda: {
    keywords: ['agenda','schedule','timetable','timeline','program','sessions','when','time','itinerary','plan','order'],
    response: `Here's the BInnovative agenda for <b>${e.date}</b>:\n\n<b>9:00–9:15</b> — Registration & Coffee\n<b>9:15–9:35</b> — Keynote: Manisha (WIT Chair) — WIT Vision, Mentorship & Passing the Torch\n<b>9:35–9:50</b> — Keynote: AI & Data\n<b>9:50–10:05</b> — Keynote: Security in the Age of AI\n<b>10:05–10:25</b> — Panel: GenAI Governance\n<b>10:30–12:00</b> — 3 Parallel Tracks (Vendor Demos, Business Demos, Technology)\n<b>12:00–1:00</b> — Lunch & Vendor Networking Hour\n\nTotal: 4 hours. Want details on the tracks or any specific session?`
  },
  speakers: {
    keywords: ['speaker','speakers','keynote','who is speaking','presenters','manisha','eva','dave'],
    response: `Our speakers include:\n\n<b>Manisha</b> — WIT Chair, Opening Keynote (includes Mentorship launch & Passing the Torch)\n<b>[TBD]</b> — Keynote on AI & Data\n<b>[TBD]</b> — Keynote on Security\n<b>Eva</b> — Incoming WIT Chair 2027\n<b>Dave</b> — Incoming WIT Vice Chair 2027\n\nPanel moderators and track presenters will be announced soon!`
  },
  vendors: {
    keywords: ['vendor','vendors','openai','aws','wso2','charles river','ontrust','demo','roadmap','office hours','partner','technology partner'],
    response: `Five technology partners in Track 1 (Vendor Demos, 10:30–12:00):\n\n<b>OpenAI</b> — Latest models & enterprise APIs\n<b>AWS</b> — Bedrock, SageMaker, AI/ML stack\n<b>WSO2</b> — Integration & API management\n<b>Charles River</b> — AI-driven investment management\n<b>OnTrust</b> — Trust, privacy & AI risk\n\nAll vendors stay for networking from <b>12:00–1:00 PM</b>.`
  },
  zoom: {
    keywords: ['zoom','remote','virtual','online','join remotely','other offices','dial in','link','virtual access'],
    response: `BInnovative is a hybrid event. A <b>single Zoom link</b> will cover the entire day, so remote attendees from other offices can join any session.\n\nThe Zoom link will be shared closer to the event date. All keynotes, demos, and panels will be streamed live.`
  },
  lunch: {
    keywords: ['lunch','food','eat','catering','meal','cost','free','expense','pay','price'],
    response: `Yes! <b>Lunch will be served</b> from 12:00–1:00 PM. All expenses are covered by ${e.organization} — there's no cost to attend.\n\nLunch overlaps with the vendor networking hour, so you can eat and chat with OpenAI, AWS, WSO2, Charles River, and OnTrust teams.`
  },
  mentorship: {
    keywords: ['mentor','mentee','mentorship','reverse','application','apply','sign up','program'],
    response: `The <b>Reverse Mentorship Program — AI & Data</b> focuses on exchanging expertise in AI, data strategy, machine learning, and data-driven decision-making.\n\n• <b>Mentors:</b> Share domain expertise, gain fresh perspectives on modern AI tools\n• <b>Mentees:</b> Learn real-world AI & data strategy from senior leaders\n\nApplications are open for <b>both mentors and mentees</b>. Scroll to the Mentorship section and click "I Want to Mentor" or "I Want to Be a Mentee" to express interest!`
  },
  panels: {
    keywords: ['panel','discussion','agentic','agents','governance','genai','review group'],
    response: `<b>Panel: GenAI Governance — Innovation Meets Guardrails</b> (10:05–10:25 AM)\n\nThe GenAI Review Group discusses balancing rapid innovation with governance, risk management, and responsible AI practices.\n\nThis panel is hybrid — available in-person and via Zoom.`
  },
  tracks: {
    keywords: ['track','tracks','parallel','business demo','technology track','which track','rooms'],
    response: `Three parallel tracks run from <b>10:30 AM – 12:00 PM</b>:\n\n<b>Track 1: Vendor Demos</b>\nOpenAI, AWS, WSO2, Charles River, OnTrust\n\n<b>Track 2: Business Demos</b>\nClient Advisory, Investments, Wealth Planning, Operations\n\n<b>Track 3: Technology</b>\nAI Architecture, Data Platform, Security & Compliance\n\nChoose the track most relevant to you. All run simultaneously for 1.5 hours.`
  },
  location: {
    keywords: ['where','location','place','venue','address','room','building','directions','parking'],
    response: `BInnovative is held at the <b>${e.location}</b>. Exact room details and conference room assignments for vendor office hours will be shared closer to the event.\n\nRemote attendees can join via a single Zoom link covering the full day.`
  },
  audience: {
    keywords: ['who','invited','audience','attend','attendees','invitation','rsvp','register'],
    response: `BInnovative is open to:\n\n• <b>IT</b> teams\n• <b>InfoSec</b> teams\n• <b>CCO</b> teams\n\nOther offices can join via Zoom. The event is <b>fully sponsored by WIT</b> — no cost to attend.`
  },
  torch: {
    keywords: ['torch','leadership','transition','2027','next','chair','vice chair','future'],
    response: `The "Passing the Torch" ceremony announces WIT's new leadership:\n\n<b>Eva</b> — WIT Chair for 2027\n<b>Dave</b> — WIT Vice Chair for 2027\n\nThis transition celebrates the current chapter and sets the direction for ${e.organization} going forward.`
  },
  duration: {
    keywords: ['how long','duration','hours','length','start','end','finish'],
    response: `BInnovative runs from <b>${e.time} on ${e.date}</b> — ${e.duration} total. This includes registration, three keynotes, governance panel, three parallel tracks (1.5 hrs), and a vendor networking lunch hour.`
  },
  date: {
    keywords: ['date','when is it','what day','october'],
    response: `BInnovative takes place on <b>${e.date}</b>, from ${e.time} at the ${e.location}. It's a hybrid event — join in person or via Zoom.`
  },
  dataai: {
    keywords: ['data for ai','data quality','data governance','importance of data','ai and data'],
    response: `The <b>AI & Data keynote</b> is at 9:35 AM. Speaker TBD.\n\nThis session covers the enterprise AI landscape — how data quality, models, and strategy converge to drive transformation. A must-attend for anyone building or leading AI/data projects.`
  },
  security: {
    keywords: ['security','infosec','cybersecurity','secure','compliance','risk'],
    response: `The <b>Security in the Age of AI keynote</b> is at 9:50 AM. Speaker TBD.\n\nCovers securing AI systems, protecting data, and building trust in an era of rapid automation. Track 3 (Technology) also includes a Security & Compliance session during the parallel tracks.`
  },
  wit: {
    keywords: ['wit','women in tech','women in technology','about wit','what is wit','organization'],
    response: `<b>${e.organization} (WIT)</b> is the group hosting BInnovative at Bessemer. WIT focuses on empowering innovation through inclusion, supporting technology professionals, and fostering a culture where diverse perspectives drive better outcomes.\n\nManisha currently chairs WIT, with Eva and Dave taking the helm in 2027.`
  }
};

function findAnswer(query) {
  const q = query.toLowerCase();
  let bestMatch = null;
  let bestScore = 0;

  for (const entry of Object.values(KB)) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (q.includes(kw)) score += kw.length;
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && bestScore > 2) return bestMatch.response;

  if (/hello|hi |hey/.test(q)) {
    return `Hello! Welcome to BInnovative. I can help with:\n\n• Event agenda & schedule\n• Speaker information\n• Vendor demos & office hours\n• Zoom access details\n• Lunch & logistics\n• Mentee applications\n• WIT leadership transition\n\nWhat would you like to know?`;
  }

  if (q.includes('thank')) {
    return `You're welcome! See you at BInnovative on ${e.date}. If you have more questions, I'm here to help.`;
  }

  return `I can help with event details! Try asking about:\n\n• <b>Agenda</b> — full schedule\n• <b>Tracks</b> — 3 parallel sessions\n• <b>Speakers</b> — keynotes & panelists\n• <b>Vendors</b> — OpenAI, AWS, WSO2, Charles River, OnTrust\n• <b>Zoom</b> — remote access info\n• <b>Lunch</b> — food & costs\n• <b>Mentorship</b> — reverse mentorship program\n• <b>Security</b> — security keynote & track\n• <b>Location</b> — venue details`;
}

const suggestions = [
  "What's the agenda?",
  'Tell me about the tracks',
  'Who are the vendors?',
  'How do I join on Zoom?',
  'Mentorship program',
  'Security keynote',
];

const Chatbot = forwardRef(function Chatbot(_, ref) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! I'm the BInnovative event assistant. I can help with the agenda, speakers, logistics, mentorship applications, and more. What would you like to know?" }
  ]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showBadge, setShowBadge] = useState(true);
  const [input, setInput] = useState('');
  const messagesEnd = useRef(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useImperativeHandle(ref, () => ({
    openWithMessage(text) {
      setOpen(true);
      setShowBadge(false);
      setShowSuggestions(false);
      setMessages(prev => [...prev, { from: 'bot', text }]);
    }
  }));

  function toggle() {
    setOpen(o => !o);
    setShowBadge(false);
  }

  function ask(text) {
    setShowSuggestions(false);
    setMessages(prev => [...prev, { from: 'user', text }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'bot', text: findAnswer(text) }]);
    }, 400);
  }

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput('');
    ask(trimmed);
  }

  return (
    <>
      <button className="chat-toggle" onClick={toggle} aria-label="Open event assistant">
        💬
        {showBadge && <span className="badge">!</span>}
      </button>

      <div className={`chatbox ${open ? 'open' : ''}`}>
        <div className="chatbox-header">
          <div className="bot-avatar">🤖</div>
          <div>
            <h4>BInnovative Assistant</h4>
            <p>Ask me anything about the event</p>
          </div>
          <button className="chatbox-close" onClick={toggle}>&times;</button>
        </div>

        <div className="chat-messages">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`chat-msg ${m.from}`}
              dangerouslySetInnerHTML={{ __html: m.text.replace(/\n/g, '<br/>') }}
            />
          ))}
          <div ref={messagesEnd} />
        </div>

        {showSuggestions && (
          <div className="chat-suggestions">
            {suggestions.map(s => (
              <button key={s} onClick={() => ask(s)}>{s}</button>
            ))}
          </div>
        )}

        <div className="chat-input-area">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Type your question..."
          />
          <button onClick={handleSend}>➤</button>
        </div>
      </div>
    </>
  );
});

export default Chatbot;
