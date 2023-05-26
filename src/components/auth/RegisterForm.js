import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import CircularProgress from '@material-ui/core/CircularProgress';
import './RegisterForm.css';
import { Checkbox, FormControlLabel } from '@material-ui/core';

class RegisterForm extends React.Component {
  state = {
    isAdmin: false,
  };

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
                    email: this.emailElem.value,
                    password: this.passwordElem.value,
                    admin: this.isAdminElem.value,
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
                  inputRef={(input) => (this.emailElem = input)}
                  label="Email"
                  placeholder="Email"
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

                <FormControlLabel
                  className="admin-checkbox"
                  inputRef={(input) => (this.isAdminElem = input)}
                  control={
                    <Checkbox
                      color="primary"
                      value={`${this.state.isAdmin}`}
                      onChange={({ target: { checked } }) => {
                        this.setState({ isAdmin: checked });
                      }}
                    />
                  }
                  label="Make user admin"
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
