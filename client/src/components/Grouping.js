import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from './TextField';
import Radio from './Radio';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Grouping() {
  const [number, setNumber] = useState(0);
  const classes = useStyles();
  //   const bull = <span className={classes.bullet}>•</span>;

  const makeGroups = () => {
    console.log('makeGruops', number);
    setNumber('');
  };

  const changeGroupNumber = e => {
    setNumber(e.target.value);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Radio></Radio>
        <TextField value={number} handleChange={changeGroupNumber}></TextField>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          color="primary"
          href="#outlined-buttons"
          onClick={makeGroups}
        >
          Make Groups
        </Button>
      </CardActions>
    </Card>
  );
}
