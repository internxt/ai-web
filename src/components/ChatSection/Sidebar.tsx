import { NotePencil, SidebarSimple, X } from 'phosphor-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useChatContext } from './hooks/useChatContext';
import ChatList from './ChatList';

const Sidebar: React.FC = () => {
  const { t } = useTranslation('chat-bot');
  const { isSidebarOpen, isChatActive, showYellowBanner, setIsSidebarOpen, handleNewChat, setShowYellowBanner } =
    useChatContext();

  const sidebarClasses = useMemo(() => {
    const baseClasses = 'border-r h-full absolute top-0 ease-in-out';
    const activeClasses = isChatActive
      ? 'bg-white border-green-120'
      : 'bg-transparent border-transparent opacity-0 pointer-events-none';
    return `${baseClasses} ${activeClasses}`;
  }, [isChatActive]);

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

      <div className="flex lg:hidden absolute top-0 left-0 z-5">
        <div className={`${isSidebarOpen ? 'hidden' : 'flex'} px-5 py-6 justify-center items-start flex flex-shrink-0`}>
          <SidebarSimple
            height={24}
            width={24}
            className="text-primary cursor-pointer"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>
      </div>

      <div
        className={`lg:hidden flex ${sidebarClasses} left-0 ${isSidebarOpen ? 'w-64' : 'w-0'} z-10 overflow-hidden ${!isSidebarOpen && 'pointer-events-none'}`}
        style={{
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="flex flex-col h-full px-3 py-4 gap-2 w-64 flex-shrink-0">
          <div className="h-10 w-10 justify-center items-center flex flex-shrink-0">
            <SidebarSimple
              height={24}
              width={24}
              className="text-primary cursor-pointer"
              onClick={() => setIsSidebarOpen(false)}
            />
          </div>
          <div className="h-[1px] bg-green-120 w-full flex-shrink-0"></div>
          <div
            className="h-10 w-full justify-start items-center pl-1 flex flex-shrink-0 cursor-pointer"
            onClick={handleNewChat}
            title={t('Newchat')}
          >
            <NotePencil height={24} width={24} className="text-primary" />
            <span className="ml-2 text-primary font-medium text-sm">{t('Newchat')}</span>
          </div>
          <ChatList />
          {showYellowBanner && (
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
    </>
  );
};

export default Sidebar;
