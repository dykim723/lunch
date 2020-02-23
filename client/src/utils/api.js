const apiUrl = `http://localhost:3000/api`;
export function fetchPeople(callback) {
  fetch(apiUrl + '/users', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .then(data => {
      let groupedData = data.map(e => {
        e.group = 0;
        return e;
      });
      callback(groupedData);
    });
}

export function createPerson(name, callback) {
  fetch(apiUrl + '/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name,
    }),
  })
    .then(res => res.json())
    .then(data => {
      callback(data);
    });
}

export function removePerson(id, callback) {
  fetch(apiUrl + '/users/' + id, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(() => {
      callback();
    })
    .catch(err => {
      console.error(err);
    });
}
