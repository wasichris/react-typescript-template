import { t } from 'i18next'
import { setLocale } from 'yup'

setLocale({
  mixed: {
    default: t('__validation_invalid') || '',
    notType: ({ type }) => {
      switch (type) {
        case 'number':
          return t('__validation_numOnly'/* 請輸入數字 */)
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
    integer: t('__validation_onlyInteger') || '',
    moreThan: ({ more }) => t('__validation_min', { min: more })
  }
})
