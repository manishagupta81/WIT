import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import data from '../data/eventData.json';

const e = data.event;

const KB = {
  agenda: {
    keywords: ['agenda','schedule','timetable','timeline','program','sessions','when','time','itinerary','plan','order'],
    response: `Here's the BInnovative agenda for <b>${e.date}</b>:\n\n<b>9:00–9:25</b> — Registration & Coffee\n<b>9:30–9:45</b> — Keynote: Manisha (WIT Chair)\n<b>9:50–10:05</b> — Keynote: Max\n<b>10:10–10:25</b> — Keynote: Patrick\n<b>10:30–10:45</b> — Keynote: Eva & Dave — Importance of Data for AI\n<b>10:50–11:10</b> — Demo Roadmap: OpenAI\n<b>11:15–11:35</b> — Demo Roadmap: AWS\n<b>11:40–12:00</b> — Demo Roadmap: WSO2\n<b>12:05–12:45</b> — Panel: Agents & the Agentic Enterprise\n<b>12:45–1:30</b> — Lunch & Vendor Office Hours\n<b>1:35–2:15</b> — Panel: GenAI Governance\n<b>2:20–2:40</b> — Vendor Office Hours (continued)\n<b>2:45–2:55</b> — Reverse Mentorship Launch\n<b>3:00–3:15</b> — Passing the Torch\n\n5-minute breaks between each session. Want details on any specific session?`
  },
  speakers: {
    keywords: ['speaker','speakers','keynote','who is speaking','presenters','manisha','max','patrick','eva','dave'],
    response: `Our speakers include:\n\n<b>Manisha</b> — WIT Chair, Opening Keynote\n<b>Max</b> — Keynote (topic TBD)\n<b>Patrick</b> — Keynote (topic TBD)\n<b>Eva & Dave</b> — Keynote: Importance of Data for AI\n<b>Eva</b> — Incoming WIT Chair 2027\n<b>Dave</b> — Incoming WIT Vice Chair 2027\n\nPanel moderators and panelists will be announced soon!`
  },
  vendors: {
    keywords: ['vendor','vendors','openai','aws','wso2','demo','roadmap','office hours','partner','technology partner'],
    response: `Three technology partners are featured:\n\n<b>OpenAI</b> — Demo at 10:50 AM + office hours 12:45–2:40 PM\n<b>AWS</b> — Demo at 11:15 AM + office hours 12:45–2:40 PM\n<b>WSO2</b> — Demo at 11:40 AM + office hours 12:45–2:40 PM\n\nVendors may be onsite or remote for demos. During office hours they'll be in designated conference rooms to answer builder and business questions.`
  },
  zoom: {
    keywords: ['zoom','remote','virtual','online','join remotely','other offices','dial in','link','virtual access'],
    response: `BInnovative is a hybrid event. A <b>single Zoom link</b> will cover the entire day, so remote attendees from other offices can join any session.\n\nThe Zoom link will be shared closer to the event date. All keynotes, demos, and panels will be streamed live.`
  },
  lunch: {
    keywords: ['lunch','food','eat','catering','meal','cost','free','expense','pay','price'],
    response: `Yes! <b>Lunch will be served</b> during the event (12:45–1:30 PM). All expenses are covered by ${e.organization} — there's no cost to attend.\n\nLunch overlaps with vendor office hours, so you can eat and chat with OpenAI, AWS, and WSO2 teams.`
  },
  mentorship: {
    keywords: ['mentor','mentee','mentorship','reverse','application','apply','sign up','program'],
    response: `The <b>Reverse Mentorship Program — AI & Data</b> focuses on exchanging expertise in AI, data strategy, machine learning, and data-driven decision-making.\n\n• <b>Mentors:</b> Share domain expertise, gain fresh perspectives on modern AI tools\n• <b>Mentees:</b> Learn real-world AI & data strategy from senior leaders\n\nApplications are open for <b>both mentors and mentees</b>. Scroll to the Mentorship section and click "I Want to Mentor" or "I Want to Be a Mentee" to express interest!`
  },
  panels: {
    keywords: ['panel','discussion','agentic','agents','governance','genai','review group'],
    response: `Two panel discussions:\n\n<b>1. Agents & the Agentic Enterprise</b> (12:05 – 12:45 PM)\nHow autonomous AI agents are reshaping enterprise workflows and operations.\n\n<b>2. GenAI Governance</b> (1:35 – 2:15 PM)\nThe GenAI Review Group discusses balancing innovation with governance and responsible AI.\n\nBoth panels are hybrid — available in-person and via Zoom.`
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
    response: `BInnovative runs from <b>${e.time} on ${e.date}</b> — approximately ${e.duration}. This includes registration, four keynotes, three demo sessions, two panels, lunch, vendor office hours, and closing ceremonies.`
  },
  date: {
    keywords: ['date','when is it','what day','october'],
    response: `BInnovative takes place on <b>${e.date}</b>, from ${e.time} at the ${e.location}. It's a hybrid event — join in person or via Zoom.`
  },
  dataai: {
    keywords: ['data for ai','data quality','data governance','importance of data'],
    response: `<b>Eva & Dave</b> will co-present the keynote <b>"Importance of Data for AI"</b> at 10:30 AM.\n\nThis session covers why data quality, governance, and strategy are the foundation for every successful AI initiative. A must-attend for anyone building or leading AI projects.`
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

  return `I can help with event details! Try asking about:\n\n• <b>Agenda</b> — full schedule\n• <b>Speakers</b> — keynotes & panelists\n• <b>Vendors</b> — OpenAI, AWS, WSO2 demos & office hours\n• <b>Zoom</b> — remote access info\n• <b>Lunch</b> — food & costs\n• <b>Mentorship</b> — reverse mentorship program\n• <b>Panels</b> — discussion topics\n• <b>Location</b> — venue details\n• <b>Data for AI</b> — Eva & Dave's keynote`;
}

const suggestions = [
  "What's the agenda?",
  'Who are the speakers?',
  'Tell me about vendors',
  'How do I join on Zoom?',
  'Mentee application',
  'Data for AI keynote',
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
