import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { bg, en } from './locals';

export const resources = {
  en: {
    translation: en,
  },
  bg: {
    translation: bg,
  },
};

i18next.use(initReactI18next).init({
  debug: true,
  resources: resources,
  lng: 'en',
  fallbackLng: 'en',
  compatibilityJSON: 'v3',
});

export default i18next;
