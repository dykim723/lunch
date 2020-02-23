import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from './TextField';

const Add = ({ loadUsers, createPerson, alertError }) => {
  const [name, setName] = useState('');

  const handleChange = e => {
    setName(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setName('');
    createPerson(
      name,
      () => {
        loadUsers();
      },
      alertError,
    );
  };

  return (
    <div>
      <TextField value={name} handleChange={handleChange}></TextField>
      <Button variant="outlined" color="secondary" onClick={handleSubmit}>
        Add
      </Button>
    </div>
  );
};

export default Add;
