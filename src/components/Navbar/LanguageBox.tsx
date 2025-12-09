import { CaretDown, Globe } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageMobileProps {
  singlesDay?: boolean;
  darkMode?: boolean;
}

const currentLang: Record<string, string> = {
  es: 'Español (ES)',
  fr: 'Français (FR)',
  de: 'Deutsch (DE)',
  en: 'English (EN)',
  it: 'Italiano (IT)',
  zh: '中国 (ZH)',
  ru: 'Русский (RU)',
  'zh-tw': 'Taiwan (TW)',
};

const selectedLang: Record<string, string> = {
  es: 'ES',
  fr: 'FR',
  de: 'DE',
  en: 'EN',
  it: 'IT',
  zh: 'ZH',
  ru: 'RU',
  'zh-tw': 'TW',
};

export default function LanguageBox({ darkMode, singlesDay }: LanguageMobileProps) {
  const { i18n } = useTranslation();
  const [currentLangText, setCurrentLangText] = useState<string>('EN');

  useEffect(() => {
    if (i18n.language && selectedLang[i18n.language]) {
      setCurrentLangText(selectedLang[i18n.language]);
    }
  }, [i18n.language]);

  function changeLang(lang: string) {
    i18n.changeLanguage(lang);

    if (selectedLang[lang]) {
      setCurrentLangText(selectedLang[lang]);
    }
  }

  const renderLanguageOption = (langCode: string) => (
    <button
      key={langCode}
      onClick={() => changeLang(langCode)}
      className="flex w-full flex-row justify-start rounded-lg px-4 py-2 text-base font-medium text-cool-gray-80 hover:bg-gray-1"
    >
      {currentLang[langCode]}
    </button>
  );

  return (
    <div
      className={`group relative flex cursor-default space-x-1 rounded-lg px-4 py-1.5 pr-2 font-medium transition duration-150 ease-in-out`}
    >
      <Globe size={24} className={darkMode ? 'text-white' : 'text-gray-60'} />
      <p className={darkMode ? 'text-white' : 'text-gray-60'}>{currentLangText}</p>
      <CaretDown
        size={20}
        className={`${darkMode ? 'text-white' : 'text-gray-40'} translate-y-px transition duration-150 ease-in-out`}
      />

      <div className="pointer-events-none absolute left-1/2 top-full z-50 w-52 -translate-x-1/2 translate-y-0 rounded-xl border border-black border-opacity-5 bg-white p-1.5 opacity-0 shadow-subtle transition duration-150 ease-in-out group-hover:pointer-events-auto group-hover:translate-y-1 group-hover:opacity-100">
        <div className="absolute -top-4 left-1/2 h-4 w-4/5 -translate-x-1/2" />

        <div className="relative grid gap-0 whitespace-nowrap lg:grid-cols-1">
          {singlesDay ? (
            <>
              {renderLanguageOption('en')}
              {renderLanguageOption('zh')}
              {renderLanguageOption('zh-tw')}
            </>
          ) : (
            <>
              {renderLanguageOption('en')}
              {renderLanguageOption('es')}
              {renderLanguageOption('fr')}
              {renderLanguageOption('de')}
              {renderLanguageOption('it')}
              {renderLanguageOption('zh')}
              {renderLanguageOption('ru')}
              {renderLanguageOption('zh-tw')}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
