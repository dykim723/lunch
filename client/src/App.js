import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Add from './components/Add';
import Delete from './components/Delete';
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

function App() {
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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
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
          <Add></Add>
        </div>
        <div>
          <People user={users}></People>
        </div>
      </header>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
