import React from 'react';
import { UserIcon } from '../components/svgs';
import ViewAdmin from '../components/ViewAdmin';
import './Users.css';

const Users = () => {
  return (
    <ViewAdmin>
      <section className="user-section">
        <h2>All Users</h2>
        <div className="users-container">
          <div className="solution-user">
            <div className="user-icon">
              <UserIcon />
            </div>
            <div className="solution-user-info">
              <h3>Caleb Shongwe</h3>
            </div>
            <button className="btn-delete">DELETE</button>
          </div>
        </div>
      </section>
    </ViewAdmin>
  );
};

export default Users;
