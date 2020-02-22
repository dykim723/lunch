import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';

const apiUrl = `http://localhost:3000/api`;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function OutlinedChips(props) {
  const classes = useStyles();

  const handleDelete = () => {
    console.info('You clicked the delete icon.');

    fetch(apiUrl + '/users/' + props.person._id, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     id: id,
      //     name: name,
      //   }),
    })
      .then(() => {
        console.log(`deleted`);
        if (props.handleLoadUsers) {
          props.handleLoadUsers();
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    // <div className={classes.root}>
    <Chip
      icon={<FaceIcon />}
      label={props.person.name}
      onClick={handleClick}
      onDelete={handleDelete}
      variant="outlined"
    />
    // </div>
  );
}
