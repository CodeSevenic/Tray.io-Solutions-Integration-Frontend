import React from 'react';
import ViewAdmin from '../components/ViewAdmin';

const Users = () => {
  return (
    <ViewAdmin>
      <section>
        <header>All Users</header>
        <div className="users-container"></div>
      </section>
    </ViewAdmin>
  );
};

export default Users;
