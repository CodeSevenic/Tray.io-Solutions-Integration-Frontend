import React from 'react';
import Logo from '../img/Artboard.png';
import './ComingSoon.css';

const ComingSoon = () => {
  return (
    <div className="comingSoonContainer">
      <div className="logo-wrapper">
        <img width={130} height={130} src={Logo} alt="YuboData Logo" />
      </div>
      <h1 className="comingSoonText">Coming Soon</h1>
      <p className="subText">YuboData is currently under construction. Please check back later.</p>
    </div>
  );
};

export default ComingSoon;
