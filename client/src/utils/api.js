const apiUrl = `http://localhost:3000/api`;
export function fetchPeople(callback) {
  fetch(apiUrl + '/people', {
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

export function createPerson(name, callback, handleError) {
  fetch(apiUrl + '/people', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name,
    }),
  })
    .then(res => res.json())
    .then(data => {
      callback(data);
    })
    .catch(err => {
      if (handleError) {
        handleError(name);
      }
    });
}

export function removePerson(id, callback) {
  fetch(apiUrl + '/people/' + id, {
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
