import { DotsThree, MagnifyingGlass, NotePencil, PencilSimple, SidebarSimple, Trash, X } from 'phosphor-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useChatContext } from '../hooks/useChatContext';
import ChatList from '../ChatList';

const Sidebar: React.FC = () => {
  const { t } = useTranslation('chat-bot');
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

  const handleClearSearch = () => {
    setSearchQuery('');
  };

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

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const confirmDelete = () => {
    if (currentChatId) {
      handleDeleteChat(currentChatId);
      handleNewChat();
    }
    setShowDeleteModal(false);
  };

  const cancelRename = () => {
    setShowRenameModal(false);
  };

  const confirmRename = () => {
    if (currentChatId && editingChatName.trim()) {
      handleSaveRename(currentChatId);
    }
    setShowRenameModal(false);
  };

  return (
    <>
      <div
        className={`lg:flex hidden ${sidebarClasses} left-0 ${isSidebarOpen ? 'w-64' : 'w-14'} z-10`}
        style={{
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div
          className={`flex flex-col h-full ${isSidebarOpen ? 'px-3' : 'px-2'} py-4 gap-2 ${isSidebarOpen ? '' : ' items-center'}`}
        >
          <div className="h-10 w-10 justify-center items-center flex flex-shrink-0">
            <SidebarSimple
              height={30}
              width={30}
              className="text-primary cursor-pointer"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            />
          </div>
          <div className="h-[1px] bg-green-120 w-full flex-shrink-0"></div>
          <div
            className="h-10 w-full justify-start items-center pl-1 flex flex-shrink-0 cursor-pointer"
            onClick={handleNewChat}
            title={t('Newchat')}
          >
            <NotePencil height={30} width={30} className="text-primary" />
            {isSidebarOpen && <span className="ml-2 text-primary font-medium text-sm">{t('Newchat')}</span>}
          </div>
          {isSidebarOpen && <ChatList />}
          {showYellowBanner && isSidebarOpen && (
            <div className="flex flex-row p-3 items-center bg-yellow border-yellow-dark rounded-lg gap-2">
              <p className="text-xs font-medium flex-1">{t('InfoCard')}</p>
              <X
                className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
                height={20}
                width={20}
                onClick={() => setShowYellowBanner(false)}
              />
            </div>
          )}
        </div>
      </div>

      <div 
        className={`flex flex-row justify-between backdrop-blur-md bg-white/80 w-full lg:hidden absolute top-0 ${isSidebarOpen ? 'left-72' : 'left-0'} z-5 ${isChatActive ? 'flex' : 'hidden'}`}
        style={{
          transition: 'left 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="px-5 py-6 justify-center items-start flex flex-shrink-0">
          <SidebarSimple
            height={24}
            width={24}
            className={`text-primary cursor-pointer ${!isSidebarOpen ? 'bg-white' : ''}`}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>
        {hasStartedChat && !isSidebarOpen && (
          <div className="flex gap-1 flex-row px-5 py-6 justify-center items-start flex-shrink-0 relative">
            <NotePencil
              height={24}
              width={24}
              className={`text-primary cursor-pointer ${!isSidebarOpen ? 'bg-white' : ''}`}
              onClick={handleNewChatClick}
            />  
            <div className='h-full bg-green-120 w-[1px]'></div>
            <DotsThree
              height={24}
              width={24}
              className={`text-primary cursor-pointer ${!isSidebarOpen ? 'bg-white' : ''}`}
              onClick={handleDotsClick}
            />
            
            {isMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(false);
                  }}
                />
                <div className="absolute right-2 top-14 bg-white border px-3 py-1.5 border-gray-20 rounded-lg shadow-lg z-20 w-[150px]">
                  <button
                    onClick={handleRenameClick}
                    className="w-full flex flex-row items-center hover:bg-gray-1 gap-3 text-left py-2 text-base text-gray-100"
                  >
                    <PencilSimple height={20} width={20} />
                    {t('Tools.Rename')}
                  </button>
                  <div className="w-full h-[1px] bg-green-120"></div>
                  <button
                    onClick={handleDeleteClick}
                    className="w-full text-left hover:bg-gray-1 items-center flex gap-3 py-2 text-base text-red"
                  >
                    <Trash height={20} width={20} />
                    {t('Tools.Delete')}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div
        className={`lg:hidden flex ${sidebarClasses} left-0 ${isSidebarOpen ? 'w-[85%]' : 'w-0'} z-10 overflow-hidden ${!isSidebarOpen && 'pointer-events-none'}`}
        style={{
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="flex flex-col h-full w-full flex-shrink-0">
          <div className="flex flex-col px-3 py-4 gap-3">
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <div className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <MagnifyingGlass height={18} width={18} className="text-neutral-90" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('Search')}
                  className="w-full h-10 pl-8 pr-3 py-2 text-sm border border-gray-25 rounded-lg focus:outline-none focus:border-primary bg-white text-neutral-90 placeholder:text-neutral-90 transition-colors"
                />
              </div>

              <button
                onClick={searchQuery ? handleClearSearch : handleNewChatClick}
                className="h-10 w-10 flex items-center justify-center flex-shrink-0 rounded-lg transition-colors cursor-pointer"
              >
                {searchQuery ? (
                  <X height={24} width={24} className="text-primary" />
                ) : (
                  <NotePencil height={24} width={24} className="text-primary" />
                )}
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide px-3 py-2">
            <ChatList searchQuery={searchQuery} />
          </div>

          {showYellowBanner && (
            <div className="px-3 pb-3 flex-shrink-0">
              <div className="flex flex-row p-3 items-center bg-yellow border border-yellow-dark rounded-lg gap-2">
                <p className="text-xs font-medium flex-1">{t('InfoCard')}</p>
                <X
                  className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
                  height={20}
                  width={20}
                  onClick={() => setShowYellowBanner(false)}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={cancelDelete}>
          <div
            className="bg-white rounded-16 p-6 gap-5 flex flex-col max-w-sm mx-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between ">
              <h3 className="text-2xl font-medium text-gray-100">{t('DeleteConfirm.Title') || 'Eliminar chat'}</h3>
              <X
                height={20}
                width={20}
                className="text-gray-100 cursor-pointer hover:opacity-70 transition-opacity"
                onClick={cancelDelete}
              />
            </div>
            <p className="text-base  text-gray-55">
              {t('DeleteConfirm.Message') || '¿Estás seguro de que quieres eliminar este chat? Esta acción no se puede deshacer.'}
            </p>
            <div className="flex gap-3 lg:justify-end">
              <button
                onClick={cancelDelete}
                className="px-4 py-2  w-1/2 text-base font-medium text-primary border-2 border-primary hover:bg-gray-1 rounded-lg"
              >
                {t('DeleteConfirm.Cancel') || 'Cancelar'}
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2  w-1/2 text-base font-medium text-white bg-red hover:bg-red-dark rounded-lg"
              >
                {t('DeleteConfirm.Confirm') || 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showRenameModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={cancelRename}>
          <div
            className="bg-white rounded-16 p-6 max-w-sm w-full mx-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-100">{t('RenameConfirm.Title') || 'Renombrar chat'}</h3>
              <X
                height={20}
                width={20}
                className="text-gray-100 cursor-pointer hover:opacity-70 transition-opacity"
                onClick={cancelRename}
              />
            </div>
            <input
              type="text"
              value={editingChatName}
              onChange={(e) => setEditingChatName(e.target.value)}
              placeholder={currentChat?.name || t('RenameConfirm.Placeholder') || 'Nuevo nombre del chat'}
              className="w-full px-3 py-2 text-base border border-gray-25 rounded-lg focus:outline-none focus:border-primary bg-white text-gray-100 placeholder:text-neutral-90 mb-6"
              autoFocus
            />
            <div className="flex gap-3 lg:justify-end">
              <button
                onClick={cancelRename}
                className="px-4 py-2 w-1/2 text-base font-medium text-primary border-2 border-primary hover:bg-gray-1 rounded-lg"
              >
                {t('RenameConfirm.Cancel')}
              </button>
              <button
                onClick={confirmRename}
                disabled={!editingChatName.trim()}
                className="px-4 py-2  w-1/2 text-sm base-medium text-white bg-primary hover:bg-primary-dark rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('RenameConfirm.Rename')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;