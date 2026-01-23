import { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowDown } from '@phosphor-icons/react';
import { useChatContext } from './hooks/useChatContext';
import { parseMarkdown } from '../../utils/format-text';

const MessageList: React.FC = () => {
  const { t } = useTranslation('chat-bot');
  const { messages, hasStartedChat, isChatActive, isSidebarOpen } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    if (messages.length > 0 && messagesEndRef.current && messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom && hasStartedChat);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [hasStartedChat]);

  const scrollToBottom = () => {
    if (messagesEndRef.current && messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <div
        ref={messagesContainerRef}
        className={`${hasStartedChat ? 'flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide' : ''} px-4 lg:px-40 pt-8`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {!hasStartedChat ? (
          <div className="flex flex-col items-center w-full lg:pb-4">
            <span className="lg:text-3xl font-semibold leading-tight text-center flex flex-col">
              <p className="whitespace-pre-line">{t('HelloText')}</p>
            </span>
          </div>
        ) : (
          <div
            className={`flex flex-col gap-4 lg:w-full pb-4 ${
              isChatActive ? 'opacity-100' : 'opacity-20'
            } transition-opacity duration-300`}
          >
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`p-4 rounded-lg max-w-[80%] ${
                    msg.type === 'user' ? 'bg-neutral-17 text-gray-100' : 'text-gray-100'
                  }`}
                >
                  {msg.type === 'user' ? (
                    <div className="break-words whitespace-pre-wrap">{msg.text}</div>
                  ) : (
                    <div className="break-words">{parseMarkdown(msg.text)}</div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {showScrollButton && !isSidebarOpen && (
        <div className="fixed bottom-1/4 left-1/2 transform -translate-x-1/2 z-50">
          <div
            className="h-10 w-10 border border-primary rounded-full items-center flex justify-center cursor-pointer bg-white shadow-lg hover:shadow-xl transition-all duration-200"
            onClick={scrollToBottom}
          >
            <ArrowDown className="text-primary" height={25} width={25} />
          </div>
        </div>
      )}
    </>
  );
};

export default MessageList;