import React, { useEffect, useState } from 'react';
import View from '../components/View';
import Error from '../components/Error';
import Typography from '@material-ui/core/Typography';
import Loading from '../components/Loading';

import { me } from '../api/me';
import RegisterForm from '../components/auth/RegisterForm';
import UpdateForm from '../components/auth/UpdateForm';

const Account = () => {
  const [state, setState] = useState({
    redirectToReferrer: false,
    error: false,
    success: false,
    loading: false,
  });

  const showError = () => setState({ ...state, error: true, loading: false });

  const handleSubmit = (data) => {
    setState({ ...state, loading: true });

    const newData = (data = { ...data, userId: sessionStorage.getItem('userId') });

    fetch('/api/update-credentials', {
      method: 'POST',
      body: JSON.stringify(newData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          setState({ ...state, success: true, loading: false });

          setTimeout(() => setState({ ...state, success: false }), 3000);
        } else {
          showError();
        }
      })
      .catch((err) => {
        showError();
      });
  };

  return (
    <View>
      <div className="register-component">
        <div className="form-wrapper">
          <div className="logo-wrapper"></div>
          <div className="form-content">
            <h1>Update Account</h1>
            {state.error ? (
              <h3 style={{ color: 'red', textAlign: 'center' }}>Update failed</h3>
            ) : (
              ''
            )}
            {state.success ? (
              <h3 style={{ color: 'green', textAlign: 'center' }}>Update success</h3>
            ) : (
              ''
            )}
            <UpdateForm onUpdate={handleSubmit} loading={state.loading} />
          </div>
        </div>
      </div>
    </View>
  );
};

export default Account;
