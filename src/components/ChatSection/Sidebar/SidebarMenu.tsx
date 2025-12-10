import { PencilSimple, Trash } from 'phosphor-react';
import { useTranslation } from 'react-i18next';

interface SidebarMenuProps {
  isOpen: boolean;
  onRename: () => void;
  onDelete: () => void;
  onClose: (e: React.MouseEvent) => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ isOpen, onRename, onDelete, onClose }) => {
  const { t } = useTranslation('chat-bot');

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-10"
        onClick={onClose}
      />
      <div className="absolute right-2 top-14 bg-white border px-3 py-1.5 border-gray-20 rounded-lg shadow-lg z-20 w-[150px]">
        <button
          onClick={onRename}
          className="w-full flex flex-row items-center hover:bg-gray-1 gap-3 text-left py-2 text-base text-gray-100"
        >
          <PencilSimple height={20} width={20} />
          {t('Tools.Rename')}
        </button>
        <div className="w-full h-[1px] bg-green-120"></div>
        <button
          onClick={onDelete}
          className="w-full text-left hover:bg-gray-1 items-center flex gap-3 py-2 text-base text-red"
        >
          <Trash height={20} width={20} />
          {t('Tools.Delete')}
        </button>
      </div>
    </>
  );
};

export default SidebarMenu;