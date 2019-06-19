// Axios is used for handling the requests
const axios = require('axios');

// Array with the information of the services to invoke
const apisUrls = [
  {
    host: 'http://localhost:4568/api/',
    serviceName: 'getContacts'
  },
  {
    host: 'http://localhost:4569/api/',
    serviceName: 'createContact'
  },
  {
    host: 'http://localhost:4567/api/',
    serviceName: 'getContactsByQuery'
  },
  {
    host: 'http://localhost:4570/api/',
    serviceName: 'deleteContact'
  }
];

// Function that handles the errors that may happen in the requests
function handleErrors(error, reject) {
  console.log(error.response);
  if (
    error.response &&
    error.response.data &&
    error.response.data.errorMessage
  ) {
    return reject(error.response.data.errorMessage);
  } else {
    return reject('There was a problem with the request. Please try again.');
  }
}

// Get all the contacts in the database
function getContacts() {
  return new Promise((resolve, reject) => {
    axios
      .get(apisUrls[0].host + apisUrls[0].serviceName)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        handleErrors(err, reject);
      });
  });
}

// Creates a new contact
function createContact(firstName, lastName, phone) {
  return new Promise((resolve, reject) => {
    if (firstName === '') {
      return reject('The first name is required.');
    } else if (lastName === '') {
      return reject('The last name is required.');
    } else if (phone === '') {
      return reject('The phone number is required.');
    }

    axios
      .post(apisUrls[1].host + apisUrls[1].serviceName, {
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

// Gets the first five contacts based on a criteria
function getContactsByQuery(query) {
  return new Promise((resolve, reject) => {
    if (query === '') {
      return reject("The query can't be empty");
    }

    axios
      .get(apisUrls[2].host + apisUrls[2].serviceName + '/' + query)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        handleErrors(err, reject);
      });
  });
}

// Deletes a contact
function deleteContact(id) {
  return new Promise((resolve, reject) => {
    axios
      .delete(apisUrls[3].host + apisUrls[3].serviceName + '/' + id)
      .then(res => {
        resolve(res.data.message);
      })
      .catch(err => {
        handleErrors(err, reject);
      });
  });
}

// Exports the functions
module.exports = {
  getContacts,
  getContactsByQuery,
  createContact,
  deleteContact
};
