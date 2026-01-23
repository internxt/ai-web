import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useChatContext } from './hooks/useChatContext';
import ChatItem from './ChatItem';

interface ChatListProps {
  searchQuery?: string;
}

const ChatList: React.FC<ChatListProps> = ({ searchQuery = '' }) => {
  const { t } = useTranslation('chat-bot');
  const { chats } = useChatContext();

  const filteredChats = useMemo(() => {
    if (!searchQuery.trim()) {
      return chats;
    }

    const query = searchQuery.toLowerCase();
    return chats.filter((chat) => {
      const nameMatch = chat.name?.toLowerCase().includes(query);
      const messagesMatch = chat.messages?.some((message) =>
        message.text?.toLowerCase().includes(query)
      );
      return nameMatch || messagesMatch;
    });
  }, [chats, searchQuery]);

  if (chats.length === 0) return null;

  if (searchQuery.trim() && filteredChats.length === 0) {
    return (
      <>
        <div className="h-[1px] bg-green-120 w-full flex-shrink-0 mt-2"></div>
        <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
          <p className="text-sm text-primary/60">
            {t('NoChatsFound')}
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="h-[1px] bg-green-120 w-full flex-shrink-0 lg:mt-2"></div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide px-2">
        <p className="text-base font-medium text-gray-35 py-2">
          {'Chats'}
        </p>
        <div className="flex flex-col gap-0.5">
          {filteredChats.map((chat, index) => (
            <ChatItem key={chat.id} chat={chat} index={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ChatList;