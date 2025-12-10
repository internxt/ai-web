import { NotePencil, SidebarSimple } from 'phosphor-react';
import { useTranslation } from 'react-i18next';
import ChatList from '../ChatList';
import InfoBanner from './InfoBanner';

interface DesktopSidebarProps {
  isOpen: boolean;
  showBanner: boolean;
  sidebarClasses: string;
  onToggle: () => void;
  onNewChat: () => void;
  onCloseBanner: () => void;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  isOpen,
  showBanner,
  sidebarClasses,
  onToggle,
  onNewChat,
  onCloseBanner
}) => {
  const { t } = useTranslation('chat-bot');

  return (
    <div
      className={`lg:flex hidden ${sidebarClasses} left-0 ${isOpen ? 'w-64' : 'w-14'} z-10`}
      style={{
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div
        className={`flex flex-col h-full ${isOpen ? 'px-3' : 'px-2'} py-4 gap-2 ${isOpen ? '' : ' items-center'}`}
      >
        <div className="h-10 w-10 justify-center items-center flex flex-shrink-0">
          <SidebarSimple
            height={30}
            width={30}
            className="text-primary cursor-pointer"
            onClick={onToggle}
          />
        </div>
        <div className="h-[1px] bg-green-120 w-full flex-shrink-0"></div>
        <div
          className="h-10 w-full justify-start items-center pl-1 flex flex-shrink-0 cursor-pointer"
          onClick={onNewChat}
          title={t('Newchat')}
        >
          <NotePencil height={30} width={30} className="text-primary" />
          {isOpen && <span className="ml-2 text-primary font-medium text-sm">{t('Newchat')}</span>}
        </div>
        {isOpen && <ChatList />}
        {showBanner && isOpen && <InfoBanner onClose={onCloseBanner} />}
      </div>
    </div>
  );
};

export default DesktopSidebar;