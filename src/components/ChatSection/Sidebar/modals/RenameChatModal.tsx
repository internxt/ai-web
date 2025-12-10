import { X } from 'phosphor-react';
import { useTranslation } from 'react-i18next';

interface RenameChatModalProps {
  isOpen: boolean;
  chatName: string;
  currentName?: string;
  onCancel: () => void;
  onConfirm: () => void;
  onNameChange: (name: string) => void;
}

const RenameChatModal: React.FC<RenameChatModalProps> = ({
  isOpen,
  chatName,
  currentName,
  onCancel,
  onConfirm,
  onNameChange
}) => {
  const { t } = useTranslation('chat-bot');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onCancel}>
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
            onClick={onCancel}
          />
        </div>
        <input
          type="text"
          value={chatName}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder={currentName || t('RenameConfirm.Placeholder') || 'Nuevo nombre del chat'}
          className="w-full px-3 py-2 text-base border border-gray-25 rounded-lg focus:outline-none focus:border-primary bg-white text-gray-100 placeholder:text-neutral-90 mb-6"
          autoFocus
        />
        <div className="flex gap-3 lg:justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 w-1/2 text-base font-medium text-primary border-2 border-primary hover:bg-gray-1 rounded-lg"
          >
            {t('RenameConfirm.Cancel')}
          </button>
          <button
            onClick={onConfirm}
            disabled={!chatName.trim()}
            className="px-4 py-2 w-1/2 text-sm base-medium text-white bg-primary hover:bg-primary-dark rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t('RenameConfirm.Rename')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenameChatModal;