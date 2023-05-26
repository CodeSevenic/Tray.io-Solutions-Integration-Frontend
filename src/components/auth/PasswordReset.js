import React, { useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { white } from '@material-ui/core/colors';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Logo from '../../img/Artboard.png';
import Loading from '../Loading';
import './PasswordReset.css';

const styles = {
  field: { marginTop: 10 },
  btnSpan: { marginLeft: 5 },
  loginContainer: {
    backgroundColor: white,
    minWidth: 320,
    maxWidth: 400,
    height: 'auto',
    position: 'absolute',
    top: '20%',
    left: 0,
    right: 0,
    margin: 'auto',
  },
  paper: {
    padding: 20,
    overflow: 'auto',
  },
  buttonsDiv: {
    textAlign: 'center',
    padding: 10,
  },
  loginBtn: {
    marginTop: 20,
    float: 'right',
  },
  loginHeader: {
    textAlign: 'center',
    marginBottom: 15,
  },
};

const LoginForm = ({ onLogin, history }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log(response);
      if (response.ok) {
        setLoading(false);
        setMessage(data.message);
      } else {
        setLoading(false);
        setMessage(data.message);
      }
    } catch (error) {
      setLoading(false);
      setMessage(`${error.message}`);
    }
  };

  return (
    <div className="form-div">
      <div style={styles.loginContainer}>
        <div className="form-wrapper unsetBoxShadow">
          <div className="logo-wrapper">
            <img width={130} height={130} src={Logo} alt="YuboData Logo" />
          </div>
          <Loading loading={loading}></Loading>
        </div>
        <Paper style={styles.paper}>
          <Typography style={styles.loginHeader} variant="headline">
            <b
              style={{
                textTransform: 'uppercase',
              }}
            >
              Reset Password
            </b>
          </Typography>
          <form onSubmit={handleSubmit}>
            <Input
              label="Email"
              fullWidth
              className="login-input"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="login-actions">
              <Button
                className="login-button"
                style={styles.loginBtn}
                variant="outlined"
                color="primary"
                type="submit"
              >
                Reset Password
              </Button>
            </div>
          </form>
          {message && <p className="response-message">{message}</p>}
        </Paper>
      </div>
    </div>
  );
};

export default withRouter(LoginForm);
