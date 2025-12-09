import { useEffect, useState } from 'react';
import { Transition, Disclosure } from '@headlessui/react';
import Hamburger from 'hamburger-react';
import { useTranslation } from 'react-i18next';
import { CaretDown, CaretUp } from '@phosphor-icons/react';
import { ItemsNavigation } from './ItemsNavigation';
import LanguageBox from './LanguageBox';
import LanguageMobileBox from './LanguageMobileBox';
import logo from '../../logo_dark.svg';

export default function Navbar({ darkMode = false, fixed = false, hide = false, isLinksHidden = false, hideCTA = false }) {
  const [menuState, setMenuState] = useState(false);
  const [scrolled, setScrolled] = useState(true);
  const { t } = useTranslation('navbar');

  const handleScroll = () => setScrolled(window.pageYOffset > 0);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path: string) => {
    window.location.href = path;
    setMenuState(false);
  };

  return (
    <div
      id="navbar"
      className={`${hide ? 'hidden' : ''} ${
        isLinksHidden ? 'top-0' : 'top-18'
      } top-18 fixed left-0 flex h-20 w-full items-center ${
        darkMode ? (scrolled ? 'bg-black bg-opacity-100' : 'bg-black bg-opacity-0') : 'bg-white'
      } transition-all duration-100 lg:h-16 ${
        fixed ? (darkMode ? 'bg-opacity-0' : 'bg-opacity-100') : ''
      } ${scrolled && fixed ? 'border-opacity-5' : 'border-opacity-0'} ${
        menuState ? 'bg-opacity-100' : ''
      } z-40 border-b border-black`}
    >
      <div className="w-full px-5 lg:px-10 lg:pt-1 xl:px-32 3xl:px-80">
        <div className="flex items-center justify-between">
          <div className="flex flex-row gap-8">
            <div className="flex flex-row items-center justify-start space-x-4 lg:space-x-0">
              <a href="https://internxt.com/es" className="flex flex-shrink-0" target="_blank" rel="noopener noreferrer">
                <img
                  loading="lazy"
                  className="h-[10.5px] w-24 select-none lg:h-3 lg:w-[110px]"
                  src={logo}
                  alt="Internxt logo"
                />
              </a>
            </div>
            <ItemsNavigation darkMode={darkMode} shouldHideItems={isLinksHidden}  />
          </div>

          {/* Right side - Language selector and CTA */}
          <div className="relative flex h-full w-max flex-row items-center justify-center gap-2">
            {!hideCTA && (
              <button
                onClick={() => handleNavigation('https://internxt.com/pricing')}
                id="choose-storage-button"
                className="flex justify-center rounded-lg border border-transparent bg-primary px-3 py-1 text-sm font-medium text-white transition-all duration-75 hover:bg-primary-dark focus:outline-none active:bg-primary-dark sm:inline-flex"
              >
                <p className="whitespace-nowrap">{t('links.getStarted')}</p>
              </button>
            )}

            <div className="hidden items-end justify-center bg-transparent lg:flex">
              <LanguageBox darkMode={darkMode} />
            </div>

            {!isLinksHidden && (
              <>
                <div className="lg:hidden">
                  <Hamburger
                    label="Show menu"
                    size={20}
                    color={darkMode && !menuState ? '#fff' : '#3A3A3B'}
                    toggled={menuState}
                    toggle={setMenuState}
                  />

                  {/* Mobile hamburger menu */}
                  <div
                    className={`absolute right-0 top-10 overflow-hidden bg-white px-5 font-semibold transition-all duration-500 ${
                      menuState ? 'h-screen w-screen pb-14' : 'h-0'
                    }`}
                  >
                    <div className="mt-4 flex flex-col text-gray-100">
                      <a
                        href="https://internxt.com/pricing"
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigation('https://internxt.com/pricing');
                          
                        }}
                        className={`flex w-full translate-y-0 px-8 py-4 outline-none transition delay-100 duration-300 ${
                          menuState ? 'opacity-100' : '-translate-y-4 opacity-0'
                        }`}
                      >
                        {t('links.pricing')}
                      </a>

                      <Disclosure
                        as="div"
                        className={`flex w-screen translate-y-0 cursor-pointer flex-col outline-none transition delay-200 duration-300 ${
                          menuState ? 'opacity-100' : '-translate-y-4 opacity-0'
                        }`}
                      >
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex w-full items-center justify-between px-8 py-4">
                              <span className="flex flex-row">{t('links.products')}</span>
                              <CaretDown
                                className={`${open ? 'hidden' : 'flex'} text-gray-80`}
                                weight="bold"
                              />
                              <CaretUp
                                className={`${!open ? 'hidden' : 'flex'} text-gray-80`}
                                weight="bold"
                              />
                            </Disclosure.Button>
                            <Transition
                              enter="transition duration-200 ease-out"
                              enterFrom="-translate-y-10 opacity-0"
                              enterTo="translate-y-0 opacity-100"
                              leave="transition duration-200 ease-out"
                            >
                              <Disclosure.Panel
                                className={`flex flex-col bg-gray-1 px-8 font-medium ${
                                  !open ? 'hidden' : 'flex'
                                } ${darkMode ? 'text-gray-30' : 'text-gray-60'} space-y-8 p-4`}
                              >
                                <a href="https://internxt.com/drive" target="_blank" rel="noopener noreferrer" className="flex flex-row space-x-2" >
                                  <p>{t('products.drive')}</p>
                                </a>
                                <a href="https://internxt.com/vpn" target="_blank" rel="noopener noreferrer" className="flex flex-row space-x-2">
                                  <p>{t('products.vpn')}</p>
                                </a>
                                <a href="https://internxt.com/antivirus" target="_blank" rel="noopener noreferrer" className="flex flex-row space-x-2">
                                  <p>{t('products.antivirus')}</p>
                                </a>
                                <a href="https://internxt.com/cleaner" target="_blank" rel="noopener noreferrer" className="flex flex-row space-x-2">
                                  <p>{t('products.cleaner')}</p>
                                </a>
                                <a href="https://internxt.com/meet" target="_blank" rel="noopener noreferrer"className="flex flex-row space-x-2">
                                  <p>{t('products.meet')}</p>
                                </a>
                              </Disclosure.Panel>
                            </Transition>
                          </>
                        )}
                      </Disclosure>

                      <a
                        href="https://internxt.com/business"
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigation('https://internxt.com/business');
                        }}
                        className={`flex w-full translate-y-0 px-8 py-4 outline-none transition delay-100 duration-300 ${
                          menuState ? 'opacity-100' : '-translate-y-4 opacity-0'
                        }`}
                      >
                        {t('links.business')}
                      </a>

                      <Disclosure
                        as="div"
                        className={`flex w-screen translate-y-0 cursor-pointer flex-col outline-none transition delay-200 duration-300 ${
                          menuState ? 'opacity-100' : '-translate-y-4 opacity-0'
                        }`}
                      >
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex w-full items-center justify-between px-8 py-4">
                              <span className="flex flex-row">{t('links.ourValues')}</span>
                              <CaretDown
                                className={`${open ? 'hidden' : 'flex'} text-gray-80`}
                                weight="bold"
                              />
                              <CaretUp
                                className={`${!open ? 'hidden' : 'flex'} text-gray-80`}
                                weight="bold"
                              />
                            </Disclosure.Button>
                            <Transition
                              enter="transition duration-200 ease-out"
                              enterFrom="-translate-y-10 opacity-0"
                              enterTo="translate-y-0 opacity-100"
                              leave="transition duration-200 ease-out"
                            >
                              <Disclosure.Panel
                                className={`flex flex-col bg-gray-1 px-8 font-medium ${
                                  !open ? 'hidden' : 'flex'
                                } ${darkMode ? 'text-gray-30' : 'text-gray-60'} space-y-8 p-4`}
                              >
                                <a href="https://internxt.com/privacy" target="_blank" rel="noopener noreferrer" className="flex flex-row space-x-2">
                                  <p>{t('ourValues.privacy')}</p>
                                </a>
                                <a href="https://internxt.com/open-source" target="_blank" rel="noopener noreferrer" className="flex flex-row space-x-2">
                                  <p>{t('ourValues.openSource')}</p>
                                </a>
                                <a href="https://internxt.com/sustainability" target="_blank" rel="noopener noreferrer" className="flex flex-row space-x-2">
                                  <p>{t('ourValues.sustainability')}</p>
                                </a>
                              </Disclosure.Panel>
                            </Transition>
                          </>
                        )}
                      </Disclosure>

                      <a
                        href="https://internxt.com/about"
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigation('https://internxt.com/about');
                        }}
                        className={`flex w-full translate-y-0 cursor-pointer px-8 py-4 outline-none transition delay-250 duration-300 ${
                          menuState ? 'opacity-100' : '-translate-y-4 opacity-0'
                        }`}
                      >
                        {t('links.about')}
                      </a>

                      <LanguageMobileBox darkMode={darkMode} />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}