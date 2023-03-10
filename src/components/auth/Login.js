import React from 'react';
import LoginForm from './LoginForm';
import { Redirect } from 'react-router-dom';
import Loading from '../Loading';
import { auth } from './Auth';
import Logo from '../../img/Artboard.png';
import YoboDataLogoV from '../../img/YoboDataLogo.png';
import './Login.css';

export default class Login extends React.Component {
  state = {
    loading: false,
    redirectToReferrer: false,
  };

  login = (data) => {
    this.setState({
      loading: true,
    });
    fetch(`/api/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (res) => {
        if (res.ok) {
          // store user uuid for future credentials updates
          const text = await res.text();
          sessionStorage.setItem('userId', `${JSON.parse(text).userToken}`);
          sessionStorage.setItem('name', `${JSON.parse(text).name}`);
          sessionStorage.setItem('username', `${JSON.parse(text).username}`);
          sessionStorage.setItem('adm', `${JSON.parse(text).adm}`);
          sessionStorage.setItem('chg', `${JSON.parse(text).chg}`);
          // Auth
          auth.authenticate(() => {
            this.setState({
              redirectToReferrer: true,
              loading: false,
            });
          });
        } else {
          res.json().then((body) => {
            console.log(body);
            alert(`Unable to login: ${body.error}`);
            this.setState({
              loading: false,
            });
          });
        }
      })
      .catch((err) => {
        console.error('Error logging in.', err);
      });
  };

  render() {
    const style = {
      container: {
        height: '300px',
      },
      warning: {
        textAlign: 'center',
        border: 'none',
      },
    };

    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div className="login-form">
        <div className="form-wrapper">
          <div className="logo-wrapper">
            <img width={130} height={130} src={Logo} alt="YuboData Logo" />
          </div>
          <Loading loading={this.state.loading}>
            <LoginForm onLogin={this.login} />
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
  }
}
