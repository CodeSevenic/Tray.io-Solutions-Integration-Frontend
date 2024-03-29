import React, { useRef } from 'react';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { white } from '@material-ui/core/colors';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';

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
  const emailRef = useRef();
  const passwordRef = useRef();

  return (
    <div className="form-div">
      <div style={styles.loginContainer}>
        <Paper style={styles.paper}>
          <Typography style={styles.loginHeader} variant="headline">
            LOGIN
          </Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              return onLogin({
                email: emailRef.current.value,
                password: passwordRef.current.value,
              });
            }}
          >
            <Input
              inputRef={emailRef}
              label="Email"
              placeholder="Email"
              fullWidth
              className="login-input"
              type="email"
              required
            />
            <Input
              inputRef={passwordRef}
              style={{ marginTop: 10 }}
              label="Password"
              placeholder="Password"
              fullWidth
              type="password"
              className="login-input"
              autoComplete="new-password"
            />
            <div className="login-actions">
              <Button
                className="login-button"
                style={styles.loginBtn}
                variant="outlined"
                color="primary"
                type="submit"
              >
                Login
              </Button>
              <Button
                className="login-button lost-pass"
                style={styles.loginBtn}
                variant="outlined"
                color="primary"
                onClick={() => history.push('/user-reset-password')}
              >
                Lost Password?
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default withRouter(LoginForm);
