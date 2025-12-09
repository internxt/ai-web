import { CaretDown } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

interface NavigationLinkProps {
  href: string;
  text: string;
  isActive: boolean;
  isDarkMode: boolean;
}

interface DropdownMenuItem {
  href: string;
  text: string;
}

interface DropdownMenuProps {
  label: string;
  items: DropdownMenuItem[];
  darkMode: boolean;
}

interface ItemsNavigationProps {
  darkMode: boolean;
  shouldHideItems: boolean;
}

const getLinkClasses = (isDarkMode: boolean, isActive: boolean) => {
  const baseClasses = 'whitespace-nowrap px-4 py-1.5 text-base font-medium transition duration-150 ease-in-out';
  const darkModeClasses = isDarkMode ? 'text-white hover:text-gray-20' : 'text-gray-60 hover:text-primary';

  return `${baseClasses} ${isActive ? 'text-primary' : darkModeClasses}`;
};

const NavigationLink = ({ href, text, isActive, isDarkMode }: NavigationLinkProps) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={getLinkClasses(isDarkMode, isActive)}>
    {text}
  </a>
);

const DropdownMenu = ({ label, items, darkMode }: DropdownMenuProps) => {
  const menuClasses = darkMode
    ? 'text-white hover:bg-white hover:bg-opacity-10 hover:text-cool-gray-20'
    : 'text-gray-60 hover:bg-gray-100 hover:bg-opacity-5 hover:text-primary';

  const dropdownBgClasses = darkMode ? 'hover:bg-gray-10' : 'hover:bg-gray-5';

  return (
    <div
      className={`group relative flex cursor-default items-center space-x-1 rounded-lg px-4 py-1.5 pr-2 font-medium transition duration-150 ease-in-out ${menuClasses}`}
    >
      <span>{label}</span>
      <CaretDown
        size={20}
        className="translate-y-px text-gray-40 transition duration-150 ease-in-out group-hover:text-cool-gray-30"
      />
      <div className="pointer-events-none absolute left-1/2 top-full z-50 w-52 -translate-x-1/2 translate-y-0 rounded-xl border border-black border-opacity-5 bg-white p-1.5 opacity-0 shadow-subtle transition duration-150 ease-in-out group-hover:pointer-events-auto group-hover:translate-y-1 group-hover:opacity-100">
        <div className="absolute -top-4 left-1/2 h-4 w-4/5 -translate-x-1/2" />
        <div className="relative grid gap-0 whitespace-nowrap lg:grid-cols-1">
          {items.map(({ href, text }) => (
            <a
              key={text}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-row justify-start rounded-lg px-4 py-2 text-base font-medium text-cool-gray-80 ${dropdownBgClasses}`}
            >
              {text}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ItemsNavigation = ({ darkMode, shouldHideItems }: ItemsNavigationProps) => {
  const { t } = useTranslation('navbar');

  if (shouldHideItems) return null;

  const currentPath = typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : '';

  const isPricingActive = currentPath === 'pricing';
  const isBusinessActive = currentPath === 'business';
  const isAboutActive = currentPath === 'about';

  return (
    <div className="links">
      <div className="hidden items-center space-x-0 lg:inline-flex">
        <NavigationLink
          href="https://internxt.com/pricing"
          text={t('links.pricing')}
          isActive={isPricingActive}
          isDarkMode={darkMode}
        />

        <DropdownMenu
          label={t('links.products')}
          items={[
            { href: 'https://internxt.com/drive', text: t('products.drive') },
            { href: 'https://internxt.com/antivirus', text: t('products.antivirus') },
            { href: 'https://internxt.com/vpn', text: t('products.vpn') },
            { href: 'https://internxt.com/cleaner', text: t('products.cleaner') },
            { href: 'https://internxt.com/meet', text: t('products.meet') },
          ]}
          darkMode={darkMode}
        />

        <NavigationLink
          href="https://internxt.com/business"
          text={t('links.business')}
          isActive={isBusinessActive}
          isDarkMode={darkMode}
        />

        <DropdownMenu
          label={t('links.ourValues')}
          items={[
            { href: 'https://internxt.com/privacy', text: t('ourValues.privacy') },
            { href: 'https://internxt.com/open-source', text: t('ourValues.openSource') },
            { href: 'https://internxt.com/green-cloud-computing', text: t('ourValues.sustainability') },
          ]}
          darkMode={darkMode}
        />

        <NavigationLink
          href="https://internxt.com/about"
          text={t('links.about')}
          isActive={isAboutActive}
          isDarkMode={darkMode}
        />
      </div>
    </div>
  );
};
