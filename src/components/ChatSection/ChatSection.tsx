import { ArrowDown } from 'phosphor-react';
import { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useChatContext } from './hooks/useChatContext';
import Sidebar from './Sidebar/Sidebar';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

const ChatSection: React.FC = () => {
  const { t } = useTranslation('chat-bot');
  const { isChatActive, isSidebarOpen, hasStartedChat, setIsSidebarOpen } = useChatContext();
  const chatSectionRef = useRef<HTMLDivElement>(null);

  const mainContainerClasses = useMemo(() => {
    return isChatActive
      ? 'bg-white flex flex-row rounded-2xl border border-green-120 w-full h-[80vh] overflow-hidden transition-all duration-300 shadow-xl relative'
      : 'bg-white/0 flex flex-row rounded-2xl border border-green-120/0 w-full h-[80vh] overflow-hidden transition-all duration-300 relative';
  }, [isChatActive]);

  return (
    <section
      className="flex flex-col items-center py-10 pt-28 lg:pb-20 px-5 lg:px-10 xl:px-32 3xl:px-80 gap-10 overflow-x-hidden"
      style={{ background: 'linear-gradient(180deg, #CCE0FF 0%, #F4F8FF 100%)' }}
    >
      <div className={mainContainerClasses} ref={chatSectionRef}>
        <Sidebar />
        
        {isSidebarOpen && (
          <div 
            className="lg:hidden absolute inset-0 bg-black/20 z-5 animate-in fade-in duration-200"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <div
          className={`flex flex-col w-full h-full ${
            !hasStartedChat ? 'justify-center gap-5 lg:gap-8' : 'justify-between pt-20 lg:pt-0'
          } ${isSidebarOpen ? ' lg:ml-64' : 'lg:ml-14'}`}
          style={{
            transition: 'margin-left 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <MessageList />
          <ChatInput />
        </div>
      </div>

      <div 
        className="flex flex-row border border-primary text-primary rounded-md py-4 px-6 gap-2 items-center cursor-pointer hover:bg-primary/5 transition-colors"
        onClick={() => {
          const element = document.getElementById('chatInPrivate');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
      >
        <p className="flex text-primary text-base font-medium">{t('Cta')}</p>
        <ArrowDown height={24} width={24} />
      </div>
    </section>
  );
};

export default ChatSection;