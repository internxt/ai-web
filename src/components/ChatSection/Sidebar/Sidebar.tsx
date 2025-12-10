import { useMemo } from 'react';
import DesktopSidebar from './DesktopSidebar';
import MobileSidebar from './MobileSidebar';
import MobileHeader from './MobileHeader';
import DeleteChatModal from './modals/DeleteChatModal';
import RenameChatModal from './modals/RenameChatModal';
import { useChatContext } from '../hooks/useChatContext';
import { useChatActions } from '../hooks/useChatActions';

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

  const {
    searchQuery,
    isMenuOpen,
    showDeleteModal,
    showRenameModal,
    currentChat,
    setSearchQuery,
    setShowDeleteModal,
    setShowRenameModal,
    handleNewChatClick,
    handleDotsClick,
    handleMenuClose,
    handleRenameClick,
    handleDeleteClick,
    confirmDelete,
    confirmRename,
  } = useChatActions({
    currentChatId,
    chats,
    editingChatName,
    handleNewChat,
    handleDeleteChat,
    handleRenameChat,
    handleSaveRename,
  });

  const sidebarClasses = useMemo(() => {
    const baseClasses = 'border-r h-full absolute top-0 ease-in-out';
    const activeClasses = isChatActive
      ? 'bg-white border-green-120'
      : 'bg-transparent border-transparent opacity-0 pointer-events-none';
    return `${baseClasses} ${activeClasses}`;
  }, [isChatActive]);

  return (
    <>
      <DesktopSidebar
        isOpen={isSidebarOpen}
        showBanner={showYellowBanner}
        sidebarClasses={sidebarClasses}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onNewChat={handleNewChatClick}
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
        onMenuClose={handleMenuClose}
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