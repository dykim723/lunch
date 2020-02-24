import React, { useState } from 'react';
import { makeStyles, Button, TextField } from '@material-ui/core';
// import TextField from './TextField';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const Add = ({ loadUsers, createPerson, alertError }) => {
  const [name, setName] = useState('');
  const [fieldError, setFieldError] = useState(false);

  const classes = useStyles();

  const validation = {
    isNotEmpty: function(str) {
      return str !== ''; // returns a boolean
    },
    isNumber: function(str) {
      const pattern = /^(\(?\+?[0-9]*\)?)?[0-9_\- ()]*$/;
      return pattern.test(str); // returns a boolean
    },
  };

  const handleChange = e => {
    setName(e.target.value);
    setFieldError(false);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (validation.isNotEmpty(name)) {
      setName('');
      setFieldError(false);
      createPerson(
        name,
        () => {
          loadUsers();
        },
        alertError,
      );
    } else {
      setFieldError(true);
    }
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          error={fieldError}
          id="standard-error-helper-text"
          value={name}
          onChange={handleChange}
          label={fieldError ? 'Error' : 'Name'}
          helperText={fieldError ? 'Please enter a valid name' : ''}
        ></TextField>
        <Button variant="outlined" color="secondary" onClick={handleSubmit}>
          Add
        </Button>
      </div>
    </form>
  );
};

export default Add;
