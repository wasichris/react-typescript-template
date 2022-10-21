import React, { ChangeEvent, useState, useEffect } from 'react'
import logo from './assets/images/logo.svg'
import { AppModeEnum, GenderEnum } from './constants/enums'
import { genderOptions } from './constants/options'
import environment from './environment'

function App() {
  const [msg, setMsg] = useState('')
  const [gender, setGender] = useState('1')

  useEffect(() => {
    console.log('In effect:', msg)
  }, [msg])

  const handleClick = () => {
    console.log('env:', environment.appEnv, ' mode:', environment.appMode)

    setGender((g) => g === '1' ? '2' : '1')
    if (gender === GenderEnum.Female) {
      console.log('female!!')
    } else {
      console.log('male!!')
    }
  }

  const handleTxtChanged = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setMsg(e.target.value)
  }

  return (
    <div className="app">

      {/* 識別環境 */}
      {environment.appMode !== AppModeEnum.Prod && (
        <div className="env-info">Mode: {process.env.REACT_APP_MODE}</div>
      )}

      <header className="app-header">

        <img src={logo} alt="logo" className="app-header__logo" />
        <span className="app-header__title">GEKER</span>

        <ul className="app-header__nav">
          <li className="app-header__nav-item">Home</li>

          <li className="app-header__nav-item app-header__nav-item--active">Store</li>
          <li className="app-header__nav-item">settings</li>

        </ul>

      </header>

      <div className="app-body">

        <div className="app-body__container">

          something put here!!!

          <div>
            <select name="gender" id="gender">
              {genderOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <input type="button" value="click me" onClick={handleClick} />
            <input type="text" onChange={handleTxtChanged} />
          </div>

          <p> {msg} </p>

        </div>

      </div>

    </div>
  )
}

export default App
