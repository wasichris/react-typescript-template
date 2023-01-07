import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { GenderEnum, LangEnum } from '../../../constants/enums'
import environment from '../../../environment'
import storage from '../../../utils/storage'
import { Formik, Form } from 'formik'
import FormTextInput from '../../../components/form/FormTextInput'
import { useRef, useState } from 'react'
import { getEnumDescription, getEnumOptions } from '../../../utils/helpers/decoratorHelper'
import { decrement, increment, incrementAsync, selectCount } from '../../../store/slices/counterSlice'
import useClickOutside from '../../../utils/hooks/useClickOutside'
import useAppDispatch from '../../../utils/hooks/useAppDispatch'
import useAppSelector from '../../../utils/hooks/useAppSelector'
import sampleApi from '../../../services/api/sampleApi'
import { ISampleGetUserReq } from '../../../services/models/sample'
import { selectLoadingApiCounter } from '../../../store/slices/appSlice'
import useSampleForm from './hooks/useSampleForm'
import SampleImg from './components/SampleImg'
import MsgBox from '../../../components/MsgBox'
import { showMsgBox } from '../../../utils/helpers/commonHelper'
import Modal from '../../../components/common/Modal'

interface IProps {
  title?: string,
  onSomethingDone?: () => void
};

const Sample = (props: IProps) => {
  // 範例：route
  const navigate = useNavigate()
  const { userId } = useParams() // get params from url

  // 範例：i18n
  const { t, i18n } = useTranslation()
  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang)
    storage.lang = lang
  }

  // 範例：formik (邏輯抽出至 hook 來降低此組件的複雜度)
  const { initFormValues, setInitFormValues, validationSchema, onFormSubmit } =
    useSampleForm({ account: '', password: '', salary: 0 })

  // 範例：redux
  const counterValue = useAppSelector(state => state.counter.value)
  const counterValueSame = useAppSelector(selectCount)
  const dispatch = useAppDispatch()

  // 範例：hook
  const targetDiv = useRef<HTMLElement>(null)
  useClickOutside(targetDiv, () => console.log('clicked outside of my area!!'), true)

  // 範例：call mutation api (no cached)
  const loadingApiCounter = useAppSelector(selectLoadingApiCounter)
  const [apiSampleGetProducts] = sampleApi.useSampleGetProductsMutation()
  const handleCallSampleGetProductsApi = async () => {
    const response = await apiSampleGetProducts({ category: 'pc' }).unwrap()
    const { header: { returnCode, returnMsg }, body } = response
    if (returnCode.isSuccessCode()) {
      console.log(body)
    } else {
      alert(`${returnCode}:${returnMsg}`)
    }
  }

  const [apiSampleGetUser] = sampleApi.useSampleGetUserMutation()
  const [username, setUsername] = useState('')
  const handleCallSampleGetUserApi = async () => {
    const req: ISampleGetUserReq = { userId: 'chris' }
    const response = await apiSampleGetUser(req).unwrap()
    const { header: { returnCode, returnMsg }, body } = response
    if (returnCode.isSuccessCode()) {
      setUsername(`${body.username} ${body.firstName}`)
    } else {
      alert(`${returnCode}:${returnMsg}`)
    }
  }

  // 範例：call query api (cached) - 直接執行
  // => 請參考 <SampleImg /> 組件內容，載入即執行圖片下載並快取

  // 範例：call query api (cached) - 手動執行
  const [lazyBase64Img, setLazyBase64Img] = useState('')
  const [apiSampleGetImg] = sampleApi.useLazySampleGetImgQuery() // 自定呼叫api時間
  const handleCallLazyCachedApi = async () => {
    const img = await apiSampleGetImg({ height: 200, width: 800 }, true /* cached */).unwrap()
    setLazyBase64Img(img)
  }

  // 範例：彈跳視窗樣板設計＆通用文字訊息彈跳視窗呼叫方式
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isLocalMsgBoxVisible, setIsLocalMsgBoxVisible] = useState(false)

  // ===

  return <div className="pg-dev">

    <h1>Dev - Sample Page</h1>

    <section className='section'>
      <h2 className='section__title'>開發環境</h2>
      <ul>
        <li>env: {environment.appEnv}</li>
        <li>mode: {environment.appMode}</li>
      </ul>
    </section>

    <section className='section'>
      <h2 className='section__title'>使用導航</h2>
      user id from url: {userId}
      <br />
      <input type="button" value="go to /dev/sample/user01" onClick={() => { navigate('/dev/sample/user01') }} data-testid="goUser01Btn" />
      <br />
      <input type="button" value="go to /dev/sample/user02" onClick={() => { navigate('/dev/sample/user02') }} />
      <br />
      <Link data-testid="goUser03Link" to="/dev/sample/user03?id=1234">go to /dev/sample/user03 by link</Link>
    </section>

    <section className='section' >
      <h2 className='section__title'>使用Enum產生選單</h2>
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
    </section>

    <section className='section'>
      <h2 className='section__title'>多國語系</h2>
      <ul>
        <li>Current Language: {i18n.language}</li>
        <li>{t('__understand')}</li>
      </ul>
      <br />
      <input type="button" value="en" onClick={() => { changeLang(LangEnum.EN) }} />
      <input type="button" value="zh-TW" onClick={() => { changeLang(LangEnum.ZH_TW) }} />
    </section>

    <section className='section'>
      <h2 className='section__title'>表單檢核</h2>
      <Formik
        enableReinitialize
        initialValues={initFormValues}
        validationSchema={validationSchema()}
        onSubmit={onFormSubmit}
      >
        {({ dirty, isValid, resetForm, values }) => (
          <Form >

            <div className='input-group'>
              <label className='input-group__label' htmlFor='account' > {t('__account' /* 帳號 */)}</label>
              <FormTextInput className='input-group__input' id="account" name="account" type="text" />
            </div>

            <div className='input-group'>
              <label className='input-group__label' htmlFor='password' > {t('__pwd' /* 密碼 */)} </label>
              <FormTextInput className='input-group__input' id="password" name="password" type="password" />
            </div>

            <div className='input-group'>
              <label className='input-group__label' htmlFor='salary' > {t('__salary' /* 月薪 */)} </label>
              <FormTextInput className='input-group__input' id="salary" name="salary" type="text" caption={t('__useTwd' /* 使用臺幣為單位 */)} />
            </div>

            <input
              type="button"
              onClick={() => resetForm({ values: initFormValues })}
              value={t('__clear' /* 清除 */)!} />

            <input
              type="submit"
              disabled={!(dirty && isValid)}
              value={t('__submit' /* 送出 */)!} />

            <br />

            <input
              type="button"
              onClick={() => setInitFormValues({ ...initFormValues, salary: values.salary + 1 })}
              value={'搭配 enableReinitialize 重新給予初始值來 re-init 表單（可能是從遠端來的資料）'} />

          </Form>
        )}
      </Formik>
    </section>

    <section className='section'>
      <h2 className='section__title'>Redux Toolkit</h2>
      <p>counter: {counterValue} = {counterValueSame}</p>
      <br />
      <input type="button" value="+" onClick={() => { dispatch(increment()) }} data-testid="addCounterBtn" />
      <input type="button" value="-" onClick={() => { dispatch(decrement()) }} />
      <input type="button" value="thunk" onClick={async () => {
        const result = await dispatch(incrementAsync(10))
        console.log(result)
      }} />

    </section>

    <section className='section' ref={targetDiv}>
      <h2 className='section__title'>自定義 Hook </h2>
      <p>超過這個區域點擊時，console會有訊息</p>
      <p>line1------</p>
      <p>line2------</p>
      <p>line3------</p>
    </section>

    <section className='section'>
      <h2 className='section__title'>呼叫api</h2>
      <p>loadingApiCounter: {loadingApiCounter}</p>
      <div>
        <h3>mutation(無快取)</h3>
        <input type="button" value="call SampleGetProducts api(不列入loader)" onClick={handleCallSampleGetProductsApi} /> <br />
        <input type="button" value="call SampleGetUser api(有列入loader)" onClick={handleCallSampleGetUserApi} data-testid="callSampleGetUserApiBtn" />
        {username && <p data-testid="username">username : {username}</p>}
      </div>
      <div>
        <h3> query(有快取)</h3>
        <p>使用 query 直接執行 SampleGetImg api 取得圖片</p>
        <SampleImg width={800} height={200} />
      </div>
      <div>
        <span>使用 query-lazy 手動執行 SampleGetImg api 取得圖片</span>
        <input type="button" value="get image" onClick={handleCallLazyCachedApi} />
        <div> <img alt="" src={lazyBase64Img} /> </div>
      </div>
    </section>

    <section className='section'>
      <h2 className='section__title'>單元測試的附加情境</h2>
      <div>
        <input data-testid="doSomethingBtn" type="button" value="呼叫組件傳入的callback"
          onClick={() => { props?.onSomethingDone && props.onSomethingDone() }} /> <br />
        <p data-testid="title">{props.title}</p>
      </div>

    </section>

    <section className='section'>
      <h2 className='section__title'>彈跳視窗樣板設計＆通用文字訊息彈跳視窗呼叫方式</h2>
      <div>
        <input type="button" value="顯示基礎 Modal 彈跳視窗" onClick={() => { setIsModalVisible(true) }} />
        <input type="button" value="顯示組裝 Modal 後的 MsgBox 彈跳視窗" onClick={() => { setIsLocalMsgBoxVisible(true) }} />
        <input type="button" value="使用 App 通用訊息佇列來顯示訊息" onClick={() => {
          showMsgBox({
            content: 'content1',
            title: 'App Msg Queue',
            mainBtn: { label: 'OK', onClick: () => console.log('yo1') },
            hasCloseBtn: true
          })
          showMsgBox({
            content: 'content2',
            title: 'App Msg Queue',
            mainBtn: { label: 'Done', onClick: () => console.log('yo2') },
            hasCloseBtn: true
          })
        }} />

        <Modal
          isVisible={isModalVisible}
          isCloseByBackdrop
          isCloseByEsc
          onRequestClose={() => setIsModalVisible(false)} >
          <div>這是 Modal 組件，只有外框，提供基礎功能</div>
          <div>可以自行組裝出需要的視窗內容組件</div>
        </Modal>

        <MsgBox
          title='Information'
          content='這是使用 Modal 組件組裝後的 MsgBox 組件'
          isVisible={isLocalMsgBoxVisible}
          mainBtn={{ label: 'Ok', onClick: () => console.log('ok clicked') }}
          minorBtn={{ label: 'Cancel' }}
          onRequestClose={() => setIsLocalMsgBoxVisible(false)} />

      </div>

    </section>

  </div>
}

export default Sample
