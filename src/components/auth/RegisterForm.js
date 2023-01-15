import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { white } from '@material-ui/core/colors/';
import Input from '@material-ui/core/Input';
import CircularProgress from '@material-ui/core/CircularProgress';
import './RegisterForm.css';

class RegisterForm extends React.Component {
  render() {
    const { onRegister } = this.props;

    return (
      <div className="register-form">
        <div className="register-form-wrapper">
          <Paper className="paper">
            {this.props.loading ? (
              <div style={{ textAlign: 'center' }}>
                <CircularProgress />
              </div>
            ) : (
              <form
                ref={(elem) => (this.form = elem)}
                onSubmit={(e) => {
                  e.preventDefault();
                  return onRegister({
                    name: this.nameElem.value,
                    username: this.usernameElem.value,
                    password: this.passwordElem.value,
                  });
                }}
              >
                <h3 style={{ textAlign: 'center' }}> New User Form </h3>

                <Input
                  inputRef={(input) => (this.nameElem = input)}
                  autoFocus={true}
                  label="Name"
                  placeholder="Full Name"
                  fullWidth={true}
                  style={{ marginBottom: 10 }}
                  required
                  autoComplete="off"
                />

                <Input
                  inputRef={(input) => (this.usernameElem = input)}
                  label="Username"
                  placeholder="Username"
                  fullWidth={true}
                  style={{ marginBottom: 10 }}
                  required
                  autoComplete="off"
                />

                <Input
                  inputRef={(input) => (this.passwordElem = input)}
                  label="Password"
                  placeholder="Password"
                  fullWidth={true}
                  type="password"
                  required
                  autoComplete="new-password"
                />

                <Button className="btn-register" variant="raised" color="primary" type="submit">
                  Register User
                </Button>
              </form>
            )}
          </Paper>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
