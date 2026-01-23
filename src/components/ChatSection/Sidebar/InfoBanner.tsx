import { X } from 'phosphor-react';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

interface InfoBannerProps {
  onClose: () => void;
}

const InfoBanner: React.FC<InfoBannerProps> = ({ onClose }) => {
  const { t } = useTranslation('chat-bot');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 650);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`flex flex-row p-3 items-center border rounded-lg gap-2 transition-all duration-1000 ease-in-out ${
      isVisible
        ? 'bg-yellow border-yellow-dark opacity-100 scale-100'
        : 'bg-yellow/0 border-yellow-dark/0 opacity-0 scale-95'
    }`}>
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