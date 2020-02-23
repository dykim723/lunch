import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function BasicTextFields(props) {
  return (
    <TextField
      id="standard-basic"
      label="Standard"
      onChange={e => props.handleChange(e)}
      value={props.value}
    />
  );
}
