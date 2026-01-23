import { X } from 'phosphor-react';
import { useTranslation } from 'react-i18next';

interface InfoBannerProps {
  onClose: () => void;
}

const InfoBanner: React.FC<InfoBannerProps> = ({ onClose }) => {
  const { t } = useTranslation('chat-bot');

  return (
    <div className="flex flex-row p-3 items-center bg-yellow border border-yellow-dark rounded-lg gap-2">
      <p className="text-xs font-medium flex-1">{t('InfoCard')}</p>
      <X
        className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
        height={20}
        width={20}
        onClick={onClose}
      />
    </div>
  );
};

export default InfoBanner;