import React from 'react';
import logo from './assets/images/logo.svg';


function App() {
  return (
    <div className="app">

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

        </div>

      </div>

    </div>
  );
}

export default App;
