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
import { useHostConfig } from './hooks/useHostConfig';

function App() {
  const { isTelefonica } = useHostConfig();
  useEffect(() => {
    document.title = isTelefonica 
      ? 'Telefónica AI — Privacy-first AI assistant that keeps your chats confidential' 
      : 'Internxt AI — Privacy-first AI assistant that keeps your chats confidential';

    const linkIcon = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (linkIcon) {
      linkIcon.href = isTelefonica ? '/telefonica_favicon.ico' : '/favicon.ico';
    }

    const metaDesc = document.querySelector<HTMLMetaElement>("meta[name='description']");    
    if (metaDesc) {
      metaDesc.content = isTelefonica
        ? 'El asistente de IA de Telefonica mantiene tus chats privados y tus datos seguros gracias al cifrado de acceso cero. Pregunta lo que quieras con total confianza.'
        : "Internxt's AI assistant keeps your chats private and your data safe with zero-access encryption. Ask anything in total confidence.";
    }
    
    const metaTheme = document.querySelector<HTMLMetaElement>("meta[name='theme-color']");    
    if (metaTheme) {
        metaTheme.content = isTelefonica ? '#00358E' : '#CCE0F0';
    }

    if (window.location.hostname === Domains.invalid) {
        const newUrl = Domains.ai;
      location.replace(newUrl);
    }
  }, [isTelefonica]);

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