import React, { useState } from 'react';

const apiUrl = `http://localhost:3000/api`;

const Add = () => {
  const [name, setName] = useState('');

  const handleChange = e => {
    setName(e.target.value);
  };

  const handleSubmit = e => {
    console.log('handleClick');
    e.preventDefault();
    fetch(apiUrl + '/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleChange} />
        </label>
        {/* <input type="submit" value="Submit" /> */}
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Add;
