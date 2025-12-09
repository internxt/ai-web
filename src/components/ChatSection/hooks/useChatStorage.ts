import { useState, useEffect } from 'react';
import type { Chat } from '../../../types/chat.types';

const STORAGE_KEY = 'internxt-ai-chats';

export const useChatStorage = (): [Chat[], React.Dispatch<React.SetStateAction<Chat[]>>] => {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const savedChats = localStorage.getItem(STORAGE_KEY);
    if (savedChats) {
      try {
        const parsedChats: Chat[] = JSON.parse(savedChats);
        setChats(parsedChats);
      } catch (error) {
        console.error('Error loading chats from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (chats.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
      } catch (error) {
        console.error('Error saving chats to localStorage:', error);
      }
    }
  }, [chats]);

  return [chats, setChats];
};
