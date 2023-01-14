import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/solutions';
import { UserIcon } from '../components/svgs';
import ViewAdmin from '../components/ViewAdmin';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers().then(({ ok, body }) => {
      const { edges } = body.results.data.users;
      if (edges) {
        setUsers(edges);
      }
      console.log(ok, edges);
    });
  }, []);

  const handleDeleteUser = (userId) => {
    console.log(userId);
  };

  return (
    <ViewAdmin>
      <section className="user-section">
        <h2>All Users</h2>
        <div className="users-container">
          {users.map((user, index) => {
            console.log(user.node.id);
            return (
              <div key={index} className="solution-user">
                <div className="user-icon">
                  <UserIcon />
                </div>
                <div className="solution-user-info">
                  <h3>{user.node.name}</h3>
                </div>
                <button onClick={() => handleDeleteUser(user.node.id)} className="btn-delete">
                  DELETE
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </ViewAdmin>
  );
};

export default Users;
