import React, { useContext, useState } from 'react';
import { CloseIcon } from '../svgs';
import './UserUpdate.css';
import Loader from '../../img/animated-gif.gif';
import { AppContext } from '../../context';

const UserUpdate = () => {
  const [username, setUsername] = useState(sessionStorage.getItem('username'));
  const [name, setName] = useState(sessionStorage.getItem('name'));
  const [password, setPassword] = useState(sessionStorage.getItem(''));
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(true);
  const [hideModal, setHideModal] = useState(true);

  const { userEditModal, setUserEditModal } = useContext(AppContext);
  console.log(userEditModal);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    data.append('userId', sessionStorage.getItem('userId'));
    const formData = Object.fromEntries(data);
    setLoading(true);
    fetch('/api/update-credentials', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.ok) {
        setLoading(false);
      }
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

  const closeModalHandler = () => {
    setOpenModal(false);
    setTimeout(function () {
      setOpenModal(false);
      setHideModal(false);
    }, 500);
  };

  const updateForm = () => {
    return (
      <div
        onClick={closeModalHandler}
        className={`user-update-form ${openModal ? '' : 'remove-modal'} ${
          hideModal ? '' : 'd-none'
        }`}
      >
        <form
          className={`modal-slide-away ${openModal ? '' : 'slide-out'}`}
          onSubmit={handleSubmit}
        >
          <div onClick={() => closeModalHandler()} className="close-icon">
            <CloseIcon />
          </div>
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
              {loading ? <img src={Loader} alt="" /> : 'UPDATE'}
            </button>
          </div>
        </form>
      </div>
    );
  };

  return <>{updateForm()}</>;
};

export default UserUpdate;
