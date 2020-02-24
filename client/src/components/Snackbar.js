import React, { forwardRef, useImperativeHandle } from 'react';

import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles, Snackbar } from '@material-ui/core';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const CustomSnackbar = forwardRef((props, ref) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [desc, setDesc] = React.useState();

  useImperativeHandle(ref, () => ({
    handleClick(name) {
      //   setName(name);
      setDesc(`${name} already exists!`);
      setOpen(true);
    },

    handleGroupError(desc) {
      setDesc(desc);
      setOpen(true);
    },
  }));

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {desc}
        </Alert>
      </Snackbar>
    </div>
  );
});

export default CustomSnackbar;
