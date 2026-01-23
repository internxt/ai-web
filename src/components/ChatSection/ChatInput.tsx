import { PaperPlaneRight } from 'phosphor-react';
import { useCallback, useRef, type KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useChatContext } from './hooks/useChatContext';

const ChatInput: React.FC = () => {
  const { t } = useTranslation('chat-bot');
  const { inputValue, setInputValue, handleSend, setIsChatActive, loading } = useChatContext();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resetTextareaHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, []);

  const handleSendWrapper = useCallback(() => {
    handleSend();
    resetTextareaHeight();
  }, [handleSend, resetTextareaHeight]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey && inputValue.trim() && !loading) {
        e.preventDefault();
        handleSendWrapper();
      }
    },
    [inputValue, loading, handleSendWrapper],
  );

  return (
    <div className="flex flex-col gap-2 items-center px-4 lg:px-40 pb-8">
      <div className="flex flex-row w-full lg:w-full bg-white border border-gray-25 rounded-lg items-center py-0.5 lg:py-2 px-4 transition-shadow duration-300">
        <textarea
          ref={textareaRef}
          className="min-h-[40px] max-h-[200px] text-base w-full resize-none py-2 pr-4 lg:pr-0 outline-none focus:outline-none overflow-y-auto scrollbar-hide"
          style={{ height: 'auto' }}
          placeholder={loading ? t('Thinking') : t('SearchBar')}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            e.target.style.height = 'auto';
            e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
          }}
          onKeyPress={handleKeyPress}
          onFocus={() => setIsChatActive(true)}
          disabled={loading}
          rows={1}
        />
        <div
          className={`flex border-l border-l-gray-25 h-full flex-shrink-0 items-center ${
            loading || !inputValue.trim() ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
          onClick={handleSendWrapper}
        >
          <PaperPlaneRight height={30} width={30} className="ml-3 text-neutral-90 hidden lg:flex" />
          <PaperPlaneRight height={22} width={22} className="ml-3 text-neutral-90 flex lg:hidden" />
        </div>
      </div>
      <span className="flex gap-1 lg:gap-2 text-xs flex-col text-center mt-1 lg:mt-2 text-gray-35 ">
        <p>
          {t('Terms.text')}{' '}
          <a
            href="https://internxt.com/legal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 underline transition-colors"
          >
            {t('Terms.blueText')}
          </a>
        </p>
        <p>{t('Info')}</p>
      </span>
    </div>
  );
};

export default ChatInput;