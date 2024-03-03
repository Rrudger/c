import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index.js';


i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    debug: false,
    resources: {
      ru: {
        translation: resources.ru.translation,
      },
      en: {
        translation: resources.en.translation,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
