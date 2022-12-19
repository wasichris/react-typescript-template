import React from 'react'
import useAppDispatch from '../../../utils/hooks/useAppDispatch'
import { login } from '../../../store/slices/systemSlice'

interface IProps {
};

const Login = (props: IProps) => {
  const dispatch = useAppDispatch()
  const handleLogin = () => {
    dispatch(login('id:pwd'))
  }

  return <div>
    <div> Public - Login Page </div> <br />
    <input type="button" onClick={handleLogin} value={'Click me to Login'} />
  </div>
}

export default Login
