import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Add from './components/Add';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Person from './components/Person';
import Group from './components/Group';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grouping from './components/Grouping';
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
      ret.push(<Group key={i} people={group} num={i}></Group>);
    }
    setGroups(ret);
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
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <React.Fragment>
              <Add
                createPerson={api.createPerson}
                loadUsers={handleLoadPeople}
              ></Add>
              <People />

              <Grouping people={people} handleGroups={makeGroups}></Grouping>
            </React.Fragment>
          </Paper>
          <Paper className={classes.paper}>
            <React.Fragment>{groups}</React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
