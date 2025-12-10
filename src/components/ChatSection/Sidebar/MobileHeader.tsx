import { DotsThree, NotePencil, SidebarSimple } from 'phosphor-react';
import SidebarMenu from './SidebarMenu';


interface MobileHeaderProps {
  isSidebarOpen: boolean;
  hasStartedChat: boolean;
  isMenuOpen: boolean;
  onToggleSidebar: () => void;
  onNewChat: () => void;
  onMenuToggle: (e: React.MouseEvent) => void;
  onMenuClose: () => void;
  onRename: () => void;
  onDelete: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
  isSidebarOpen,
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
      className={`flex flex-row justify-between backdrop-blur-md bg-white/80 w-full lg:hidden absolute top-0 ${isSidebarOpen ? 'left-72' : 'left-0'} z-5`}
      style={{
        transition: 'left 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
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
          <div className='h-full bg-green-120 w-[1px]'></div>
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