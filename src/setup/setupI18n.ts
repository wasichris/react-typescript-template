import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import zh from '../locales/zh-TW'
import en from '../locales/en'
import environment from '../environment'
import { AppEnvEnum, LangEnum } from '../constants/enums'
import storage from '../utils/storage'

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
    case LangEnum.ZhTw:
    case LangEnum.En:
      return browserLng
    default:
      return LangEnum.ZhTw
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    debug: environment.appEnv === AppEnvEnum.Development,
    lng: getInitLanguage(),
    fallbackLng: LangEnum.ZhTw,
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
