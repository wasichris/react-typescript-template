import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { GenderEnum, LangEnum } from '../../../constants/enums'
import environment from '../../../environment'
import storage from '../../../utils/storage'
import { Formik, Form, FormikHelpers } from 'formik'
import * as yup from 'yup'
import FormTextInput from '../../../components/form/FormTextInput'
import { useRef, useState } from 'react'
import { requiredStrSchema, strLengthRangeSchema } from '../../../validations/schema'
import schemaChain from '../../../validations/schemaChain'
import { getEnumDescription, getEnumOptions } from '../../../utils/decoratorHelper'
import { decrement, increment, incrementAsync, selectCount } from '../../../store/slices/counterSlice'
import useClickOutside from '../../../hooks/useClickOutside'
import useAppDispatch from '../../../hooks/useAppDispatch'
import useAppSelector from '../../../hooks/useAppSelector'

interface IProps {
};

const Demo = (props: IProps) => {
  // route
  const navigate = useNavigate()
  const { userId } = useParams() // get params from url

  // language
  const { t, i18n } = useTranslation()
  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang)
    storage.lang = lang
  }

  // formik
  const [initFormValues] = useState({ account: '', password: '', salary: 0 })
  const validationSchema = () =>
    yup.object().shape({
      account:
        yup.string()
          .concat(requiredStrSchema(t('__account' /* 帳號 */))) // 自定邏輯
          .max(5), // 內建邏輯
      password:
        yup.string()
          .concat(requiredStrSchema(t('__pwd' /* 密碼 */)))
          .concat(strLengthRangeSchema(2, 10)),
      salary:
        schemaChain
          .twMoneyAmt(true, t('__salary' /* 月薪 */)) // 自定邏輯串(針對通用且有意義性的資料類型)
    })

  type FormValues = typeof initFormValues
  const onFormSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    alert(JSON.stringify(values, null, 2))
    actions.setSubmitting(false)
  }

  // redux
  const counterValue = useAppSelector(state => state.counter.value)
  const counterValueSame = useAppSelector(selectCount)
  const dispatch = useAppDispatch()

  // hook
  const targetDiv = useRef(null)
  useClickOutside(targetDiv, () => console.log('clicked outside of my area!!'), true)

  return <div className="dev-container">

    <div>Dev - Demo Page</div>

    <hr />
    <div >
      <h3>開發環境</h3>
      <ul>
        <li>env: {environment.appEnv}</li>
        <li>mode: {environment.appMode}</li>
      </ul>
    </div>

    <hr />
    <div>
      <h3>使用導航</h3>
      user id from url: {userId}
      <br />
      <input type="button" value="go to /dev/demo/user01" onClick={() => { navigate('/dev/demo/user01') }} />
      <br />
      <input type="button" value="go to /dev/demo/user02" onClick={() => { navigate('/dev/demo/user02') }} />
    </div>

    <hr />
    <div>
      <h3>使用Enum產生選單</h3>
      <div>
        <p>使用 GenderEnum 產生選單</p>
        <select name="gender" id="gender">
          {getEnumOptions(GenderEnum).map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
      <div>
        可以使用 GenderEnum 值取得定義的 description 文字
      </div>
      <input type="button" value="get GenderEnum.MALE description" onClick={() => {
        const description = getEnumDescription(GenderEnum, GenderEnum.MALE)
        alert(description)
      }} />
    </div>

    <hr />
    <div>
      <h3>多國語系</h3>
      <ul>
        <li>Current Language: {i18n.language}</li>
        <li>{t('__understand')}</li>
      </ul>
      <br />
      <input type="button" value="en" onClick={() => { changeLang(LangEnum.EN) }} />
      <input type="button" value="zh-TW" onClick={() => { changeLang(LangEnum.ZH_TW) }} />
    </div>

    <hr />
    <div>
      <h3>表單檢核</h3>
      <Formik
        enableReinitialize
        initialValues={initFormValues}
        validationSchema={validationSchema()}
        onSubmit={onFormSubmit}
        validateOnMount
      >
        {({ dirty, isValid, resetForm }) => (
          <Form >

            <div>
              <label htmlFor='account' > {t('__account' /* 帳號 */)}</label>
              <FormTextInput id="account" name="account" type="text" />
            </div>

            <div>
              <label htmlFor='password' > {t('__pwd' /* 密碼 */)} </label>
              <FormTextInput id="password" name="password" type="password" />
            </div>

            <div>
              <label htmlFor='salary' > {t('__salary' /* 月薪 */)} </label>
              <FormTextInput id="salary" name="salary" type="text" caption='使用臺幣為單位' />
            </div>

            <input
              type="button"
              onClick={() => resetForm({ values: initFormValues })}
              value={t('__clear' /* 清除 */) || ''} />

            <input
              type="submit"
              disabled={!(dirty && isValid)}
              value={t('__submit' /* 送出 */) || ''} />

          </Form>
        )}
      </Formik>
    </div>

    <hr />

    <div>
      <h3>Redux Toolkit</h3>
      <p>counter: {counterValue} = {counterValueSame}</p>
      <br />
      <input type="button" value="+" onClick={() => { dispatch(increment()) }} />
      <input type="button" value="-" onClick={() => { dispatch(decrement()) }} />
      <input type="button" value="thunk" onClick={() => { dispatch(incrementAsync(10)) }} />
    </div>

    <hr />

    <div ref={targetDiv}>
      <h3>自定義 Hook </h3>
      <p>超過這個區域點擊時，console會有訊息</p>
      <p>line1------</p>
      <p>line2------</p>
      <p>line3------</p>
    </div>

    <hr />

  </div>
}

export default Demo
