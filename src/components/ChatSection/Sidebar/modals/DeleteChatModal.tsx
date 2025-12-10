import { X } from 'phosphor-react';
import { useTranslation } from 'react-i18next';

interface DeleteChatModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteChatModal: React.FC<DeleteChatModalProps> = ({ isOpen, onCancel, onConfirm }) => {
  const { t } = useTranslation('chat-bot');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onCancel}>
      <div
        className="bg-white rounded-16 p-6 gap-5 flex flex-col max-w-sm mx-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <h3 className="text-2xl font-medium text-gray-100">{t('DeleteConfirm.Title') }</h3>
          <X
            height={20}
            width={20}
            className="text-gray-100 cursor-pointer hover:opacity-70 transition-opacity"
            onClick={onCancel}
          />
        </div>
        <p className="text-base text-gray-55">
          {t('DeleteConfirm.Message')}
        </p>
        <div className="flex gap-3 lg:justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 w-1/2 text-base font-medium text-primary border-2 border-primary hover:bg-gray-1 rounded-lg"
          >
            {t('DeleteConfirm.Cancel')}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 w-1/2 text-base font-medium text-white bg-red hover:bg-red-dark rounded-lg"
          >
            {t('DeleteConfirm.Confirm') }
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteChatModal;