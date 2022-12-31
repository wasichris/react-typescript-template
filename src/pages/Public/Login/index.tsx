import React, { useEffect } from 'react'
import useAppDispatch from '../../../utils/hooks/useAppDispatch'
import { loginSuccess } from '../../../store/slices/appSlice'
import sampleApi from '../../../services/api/sampleApi'
import useAppSelector from '../../../utils/hooks/useAppSelector'
import { useNavigate } from 'react-router-dom'
import FormTextInput from '../../../components/form/FormTextInput'

interface IProps {
};

const Login = (props: IProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [apiSampleLogin] = sampleApi.useSampleLoginMutation()
  const isLogin = useAppSelector(s => s.app.isLogin)

  useEffect(() => {
    // 已登入用戶，直接轉向登入後首頁
    if (isLogin) navigate('/home')
  }, [isLogin, navigate])

  const handleLogin = async () => {
    // 呼叫登入API
    const response = await apiSampleLogin({ pcode: 'oo-xx', userId: 'chris' }).unwrap()
    const { header: { returnCode, returnMsg }, body } = response
    if (returnCode.isSuccessCode()) {
      dispatch(loginSuccess({ authToken: body.authCode }))
    } else {
      alert(`登入失敗(${returnCode}:${returnMsg})`)
    }
  }

  return <div className='login'>

    <div className="box">

      <div className="box__left">

      </div>

      <div className="box__right ">

        <form className='form' >

          <h1 className='form__title'>Login</h1>

          <p className='form__desc'>
            This is a login page that you can enter your user id and password to login system.
          </p>

          <div className="form__input-group">
            <label htmlFor="userId">User Id</label>
            <input type="text" id="userId" className="form__input" />
            {/* TODO: 要加入Formik表單
            <FormTextInput id="userId" name="userId" type="text" caption="僅能使用英文" /> */}
          </div>

          <div className="form__input-group">
            <label htmlFor="password">password</label>
            <input type="password" id="password" className="form__input" />
          </div>

          <input type="button" className="form__btn" onClick={handleLogin} value={'Login System'} />
        </form>

      </div>

    </div>

  </div>
}

export default Login
