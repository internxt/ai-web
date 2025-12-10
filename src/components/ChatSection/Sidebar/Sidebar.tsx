import { useMemo, useState } from 'react';
import DesktopSidebar from './DesktopSidebar';
import MobileSidebar from './MobileSidebar';
import MobileHeader from './MobileHeader';
import DeleteChatModal from './modals/DeleteChatModal';
import RenameChatModal from './modals/RenameChatModal';
import { useChatContext } from '../hooks/useChatContext';

const Sidebar: React.FC = () => {
  const { 
    isSidebarOpen, 
    isChatActive, 
    showYellowBanner, 
    hasStartedChat,
    currentChatId,
    chats,
    editingChatName,
    setIsSidebarOpen, 
    handleNewChat, 
    setShowYellowBanner,
    handleDeleteChat,
    handleRenameChat,
    setEditingChatName,
    handleSaveRename
  } = useChatContext();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);

  const currentChat = useMemo(() => {
    return chats.find(chat => chat.id === currentChatId);
  }, [chats, currentChatId]);

  const sidebarClasses = useMemo(() => {
    const baseClasses = 'border-r h-full absolute top-0 ease-in-out';
    const activeClasses = isChatActive
      ? 'bg-white border-green-120'
      : 'bg-transparent border-transparent opacity-0 pointer-events-none';
    return `${baseClasses} ${activeClasses}`;
  }, [isChatActive]);

  const handleNewChatClick = () => {
    handleNewChat();
    setSearchQuery('');
  };

  const handleDotsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
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

  return (
    <>
      <DesktopSidebar
        isOpen={isSidebarOpen}
        showBanner={showYellowBanner}
        sidebarClasses={sidebarClasses}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onNewChat={handleNewChat}
        onCloseBanner={() => setShowYellowBanner(false)}
      />

      <MobileHeader
        isSidebarOpen={isSidebarOpen}
        isChatActive={isChatActive}
        hasStartedChat={hasStartedChat}
        isMenuOpen={isMenuOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onNewChat={handleNewChatClick}
        onMenuToggle={handleDotsClick}
        onMenuClose={() => setIsMenuOpen(false)}
        onRename={handleRenameClick}
        onDelete={handleDeleteClick}
      />

      <MobileSidebar
        isOpen={isSidebarOpen}
        showBanner={showYellowBanner}
        searchQuery={searchQuery}
        sidebarClasses={sidebarClasses}
        onSearchChange={setSearchQuery}
        onClearSearch={() => setSearchQuery('')}
        onNewChat={handleNewChatClick}
        onCloseBanner={() => setShowYellowBanner(false)}
      />

      <DeleteChatModal
        isOpen={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />

      <RenameChatModal
        isOpen={showRenameModal}
        chatName={editingChatName}
        currentName={currentChat?.name}
        onCancel={() => setShowRenameModal(false)}
        onConfirm={confirmRename}
        onNameChange={setEditingChatName}
      />
    </>
  );
};

export default Sidebar;