import React, { useContext, useRef, useState } from 'react';
import { CloseIcon } from '../svgs';
import './UserUpdate.css';
import Loader from '../../img/animated-gif.gif';
import { AppContext } from '../../context';

const UserUpdate = () => {
  const [username, setUsername] = useState(sessionStorage.getItem('username'));
  const [name, setName] = useState(sessionStorage.getItem('name'));
  const [password, setPassword] = useState(sessionStorage.getItem(''));
  const [loading, setLoading] = useState(false);

  const { userEditModal, setUserEditModal, hideModal, setHideModal } = useContext(AppContext);
  console.log('CONTEXT: ', userEditModal);

  const overlayRef = useRef(null);

  console.log(overlayRef);

  const handleSubmit = (e) => {
    e.preventDefault();
    // e.stopPropagation();
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

  function closeModalHandler() {
    setUserEditModal(false);
    setTimeout(function () {
      setHideModal(false);
      setUserEditModal(false);
    }, 500);
  }

  const closeOverlay = (e) => {
    if (e.target === overlayRef.current) {
      setUserEditModal(false);
      setTimeout(function () {
        setHideModal(false);
        setUserEditModal(false);
      }, 500);
    }
  };

  const updateForm = () => {
    return (
      <div
        ref={overlayRef}
        id="#overlay"
        onClick={closeOverlay}
        className={`user-update-form ${userEditModal ? '' : 'remove-modal'} ${
          hideModal ? '' : 'd-none'
        }`}
      >
        <form
          className={`modal-slide-away ${userEditModal ? '' : 'slide-out'}`}
          onSubmit={handleSubmit}
        >
          <div id="close-icon" onClick={() => closeModalHandler()} className="close-icon">
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
