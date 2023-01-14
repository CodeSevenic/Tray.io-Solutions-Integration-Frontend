import React, { useContext } from 'react';
import UserUpdate from './auth/UserUpdate';
import SideNav from './SideNav';
import { UserCog, YuboDataLogoDark } from './svgs';
import { AppContext } from '../context';

import './View.css';

const View = ({ children }) => {
  const { userEditModal, setUserEditModal, hideModal, setHideModal } = useContext(AppContext);
  const iconClickHandler = () => {
    setUserEditModal(!userEditModal);
    setHideModal(!hideModal);
  };
  return (
    <div className="view-container">
      <header className="header header-bar">
        <div className="header-logo">
          <YuboDataLogoDark />
        </div>
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
