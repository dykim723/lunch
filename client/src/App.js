import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  makeStyles,
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  Paper,
  Typography,
} from '@material-ui/core';

import Add from './components/Add';
import Person from './components/Person';
import Group from './components/Group';
import Grouping from './components/Grouping';
import Alert from './components/Snackbar';
import * as api from './utils/api';

import { fetchPeople, getPeople } from './modules/lunch';

import './App.css';

const mapDispatchToProps = {
  fetchPeople,
};

const mapStateToProps = state => ({
  people: getPeople(state),
});

App.propTypes = {
  people: PropTypes.array.isRequired,
};

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  group_members: {
    padding: theme.spacing(2),
  },
}));

function App(props) {
  const classes = useStyles();
  const [groups, setGroups] = useState([]);
  const { people } = props;

  useEffect(() => {
    props.store.dispatch(fetchPeople());
  }, [props.store]);

  const handleLoadPeople = () => {
    props.store.dispatch(fetchPeople());
  };

  const People = () => {
    return (
      <div>
        {people &&
          people.map(u => {
            return (
              <Person
                key={u._id}
                id={u._id}
                name={u.name}
                handleLoadUsers={handleLoadPeople}
                handleRemovePerson={api.removePerson}
              ></Person>
            );
          })}
      </div>
    );
  };

  const makeGroups = groupNo => {
    let ret = [];
    let group;

    for (let i = 0; i < groupNo; i++) {
      group = people.filter(e => e.group === i);
      ret.push(
        <Box key={i} m={1}>
          {' '}
          <Group key={i} people={group} num={i}></Group>
        </Box>,
      );
    }
    setGroups(ret);
  };

  const alertRef = useRef();

  const handleError = name => {
    alertRef.current.handleClick(name);
  };

  const handleGroupError = desc => {
    alertRef.current.handleGroupError(desc);
  };

  return (
    <div className="App">
      <React.Fragment>
        <CssBaseline />
        <AppBar position="absolute" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Lunch
            </Typography>
          </Toolbar>
        </AppBar>
        <Box className={classes.layout}>
          <Paper className={classes.paper}>
            <React.Fragment>
              <Box m={2}>
                <Add
                  createPerson={api.createPerson}
                  loadUsers={handleLoadPeople}
                  alertError={handleError}
                ></Add>
                <Alert ref={alertRef}></Alert>
              </Box>
              <Box m={1}>
                <Typography variant="h6" color="inherit" noWrap>
                  {`Total: ${people.length}`}
                </Typography>
              </Box>
              <Box>
                <People />
              </Box>
              <Box m={2}>
                <Grouping
                  people={people}
                  handleGroups={makeGroups}
                  alertError={handleGroupError}
                ></Grouping>
              </Box>
            </React.Fragment>
          </Paper>
          <Paper className={classes.paper}>
            <React.Fragment>{groups}</React.Fragment>
          </Paper>
        </Box>
      </React.Fragment>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
