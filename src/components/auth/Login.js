import React, { useState } from 'react';
import LoginForm from './LoginForm';
import { Redirect, withRouter } from 'react-router-dom';
import Loading from '../Loading';
import { auth } from './Auth';
import Logo from '../../img/Artboard.png';
import YoboDataLogoV from '../../img/YoboDataLogo.png';
import './Login.css';

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  const login = async (data) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const text = await res.text();
        sessionStorage.setItem('userId', `${JSON.parse(text).userToken}`);
        sessionStorage.setItem('name', `${JSON.parse(text).name}`);
        sessionStorage.setItem('username', `${JSON.parse(text).username}`);
        sessionStorage.setItem('adm', `${JSON.parse(text).adm}`);
        sessionStorage.setItem('chg', `${JSON.parse(text).chg}`);

        auth.authenticate(() => {
          setRedirectToReferrer(true);
          setLoading(false);
        });
      } else {
        const body = await res.json();
        console.log(body);
        alert(`Unable to login: ${body.error}`);
        setLoading(false);
      }
    } catch (err) {
      console.error('Error logging in.', err);
    }
  };

  const style = {
    container: {
      height: '300px',
    },
    warning: {
      textAlign: 'center',
      border: 'none',
    },
  };

  const { from } = props.location.state || { from: { pathname: '/' } };

  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }

  return (
    <div className="login-form">
      <div className="form-wrapper">
        <div className="logo-wrapper">
          <img width={130} height={130} src={Logo} alt="YuboData Logo" />
        </div>
        <Loading loading={loading}>
          <LoginForm onLogin={login} />
        </Loading>
      </div>
      <div className="left-content">
        <div className="text-stripe">
          <div className="logo-vertical">
            <img src={YoboDataLogoV} alt="Logo Vertical" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
