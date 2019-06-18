const axios = require('axios');

function getContacts() {
  return new Promise((resolve, reject) => {
    axios
      .get('http://localhost:4568/api/getContacts')
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        console.log(err.response.data.error);
        reject(err.response.data.errorMessage);
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
        console.log(err.response.data.error);
        reject(err.response.data.errorMessage);
      });
  });
}

module.exports = {
  getContacts,
  createContact
};
