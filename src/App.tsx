import { useEffect } from 'react';
import ChatSection from './components/ChatSection/ChatSection';
import FeaturesSection from './components/FeaturesSection/FeaturesSection';
import AccordionSection from './components/AccordionSection/AccordionSection';
import HorizontalScrollableSection from './components/HorizontalScrollableSection/HorizontalScrollableSection';
import FAQSection from './components/FaqSection/FaqSection';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { ChatProvider } from './context/ChatContext';
import ComparisonSection from './components/TableSection/ComparisonSection';

function App() {
  useEffect(() => {
    if (window.location.hostname === 'ia.internxt.com') {
      const newUrl = window.location.href.replace('ia.internxt.com', 'ai.internxt.com');
      window.location.replace(newUrl);
    }
  }, []);

  return (
    <ChatProvider>
      <div className="app">
        <Navbar />
        <ChatSection />
        <FeaturesSection />
        <AccordionSection />
        <HorizontalScrollableSection />
        <ComparisonSection />
        <FAQSection />
        <Footer />
      </div>
    </ChatProvider>
  );
}

export default App;