import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Person from './Person';
import Typography from '@material-ui/core/Typography';

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
