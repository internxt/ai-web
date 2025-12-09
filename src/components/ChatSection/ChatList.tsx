import { useChatContext } from './hooks/useChatContext';
import ChatItem from './ChatItem';

const ChatList: React.FC = () => {
  const { chats } = useChatContext();

  if (chats.length === 0) return null;

  return (
    <>
      <div className="h-[1px] bg-green-120 w-full flex-shrink-0 mt-2"></div>
      <div className="flex-1 overflow-y-auto scrollbar-hide px-2">
        <p className="text-base font-medium text-gray-35 py-2">Chats</p>
        <div className="flex flex-col">
          {chats.map((chat, index) => (
            <ChatItem key={chat.id} chat={chat} index={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ChatList;
