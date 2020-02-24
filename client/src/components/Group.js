import React from 'react';
import { makeStyles, Card, CardContent, Typography } from '@material-ui/core';
import Person from './Person';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

export default function Group({ people, num }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Group {num + 1}
        </Typography>
        {people.map(u => {
          return <Person key={u._id} id={u._id} name={u.name}></Person>;
        })}
      </CardContent>
    </Card>
  );
}
