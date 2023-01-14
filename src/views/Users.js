import React, { useEffect, useRef, useState } from 'react';
import { deleteUser, getUsers } from '../api/solutions';
import { UserIcon } from '../components/svgs';
import ViewAdmin from '../components/ViewAdmin';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [user, setUser] = useState('');

  const [overlay, setOverlay] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [deleteSuccess, setDeleteSuccess] = useState(false);

  console.log(overlay);

  const overlayRef = useRef(null);

  useEffect(() => {
    getUsers().then(({ ok, body }) => {
      const { edges } = body.results.data.users;
      if (edges) {
        setUsers(edges);
        setUserCount(edges.length);
      }
    });
  }, []);

  useEffect(() => {
    if (overlay) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'initial';
    }

    return () => {
      document.body.style.overflow = 'initial';
    };
  }, [overlay]);

  const handleDeleteUser = (userId) => {
    deleteUser(userId).then((results) => {
      console.log(results);
      getUsers().then(({ ok, body }) => {
        const { edges } = body.results.data.users;

        if (ok) {
          setDeleteSuccess(false);
        }
        if (edges) {
          setUsers(edges);
          setUserCount(edges.length);
        }
      });
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  function closeModalHandler() {
    setDeleteModal(false);
    setTimeout(function () {
      setOverlay(false);
      setDeleteModal(false);
    }, 500);
  }

  const closeOverlay = (e) => {
    if (e.target === overlayRef.current) {
      setDeleteModal(false);
      setTimeout(function () {
        setOverlay(false);
        setDeleteModal(false);
      }, 500);
    }
  };

  const onDeleteBtn = (user) => {
    setUser(user);
    setDeleteModal(!deleteModal);
    setOverlay(!overlay);
  };

  const confirmDelete = () => {
    return (
      <div
        ref={overlayRef}
        onClick={closeOverlay}
        className={`confirmDelete ${overlay ? '' : 'remove-modal'} ${overlay ? '' : 'd-none'}`}
      >
        <div className={`form-wrapper ${deleteModal ? '' : 'slide-out'}`}>
          {!deleteSuccess ? (
            <h4>Do you really want to delete {user}?</h4>
          ) : (
            <h4>Delete Successful</h4>
          )}
          <form onSubmit={onSubmitHandler}>
            {!deleteSuccess ? (
              <>
                <div className="form-buttons">
                  <button onClick={closeModalHandler} className="btn-delete cancel">
                    Cancel
                  </button>
                  <button className="btn-delete">Delete</button>
                </div>
              </>
            ) : (
              <button
                onClick={() => {
                  closeModalHandler();
                }}
                className="btn-delete cancel okay"
              >
                Okay
              </button>
            )}
          </form>
        </div>
      </div>
    );
  };

  return (
    <ViewAdmin>
      <section className="user-section">
        <h2>All #{userCount} Users </h2>
        <div className="users-container">
          {users.map((user, index) => {
            return (
              <div key={index} className="solution-user">
                <div className="user-icon">
                  <UserIcon />
                </div>
                <div className="solution-user-info">
                  <h3>{user.node.name}</h3>
                </div>
                <button onClick={() => onDeleteBtn(user.node.name)} className="btn-delete">
                  DELETE
                </button>
              </div>
            );
          })}
        </div>
        {confirmDelete()}
      </section>
    </ViewAdmin>
  );
};

export default Users;
