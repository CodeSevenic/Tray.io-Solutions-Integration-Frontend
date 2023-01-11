import React from 'react';
import SideNav from './SideNav';
// import { withTheme } from '@material-ui/core/styles';
import { MOLogoWhite, YuboDataLogoDark } from './svgs';
import './View.css';

const View = ({ children }) => {
  return (
    <div className="view-container">
      <header className="header header-bar">
        <div className="header-logo">
          <YuboDataLogoDark />
        </div>
      </header>
      <div className="container">
        <SideNav />
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default View;
