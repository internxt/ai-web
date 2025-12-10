import { MagnifyingGlass, NotePencil, X } from 'phosphor-react';
import { useTranslation } from 'react-i18next';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onNewChat: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onClear, onNewChat }) => {
  const { t } = useTranslation('chat-bot');

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 relative">
        <div className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none">
          <MagnifyingGlass height={18} width={18} className="text-neutral-90" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t('Search')}
          className="w-full h-10 pl-8 pr-3 py-2 text-sm border border-gray-25 rounded-lg focus:outline-none focus:border-primary bg-white text-neutral-90 placeholder:text-neutral-90 transition-colors"
        />
      </div>

      <button
        onClick={value ? onClear : onNewChat}
        className="h-10 w-10 flex items-center justify-center flex-shrink-0 rounded-lg transition-colors cursor-pointer"
      >
        {value ? (
          <X height={24} width={24} className="text-primary" />
        ) : (
          <NotePencil height={24} width={24} className="text-primary" />
        )}
      </button>
    </div>
  );
};

export default SearchBar;