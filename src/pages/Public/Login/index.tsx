import React from 'react'
import { useNavigate } from 'react-router-dom'

interface IProps {
};

const Login = (props: IProps) => {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/home/main')
  }

  return <div>
    <div> Public - Login Page </div> <br />
    <input type="button" onClick={handleLogin} value={'Click me to Login'} />
  </div>
}

export default Login
