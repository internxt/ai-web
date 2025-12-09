import { Disclosure, Transition } from '@headlessui/react';
import { CaretDown, CaretUp, Globe } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

interface LanguageMobileBoxProps {
  darkMode?: boolean;
}

const languages = [
  { text: 'English (EN)', lang: 'en' },
  { text: 'Español (ES)', lang: 'es' },
  { text: 'Français (FR)', lang: 'fr' },
  { text: 'Italiano (IT)', lang: 'it' },
  { text: 'Русский (RU)', lang: 'ru' },
  { text: 'Deutsch (DE)', lang: 'de' },
  { text: '中国人 (ZH)', lang: 'zh' },
  { text: '中国人 (TW)', lang: 'zh-tw' },
];

export default function LanguageMobileBox({ darkMode }: LanguageMobileBoxProps) {
  const { i18n } = useTranslation();
  
  // Obtenemos el idioma actual directamente de i18next
  const currentLang = i18n.language;
  
  // Buscamos el texto bonito para mostrarlo
  const selectedLanguage = languages.find((language) => language.lang === currentLang)?.text || 'English (EN)';

  return (
    <div className="flex w-screen">
      <Disclosure as="div" className="w-screen">
        {/* AÑADIDO: Desestructuramos 'close' para poder cerrar el menú al hacer click */}
        {({ open, close }) => (
          <>
            <Disclosure.Button
              className={`${
                darkMode ? 'text-gray-1' : 'text-gray-100'
              } flex w-full items-center justify-between px-6 py-4 text-lg font-medium outline-none`}
            >
              <div className="flex flex-row items-center space-x-2">
                <Globe className={darkMode ? 'text-white' : 'text-black'} size={20} weight="regular" />
                <span className="flex flex-row">{selectedLanguage}</span>
              </div>
              <CaretDown className={`${open ? 'hidden' : 'flex'} text-gray-80`} weight="bold" />
              <CaretUp className={`${!open ? 'hidden' : 'flex'} text-gray-80`} weight="bold" />
            </Disclosure.Button>

            <Transition
              enter="transition duration-200 ease-out"
              enterFrom="-translate-y-10 opacity-0"
              enterTo="translate-y-0 opacity-100"
              leave="transition duration-200 ease-out"
            >
              <Disclosure.Panel
                className={`flex flex-col bg-gray-1 px-6 font-semibold ${!open ? 'hidden' : 'flex'} ${
                  darkMode ? 'bg-gray-71 text-green-120' : 'text-gray-60'
                } max-h-48 space-y-2 overflow-y-auto p-4`}
              >
                {languages.map((language) => (
                  <button
                    key={language.lang}
                    onClick={() => {
                      // 1. Cambiamos el idioma en i18next
                      // Esto forzará que todos los componentes con useTranslation() se vuelvan a renderizar
                      i18n.changeLanguage(language.lang);
                      
                      // 2. Cerramos el desplegable
                      close();
                    }}
                    className={`block w-full py-2 text-center transition-colors ${
                      currentLang === language.lang ? 'text-primary font-bold' : 'hover:text-primary'
                    }`}
                  >
                    {language.text}
                  </button>
                ))}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
}