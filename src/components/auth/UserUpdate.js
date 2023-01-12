import React, { useState } from 'react';
import './UserUpdate.css';

const UserUpdate = () => {
  const [username, setUsername] = useState(sessionStorage.getItem('username'));
  const [name, setName] = useState(sessionStorage.getItem('name'));
  const [password, setPassword] = useState(sessionStorage.getItem(''));

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const formData = Object.fromEntries(data);

    fetch('/api/update-credentials', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const signupForm = () => {
    return (
      <div className="user-update-form">
        <form onSubmit={handleSubmit}>
          <header>UPDATE YOUR PASSWORD</header>
          <div className="form-group">
            <input
              name="name"
              onChange={handleNameChange}
              type="text"
              className="form-control"
              placeholder="Name"
              autoComplete="off"
              value={name}
            />
          </div>
          <div className="form-group">
            <input
              name="username"
              onChange={handleUsernameChange}
              type="text"
              className="form-control"
              placeholder="Username"
              autoComplete="off"
              value={username}
            />
          </div>
          <div className="form-group">
            <input
              name="password"
              onChange={handlePasswordChange}
              type="password"
              className="form-control"
              placeholder="Enter new password"
              autoComplete="new-password"
              value={password || ''}
            />
          </div>
          <div>
            <button type="submit" className="btn-update">
              UPDATE
            </button>
          </div>
        </form>
      </div>
    );
  };

  return <>{signupForm()}</>;
};

export default UserUpdate;
