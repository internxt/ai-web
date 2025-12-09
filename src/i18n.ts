import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import de_navbar from './assets/lang/de/navbar.json';
import de_footer from './assets/lang/de/footer.json';
import de_chatbot from './assets/lang/de/chat-bot.json';
import de_page from './assets/lang/de/page.json';

import en_navbar from './assets/lang/en/navbar.json';
import en_footer from './assets/lang/en/footer.json';
import en_chatbot from './assets/lang/en/chat-bot.json';
import en_page from './assets/lang/en/page.json';

import es_navbar from './assets/lang/es/navbar.json';
import es_footer from './assets/lang/es/footer.json';
import es_chatbot from './assets/lang/es/chat-bot.json';
import es_page from './assets/lang/es/page.json';

import it_navbar from './assets/lang/it/navbar.json';
import it_footer from './assets/lang/it/footer.json';
import it_chatbot from './assets/lang/it/chat-bot.json';
import it_page from './assets/lang/it/page.json';

import fr_navbar from './assets/lang/fr/navbar.json';
import fr_footer from './assets/lang/fr/footer.json';
import fr_chatbot from './assets/lang/fr/chat-bot.json';
import fr_page from './assets/lang/fr/page.json';

import ru_navbar from './assets/lang/ru/navbar.json';
import ru_footer from './assets/lang/ru/footer.json';
import ru_chatbot from './assets/lang/ru/chat-bot.json';
import ru_page from './assets/lang/ru/page.json';

import zh_navbar from './assets/lang/zh/navbar.json';
import zh_footer from './assets/lang/zh/footer.json';
import zh_page from './assets/lang/zh/page.json';
import zh_chatbot from './assets/lang/zh/chat-bot.json';

import zhtw_navbar from './assets/lang/zh-tw/navbar.json';
import zhtw_footer from './assets/lang/zh-tw/footer.json';
import zhtw_chatbot from './assets/lang/zh-tw/chat-bot.json';
import zhtw_page from './assets/lang/zh-tw/page.json';

const resources = {
  de: { navbar: de_navbar, footer: de_footer, 'chat-bot': de_chatbot, page: de_page },
  en: { navbar: en_navbar, footer: en_footer, 'chat-bot': en_chatbot, page: en_page },
  es: { navbar: es_navbar, footer: es_footer, 'chat-bot': es_chatbot, page: es_page },
  it: { navbar: it_navbar, footer: it_footer, 'chat-bot': it_chatbot, page: it_page },
  fr: { navbar: fr_navbar, footer: fr_footer, 'chat-bot': fr_chatbot, page: fr_page },
  ru: { navbar: ru_navbar, footer: ru_footer, 'chat-bot': ru_chatbot, page: ru_page },
  zh: { navbar: zh_navbar, footer: zh_footer, 'chat-bot': zh_chatbot, page: zh_page },
  'zh-TW': { navbar: zhtw_navbar, footer: zhtw_footer, 'chat-bot': zhtw_chatbot, page: zhtw_page },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,

    ns: ['navbar', 'footer', 'chat-bot', 'page'],
    defaultNS: 'page',
    fallbackLng: 'en',
    debug: false,
    keySeparator: '.',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
