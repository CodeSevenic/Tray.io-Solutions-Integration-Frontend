import React, { useState } from 'react';
import View from '../View';
import RegisterForm from './RegisterForm';

const Register = () => {
  const [state, setState] = useState({
    redirectToReferrer: false,
    error: false,
    success: false,
    loading: false,
  });

  const showError = () => setState({ ...state, error: true, loading: false });

  const register = (data) => {
    setState({ ...state, loading: true });
    fetch(`/api/register`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          setState({ ...state, success: true, loading: false });

          setTimeout(() => (window.location = '/login'), 1000);
        } else {
          showError();
        }
      })
      .catch((err) => {
        showError();
      });
  };

  const explain =
    'This will create a new in-memory user account in the local Express backend that will persist until the backend is restarted.';

  return (
    <View>
      <div className="register-component">
        <div className="form-wrapper">
          <div className="logo-wrapper"></div>
          <div className="form-content">
            <h1 style={{ textAlign: 'center' }}>Register a New User</h1>
            <div
              style={{
                textAlign: 'center',
                width: '500px',
                margin: 'auto',
                paddingBottom: '10px',
              }}
            >
              {explain}
            </div>

            {state.error ? (
              <h3 style={{ color: 'red', textAlign: 'center' }}>Registration failed</h3>
            ) : (
              ''
            )}
            {state.success ? (
              <h3 style={{ color: 'green', textAlign: 'center' }}>Registration success</h3>
            ) : (
              ''
            )}
            <RegisterForm onRegister={register} loading={state.loading} />
          </div>
        </div>
      </div>
    </View>
  );
};

export default Register;
