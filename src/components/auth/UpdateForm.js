import React, { useState, useRef } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { ToastContainer, toast } from 'react-toastify/dist/react-toastify';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import 'react-toastify/dist/ReactToastify.css';
import './RegisterForm.css';

const UpdateForm = ({ onUpdate, loading }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState(sessionStorage.getItem('username'));
  const [name, setName] = useState(sessionStorage.getItem('name'));
  const [password, setPassword] = useState('');

  const docId = sessionStorage.getItem('docId');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.error(`Password must be at least 8 characters long.`);
      return;
    }

    return onUpdate({
      name: name,
      username: username,
      password: password,
      docId: docId,
    });
  };

  return (
    <div className="register-form">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="register-form-wrapper">
        <Paper className="paper">
          {loading ? (
            <div style={{ textAlign: 'center' }}>
              <CircularProgress />
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <Input
                autoFocus={true}
                label="Name"
                placeholder="Full Name"
                fullWidth={true}
                style={{ marginBottom: 10 }}
                required
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Input
                label="Username"
                placeholder="Username"
                fullWidth={true}
                style={{ marginBottom: 10 }}
                required
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <Input
                label="Password"
                placeholder="Password"
                fullWidth={true}
                type="password"
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button className="btn-register" variant="raised" color="primary" type="submit">
                Update
              </Button>
            </form>
          )}
        </Paper>
      </div>
    </div>
  );
};

export default UpdateForm;
