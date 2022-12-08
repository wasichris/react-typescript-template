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

i18n
  .use(initReactI18next)
  .init({
    resources,
    debug: environment.appEnv === AppEnvEnum.Development,
    lng: storage.lang || window.navigator.language,
    fallbackLng: LangEnum.ZhTw,
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
