import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
  en: {
    translation: {
      Welcome: 'Welcome',
      'Good Morning': 'Good Morning',
    },
  },
  id: {
    translation: {
      Welcome: 'Selamat Datang',
      'Good Morning': 'Selamat Pagi',
    },
  },
  sunda: {
    translation: {
      Welcome: 'Wilujeng Sumping',
      'Good Morning': 'Wilujeng Enjing',
    },
  },
};

i18n.use(initReactI18next).init({
  resources: resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v3',
});
