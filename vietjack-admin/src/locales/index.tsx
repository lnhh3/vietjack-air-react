import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import languageEN from './en/common.json';

// const I18NextKey = 'i18nextLng';

export enum LanguageType {
  EN = 'en',
  VI = 'vi',
}

export const enum LanguageResources {
  Common = 'common',
}

const resources = {
  [LanguageType.EN]: {
    [LanguageResources.Common]: languageEN,
  },
};

// if (!localStorage.getItem(I18NextKey)) {
//   localStorage.setItem(I18NextKey, LanguageType.VI);
// }

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: [LanguageType.VI, LanguageType.EN],
    resources,
    defaultNS: LanguageResources.Common,
    ns: LanguageResources.Common,
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
