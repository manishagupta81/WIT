import { useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Agenda from './components/Agenda';
import Speakers from './components/Speakers';
import Vendors from './components/Vendors';
import Mentorship from './components/Mentorship';
import Torch from './components/Torch';
import Logistics from './components/Logistics';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import MentorshipForm from './components/MentorshipForm';

export default function App() {
  const chatRef = useRef(null);
  const [formRole, setFormRole] = useState(null);

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Agenda />
      <Speakers />
      <Vendors />
      <Mentorship onOpenChat={(role) => setFormRole(role)} />
      <Torch />
      <Logistics />
      <Footer />
      <Chatbot ref={chatRef} />
      {formRole && <MentorshipForm role={formRole} onClose={() => setFormRole(null)} />}
    </>
  );
}
