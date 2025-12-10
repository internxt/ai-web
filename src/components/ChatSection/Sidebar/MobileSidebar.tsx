import ChatList from '../ChatList';
import InfoBanner from './InfoBanner';
import SearchBar from './SearchBar';

interface MobileSidebarProps {
  isOpen: boolean;
  showBanner: boolean;
  searchQuery: string;
  sidebarClasses: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  onNewChat: () => void;
  onCloseBanner: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({
  isOpen,
  showBanner,
  searchQuery,
  sidebarClasses,
  onSearchChange,
  onClearSearch,
  onNewChat,
  onCloseBanner
}) => {
  return (
    <div
      className={`lg:hidden flex ${sidebarClasses} left-0 ${isOpen ? 'w-[85%]' : 'w-0'} z-10 overflow-hidden ${!isOpen && 'pointer-events-none'}`}
      style={{
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div className="flex flex-col h-full w-full flex-shrink-0">
        <div className="flex flex-col px-3 py-4 gap-3">
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            onClear={onClearSearch}
            onNewChat={onNewChat}
          />
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide px-3 py-2">
          <ChatList searchQuery={searchQuery} />
        </div>

        {showBanner && (
          <div className="px-3 pb-3 flex-shrink-0">
            <InfoBanner onClose={onCloseBanner} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileSidebar;