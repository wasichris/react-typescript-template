import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAppDispatch from '../../../hooks/useAppDispatch'
import { login } from '../../../store/slices/systemSlice'

interface IProps {
};

const Login = (props: IProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleLogin = () => {
    dispatch(login('id:pwd'))
    navigate('/home/main') // TODO: 要移到 authListener
  }

  return <div>
    <div> Public - Login Page </div> <br />
    <input type="button" onClick={handleLogin} value={'Click me to Login'} />
  </div>
}

export default Login
