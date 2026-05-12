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
import { Domains } from './config/constants';



function App() {
  useEffect(() => {
    document.title = 'Internxt AI — Privacy-first AI assistant that keeps your chats confidential';

    const linkIcon = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (linkIcon) {
      linkIcon.href = '/favicon.ico';
    }

    const metaDesc = document.querySelector<HTMLMetaElement>("meta[name='description']");    
    if (metaDesc) {
      metaDesc.content = "Internxt's AI assistant keeps your chats private and your data safe with zero-access encryption. Ask anything in total confidence.";
    }
    
    const metaTheme = document.querySelector<HTMLMetaElement>("meta[name='theme-color']");    
    if (metaTheme) {
        metaTheme.content = '#CCE0F0';
    }

    if (
      window.location.hostname === Domains.invalid || 
      window.location.hostname === Domains.telefonica || 
      window.location.hostname === Domains.telefonicaSubdomain
    ) {

        const newUrl = Domains.ai;
      location.replace(newUrl);
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