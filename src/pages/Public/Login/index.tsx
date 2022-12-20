import React, { useEffect } from 'react'
import useAppDispatch from '../../../utils/hooks/useAppDispatch'
import { loginSuccess } from '../../../store/slices/systemSlice'
import sampleApi from '../../../services/api/sampleApi'
import useAppSelector from '../../../utils/hooks/useAppSelector'
import { useNavigate } from 'react-router-dom'

interface IProps {
};

const Login = (props: IProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [apiSampleLogin] = sampleApi.useSampleLoginMutation()
  const isLogin = useAppSelector(s => s.system.isLogin)

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

  return <div>
    <div> Public - Login Page </div> <br />
    <input type="button" onClick={handleLogin} value={'Click me to Login'} />
  </div>
}

export default Login
