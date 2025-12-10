/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from 'react';

interface UseChatActionsProps {
  currentChatId: number | null;
  chats: any[];
  editingChatName: string;
  handleNewChat: () => void;
  handleDeleteChat: (chatId: number) => void;
  handleRenameChat: (chatId: number) => void;
  handleSaveRename: (chatId: number) => void;
}

export const useChatActions = ({
  currentChatId,
  chats,
  editingChatName,
  handleNewChat,
  handleDeleteChat,
  handleRenameChat,
  handleSaveRename,
}: UseChatActionsProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);

  const currentChat = useMemo(() => {
    return chats.find(chat => chat.id === currentChatId);
  }, [chats, currentChatId]);

  const handleNewChatClick = () => {
    handleNewChat();
    setSearchQuery('');
  };

  const handleDotsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(false);
  };

  const handleRenameClick = () => {
    setIsMenuOpen(false);
    if (currentChatId) {
      handleRenameChat(currentChatId);
    }
    setShowRenameModal(true);
  };

  const handleDeleteClick = () => {
    setIsMenuOpen(false);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (currentChatId) {
      handleDeleteChat(currentChatId);
      handleNewChat();
    }
    setShowDeleteModal(false);
  };

  const confirmRename = () => {
    if (currentChatId && editingChatName.trim()) {
      handleSaveRename(currentChatId);
    }
    setShowRenameModal(false);
  };

  return {
    // State
    searchQuery,
    isMenuOpen,
    showDeleteModal,
    showRenameModal,
    currentChat,
    
    // Setters
    setSearchQuery,
    setIsMenuOpen,
    setShowDeleteModal,
    setShowRenameModal,
    
    // Actions
    handleNewChatClick,
    handleDotsClick,
    handleMenuClose,
    handleRenameClick,
    handleDeleteClick,
    confirmDelete,
    confirmRename,
  };
};