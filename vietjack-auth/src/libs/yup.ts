import * as yup from 'yup';

import i18n from '@/locales';

yup.setLocale({
  mixed: {
    required: () => i18n.t('fieldRequired'),
  },
  string: {
    email: () => i18n.t('emailInvalid'),
    length: ({ length }) => i18n.t('lengthMustBe', { length: length }),
    min: ({ min }) => i18n.t('minLengthMustBe', { length: min }),
    max: ({ max }) => i18n.t('maxLengthMustBe', { length: max }),
  },
  number: {
    min: ({ min }) => i18n.t('minNumberMustBe', { length: min }),
    max: ({ max }) => i18n.t('maxNumberMustBe', { length: max }),
  },
});

export default yup;
