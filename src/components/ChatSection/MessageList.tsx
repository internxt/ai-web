import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useChatContext } from './hooks/useChatContext';

const MessageList: React.FC = () => {
  const { t } = useTranslation('chat-bot');
  const { messages, hasStartedChat, isChatActive } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0 && messagesEndRef.current && messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <div
      ref={messagesContainerRef}
      className={`${hasStartedChat ? 'flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide' : ''} px-10 lg:px-20 pt-8`}
    >
      {!hasStartedChat ? (
        <div className="flex flex-col items-center w-full pb-4">
          <span className="lg:text-3xl font-semibold leading-tight text-center flex flex-col">
            <p className="whitespace-pre-line">{t('HelloText')}</p>
          </span>
        </div>
      ) : (
        <div
          className={`flex flex-col gap-4 lg:w-3/4 mx-auto pb-4 ${
            isChatActive ? 'opacity-100' : 'opacity-20'
          } transition-opacity duration-300`}
        >
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`p-4 rounded-lg max-w-[80%] break-words whitespace-pre-wrap ${
                  msg.type === 'user' ? 'bg-neutral-17 text-gray-100' : ' text-gray-900'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};

export default MessageList;
