import React, { useContext, useEffect } from 'react';
import UserUpdate from './auth/UserUpdate';
import SideNav from './SideNav';
import { UserCog, YuboDataLogoDark } from './svgs';
import { AppContext } from '../context';
import Logo from '../img/Artboard.png';

import './View.css';

const View = ({ children }) => {
  const { userEditModal, setUserEditModal, hideModal, setHideModal } = useContext(AppContext);
  const iconClickHandler = () => {
    setUserEditModal(!userEditModal);
    setHideModal(!hideModal);
  };

  const changePass = sessionStorage.getItem('chg');
  console.log(changePass);

  const isPassChanged = () => {
    setTimeout(() => {
      if (changePass === 'change-pass') {
        iconClickHandler();
        sessionStorage.removeItem('chg');
      }
    }, 5000);
  };

  useEffect(() => {
    isPassChanged();
  }, []);

  const onLogout = () => {
    sessionStorage.clear();
    return (window.location = '/');
  };
  return (
    <div className="view-container">
      <header className="header header-bar">
        <div className="header-logo">
          <YuboDataLogoDark />
          <img src={Logo} alt="YuboData Logo" />
        </div>
        <button onClick={onLogout} className="logout-button">
          Logout
        </button>
        <div onClick={iconClickHandler} className="user-profile">
          <UserCog />
        </div>
      </header>
      <div className="container">
        <SideNav />
        <div className="content">{children}</div>
      </div>
      <UserUpdate />
    </div>
  );
};

export default View;
