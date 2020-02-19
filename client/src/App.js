import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

  // useEffect(() => {
  //   // API.getData()
  //   //   .then((response) => { setData(response) });
  //   // createUser();
  //   loadUsers();
  // }, []);
  useEffect(() => {
    console.log('렌더링이 완료되었습니다!');
    // loadUsers();
  });

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
        console.log(data);
        // setUsers([...users, { name: 'ddd' }]);
        setUsers(data);
        console.log(users);
      });

    // this.setState({
    //   users: res.data,
    // });
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
      </header>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
