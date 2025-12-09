import { PencilSimple, Trash } from 'phosphor-react';
import { useState, useCallback, type ChangeEvent, type KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useChatContext } from './hooks/useChatContext';
import type { Chat } from '../../types/chat.types';

interface ChatItemProps {
  chat: Chat;
  index: number;
}

const ChatItem: React.FC<ChatItemProps> = ({ chat }) => {
  const { t } = useTranslation('chat-bot');
  const {
    editingChatId,
    editingChatName,
    loadChat,
    handleRenameChat,
    handleSaveRename,
    handleCancelRename,
    handleDeleteChat,
    setEditingChatName,
  } = useChatContext();

  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isEditing = editingChatId === chat.id;

  const handleClick = useCallback(() => {
    if (!isEditing) {
      loadChat(chat.id);
    }
  }, [isEditing, loadChat, chat.id]);

  const handleRenameClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      handleRenameChat(chat.id);
      setIsMenuOpen(false);
    },
    [handleRenameChat, chat.id],
  );

  const handleDeleteClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      handleDeleteChat(chat.id);
    },
    [handleDeleteChat, chat.id],
  );

  const handleMenuToggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSaveRename(chat.id);
      } else if (e.key === 'Escape') {
        handleCancelRename();
      }
    },
    [handleSaveRename, handleCancelRename, chat.id],
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setEditingChatName(e.target.value);
    },
    [setEditingChatName],
  );

  return (
    <div
      className="relative flex items-center justify-between p-2 rounded-lg transition-colors cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {isEditing ? (
        <input
          type="text"
          value={editingChatName}
          onChange={handleInputChange}
          onBlur={() => handleSaveRename(chat.id)}
          onKeyDown={handleKeyDown}
          onClick={(e) => e.stopPropagation()}
          className="text-base font-medium text-gray-55 flex-1 bg-green-120 rounded outline-none px-2 py-1"
          autoFocus
        />
      ) : (
        <p className="text-base font-medium text-gray-55 flex-1 truncate">{chat.name}</p>
      )}

      {(isHovered || isMenuOpen) && !isEditing && (
        <div className="relative">
          <button onClick={handleMenuToggle} className="hover:bg-gray-1 rounded p-1" aria-label="Chat options">
            <span className="text-gray-55 font-bold">⋯</span>
          </button>

          {isMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(false);
                }}
              />
              <div className="absolute right-0 top-8 bg-white border px-3 py-1.5 border-gray-20 rounded-lg shadow-lg z-20 min-w-[150px]">
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
  );
};

export default ChatItem;
