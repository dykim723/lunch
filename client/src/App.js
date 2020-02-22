import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Add from './components/Add';
import Delete from './components/Delete';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grouping from './components/Grouping';

import logo from './logo.svg';

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

const apiUrl = `http://localhost:3000/api`;

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

function App() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  // const { people } = this.props;

  useEffect(() => {
    loadUsers();
  }, []);

  const createUser = name => {
    fetch(apiUrl + '/users/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });

    loadUsers();
  };

  const loadUsers = () => {
    fetch(apiUrl + '/users', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => {
        setUsers(data);
      });
  };

  const People = ({ user }) => {
    return (
      <div>
        {user.map(u => {
          return (
            <div className="user" key={u._id}>
              {u.name}
              <Delete id={u._id} loadUsers={loadUsers}></Delete>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="App">
      <React.Fragment>
        <CssBaseline />
        <AppBar position="absolute" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Company name
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* {people} */}
                </a>
                <button onClick={() => createUser('kim')}>Create User</button>
                {users.length}
                <div>
                  <Add loadUsers={loadUsers}></Add>
                </div>
                <div>
                  <People user={users}></People>
                </div>
              </header>
              {/* <body><Grouping /></body> */}
            </Typography>
            <React.Fragment>
              <Grouping></Grouping>
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
