import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import CircularProgress from '@material-ui/core/CircularProgress';
import './RegisterForm.css';
import { Checkbox, FormControlLabel } from '@material-ui/core';

class UpdateForm extends React.Component {
  // const [username, setUsername] = useState(sessionStorage.getItem('username'));
  // const [name, setName] = useState(sessionStorage.getItem('name'));
  // const [password, setPassword] = useState(sessionStorage.getItem(''));

  state = {
    isAdmin: false,
    username: sessionStorage.getItem('username'),
    name: sessionStorage.getItem('name'),
    password: '',
  };

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };
  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };
  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  render() {
    const { onUpdate } = this.props;

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
                  return onUpdate({
                    name: this.nameElem.value,
                    username: this.usernameElem.value,
                    password: this.passwordElem.value,
                  });
                }}
              >
                <Input
                  inputRef={(input) => (this.nameElem = input)}
                  autoFocus={true}
                  label="Name"
                  placeholder="Full Name"
                  fullWidth={true}
                  style={{ marginBottom: 10 }}
                  required
                  autoComplete="off"
                  value={this.state.name}
                  onChange={this.handleNameChange}
                />

                <Input
                  inputRef={(input) => (this.usernameElem = input)}
                  label="Username"
                  placeholder="Username"
                  fullWidth={true}
                  style={{ marginBottom: 10 }}
                  required
                  autoComplete="off"
                  value={this.state.username}
                  onChange={this.handleUsernameChange}
                />

                <Input
                  inputRef={(input) => (this.passwordElem = input)}
                  label="Password"
                  placeholder="Password"
                  fullWidth={true}
                  type="password"
                  required
                  autoComplete="new-password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
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
  }
}

export default UpdateForm;
