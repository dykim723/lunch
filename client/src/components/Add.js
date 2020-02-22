import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from './TextField';
import Grid from '@material-ui/core/Grid';

const apiUrl = `http://localhost:3000/api`;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Add = ({ loadUsers }) => {
  const [name, setName] = useState('');
  const classes = useStyles();

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
        loadUsers();
      });
  };

  return (
    <div>
      {/* <form onSubmit={handleSubmit}> */}
      {/* <label>
          Name:
          <input type="text" value={name} onChange={handleChange} />
        </label> */}
      <TextField value={name} handleChange={handleChange}></TextField>
      {/* <input type="submit" value="Submit" /> */}
      <Button variant="outlined" color="secondary" onClick={handleSubmit}>
        Add
      </Button>
      {/* </form> */}
    </div>
  );
};

export default Add;
