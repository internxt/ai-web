import { createContext, type ReactNode, useState, useCallback } from 'react';
import type { Chat, Message } from '../types/chat.types';
import { useChatStorage } from '../components/ChatSection/hooks/useChatStorage';
import { useTranslation } from 'react-i18next';
import { aiService } from '../services/ai';

interface ChatContextType {
  chats: Chat[];
  currentChatId: number | null;
  messages: Message[];
  inputValue: string;
  isChatActive: boolean;
  isSidebarOpen: boolean;
  hasStartedChat: boolean;
  editingChatId: number | null;
  editingChatName: string;
  showYellowBanner: boolean;
  loading: boolean;
  setInputValue: (value: string) => void;
  setIsChatActive: (active: boolean) => void;
  setIsSidebarOpen: (open: boolean) => void;
  setEditingChatName: (name: string) => void;
  setShowYellowBanner: (show: boolean) => void;
  handleSend: () => void;
  handleNewChat: () => void;
  loadChat: (chatId: number) => void;
  handleRenameChat: (chatId: number) => void;
  handleSaveRename: (chatId: number) => void;
  handleCancelRename: () => void;
  handleDeleteChat: (chatId: number) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  useTranslation('chat-bot');
  const [chats, setChats] = useChatStorage();
  const [currentChatId, setCurrentChatId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isChatActive, setIsChatActive] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const [editingChatId, setEditingChatId] = useState<number | null>(null);
  const [editingChatName, setEditingChatName] = useState('');
  const [showYellowBanner, setShowYellowBanner] = useState(true);
  const [loading, setLoading] = useState(false);

  const convertMessagesToAIFormat = (messages: Message[]) => {
    return messages.map((msg) => ({
      role: msg.type === 'user' ? ('user' as const) : ('assistant' as const),
      content: msg.text,
    }));
  };

  const handleSend = useCallback(async () => {
    if (inputValue.trim() && !loading) {
      const userMessage: Message = {
        type: 'user',
        text: inputValue,
        timestamp: new Date().toISOString(),
      };

      let chatId = currentChatId;

      if (!chatId || chats.length === 0) {
        const newChat = {
          id: Date.now(),
          name: inputValue.slice(0, 30) + (inputValue.length > 30 ? '...' : ''),
          messages: [userMessage],
          createdAt: new Date().toISOString(),
        };
        setChats([newChat, ...chats]);
        chatId = newChat.id;
        setCurrentChatId(chatId);
        setMessages([userMessage]);
      } else {
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setChats((prevChats) =>
          prevChats.map((chat) => (chat.id === chatId ? { ...chat, messages: [...chat.messages, userMessage] } : chat)),
        );
      }

      setHasStartedChat(true);
      setInputValue('');
      setLoading(true);

      try {
        const allMessages = chatId === currentChatId ? [...messages, userMessage] : [userMessage];
        const aiMessages = convertMessagesToAIFormat(allMessages);

        const response = await aiService.chat(aiMessages);

        const assistantMessage: Message = {
          type: 'assistant',
          text: response,
          timestamp: new Date().toISOString(),
        };

        setMessages((prevMessages) => [...prevMessages, assistantMessage]);
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === chatId ? { ...chat, messages: [...chat.messages, assistantMessage] } : chat,
          ),
        );
      } catch (error) {
        console.error('AI Error:', error);
        const errorMessage: Message = {
          type: 'assistant',
          text: 'Error, try again later, please.',
          timestamp: new Date().toISOString(),
        };

        setMessages((prevMessages) => [...prevMessages, errorMessage]);
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === chatId ? { ...chat, messages: [...chat.messages, errorMessage] } : chat,
          ),
        );
      } finally {
        setLoading(false);
      }
    }
  }, [inputValue, currentChatId, chats, messages, loading, setChats]);

  const handleNewChat = useCallback(() => {
    setHasStartedChat(false);
    setMessages([]);
    setInputValue('');
    setCurrentChatId(null);
  }, []);

  const loadChat = useCallback(
    (chatId: number) => {
      const chat = chats.find((c) => c.id === chatId);
      if (chat) {
        setMessages(chat.messages || []);
        setCurrentChatId(chatId);
        setHasStartedChat(chat.messages && chat.messages.length > 0);
      }
    },
    [chats],
  );

  const handleRenameChat = useCallback(
    (chatId: number) => {
      const chatToRename = chats.find((chat) => chat.id === chatId);
      if (chatToRename) {
        setEditingChatId(chatId);
        setEditingChatName(chatToRename.name);
      }
    },
    [chats],
  );

  const handleSaveRename = useCallback(
    (chatId: number) => {
      if (editingChatName.trim()) {
        setChats((prevChats) =>
          prevChats.map((chat) => (chat.id === chatId ? { ...chat, name: editingChatName.trim() } : chat)),
        );
      }
      setEditingChatId(null);
      setEditingChatName('');
    },
    [editingChatName, setChats],
  );

  const handleCancelRename = useCallback(() => {
    setEditingChatId(null);
    setEditingChatName('');
  }, []);

  const handleDeleteChat = useCallback(
    (chatId: number) => {
      setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
      if (currentChatId === chatId) {
        setCurrentChatId(null);
        setMessages([]);
        setHasStartedChat(false);
      }
    },
    [currentChatId, setChats],
  );

  const value = {
    chats,
    currentChatId,
    messages,
    inputValue,
    isChatActive,
    isSidebarOpen,
    hasStartedChat,
    editingChatId,
    editingChatName,
    showYellowBanner,
    loading,
    setInputValue,
    setIsChatActive,
    setIsSidebarOpen,
    setEditingChatName,
    setShowYellowBanner,
    handleSend,
    handleNewChat,
    loadChat,
    handleRenameChat,
    handleSaveRename,
    handleCancelRename,
    handleDeleteChat,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export { ChatContext };
