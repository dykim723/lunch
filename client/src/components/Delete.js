import React from 'react';

const apiUrl = `http://localhost:3000/api`;

const Delete = ({ id, loadUsers }) => {
  const handleSubmit = () => {
    console.log('handleClick');
    fetch(apiUrl + '/users/' + id, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     id: id,
      //     name: name,
      //   }),
    })
      .then(() => {
        console.log(`deleted`);
        loadUsers();
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div>
      <button onClick={handleSubmit}>Delete</button>
    </div>
  );
};

export default Delete;
