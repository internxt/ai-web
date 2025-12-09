const path = require('path');

module.exports = {
  i18n: {
    locales: ['de', 'en', 'es', 'it', 'fr', 'ru', 'zh-TW'],
    defaultLocale: 'en',

    localePath: path.resolve('./src/assets/lang'),
  },
};
