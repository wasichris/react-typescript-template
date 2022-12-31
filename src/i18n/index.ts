import i18n, { t } from 'i18next'
import { initReactI18next } from 'react-i18next'
import zh from './locales/zh-TW'
import en from './locales/en'
import environment from '../environment'
import { AppEnvEnum, LangEnum } from '../constants/enums'
import storage from '../utils/storage'
import { setLocale } from 'yup'

// setup lang validation msg for Yup
setLocale({
  mixed: {
    default: () => t('__validation_invalid'),
    required: () => t('__validation_required'),
    notType: ({ type }) => {
      switch (type) {
        case 'number':
          return t('__validation_numOnly')
        default:
          return t('__validation_invalid')
      }
    }
  },
  string: {
    max: ({ max }) => t('__validation_maxLength', { max }),
    length: ({ length }) => t('__validation_length', { length })
  },
  number: {
    min: ({ min }) => t('__validation_minInclude', { min }),
    max: ({ max }) => t('__validation_maxInclude', { max }),
    integer: () => t('__validation_onlyInteger'),
    moreThan: ({ more }) => t('__validation_min', { min: more })
  }
})

// setup i18n

const resources = {
  en: {
    translation: en
  },
  'zh-TW': {
    translation: zh
  }
}

const getInitLanguage = () => {
  const defaultLng = storage.lang
  if (defaultLng) return defaultLng

  const browserLng = window.navigator.language
  switch (browserLng) {
    case LangEnum.ZH_TW:
    case LangEnum.EN:
      return browserLng
    default:
      return LangEnum.ZH_TW
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    debug: environment.appEnv === AppEnvEnum.DEVELOPMENT,
    lng: getInitLanguage(),
    fallbackLng: LangEnum.ZH_TW,
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
