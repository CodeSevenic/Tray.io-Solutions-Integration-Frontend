import React from 'react';

const UserUpdate = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Handle submit');
  };
  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            onChange={handleChange}
            type="text"
            className="form-control"
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange}
            type="email"
            className="form-control"
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange}
            type="password"
            className="form-control"
            placeholder="Enter your password"
          />
        </div>
        <div>
          <div className="btn btn-primary">UPDATE</div>
        </div>
      </form>
    );
  };

  return <>{signupForm()}</>;
};

export default UserUpdate;
