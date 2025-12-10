import { DotsThree, NotePencil, SidebarSimple } from 'phosphor-react';
import SidebarMenu from './SidebarMenu';

interface MobileHeaderProps {
  isSidebarOpen: boolean;
  isChatActive: boolean;
  hasStartedChat: boolean;
  isMenuOpen: boolean;
  onToggleSidebar: () => void;
  onNewChat: () => void;
  onMenuToggle: (e: React.MouseEvent) => void;
  onMenuClose: (e: React.MouseEvent) => void;
  onRename: () => void;
  onDelete: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
  isSidebarOpen,
  isChatActive,
  hasStartedChat,
  isMenuOpen,
  onToggleSidebar,
  onNewChat,
  onMenuToggle,
  onMenuClose,
  onRename,
  onDelete
}) => {
  return (
    <div 
      className={`flex flex-row justify-between backdrop-blur-md bg-white w-full lg:hidden absolute top-0 z-5 transition-all duration-700 ease-in-out ${isSidebarOpen ? 'left-72' : 'left-0'} ${isChatActive ? 'flex' : 'hidden'}`}
    >
      <div className="px-5 py-6 justify-center items-start flex flex-shrink-0">
        <SidebarSimple
          height={24}
          width={24}
          className={`text-primary cursor-pointer ${!isSidebarOpen ? 'bg-white' : ''}`}
          onClick={onToggleSidebar}
        />
      </div>

      {hasStartedChat && !isSidebarOpen && (
        <div className="flex gap-1 flex-row px-5 py-6 justify-center items-start flex-shrink-0 relative">
          <NotePencil
            height={24}
            width={24}
            className={`text-primary cursor-pointer ${!isSidebarOpen ? 'bg-white' : ''}`}
            onClick={onNewChat}
          />  
          <div className="h-full bg-green-120 w-[1px]"></div>
          <DotsThree
            height={24}
            width={24}
            className={`text-primary cursor-pointer ${!isSidebarOpen ? 'bg-white' : ''}`}
            onClick={onMenuToggle}
          />
          <SidebarMenu
            isOpen={isMenuOpen}
            onRename={onRename}
            onDelete={onDelete}
            onClose={onMenuClose}
          />
        </div>
      )}
    </div>
  );
};

export default MobileHeader;