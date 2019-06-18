const axios = require('axios');

function handleErrors(error, reject) {
  console.log(error);
  if (error.response && error.response.data && error.response.data) {
    return reject(error.response.data.errorMessage);
  } else {
    return reject('There was a problem with the request.');
  }
}

function getContacts() {
  return new Promise((resolve, reject) => {
    axios
      .get('http://localhost:4568/api/getContacts')
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        handleErrors(err, reject);
      });
  });
}

function createContact(firstName, lastName, phone) {
  return new Promise((resolve, reject) => {
    axios
      .post('http://localhost:4569/api/createContact', {
        firstName,
        lastName,
        phone
      })
      .then(res => {
        resolve(res.data.message);
      })
      .catch(err => {
        handleErrors(err, reject);
      });
  });
}

function getContactsByQuery(query) {
  return new Promise((resolve, reject) => {
    axios
      .get('http://localhost:4567/api/getContactsByQuery/' + query)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        handleErrors(err, reject);
      });
  });
}

module.exports = {
  getContacts,
  getContactsByQuery,
  createContact
};
