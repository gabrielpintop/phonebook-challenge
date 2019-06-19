// Function that sorts the contacts by first name and last name
function sortByFirstAndLastName(array) {
  return array.sort((a, b) => {
    if (a.firstName > b.firstName) {
      return 1;
    }
    if (a.firstName < b.firstName) {
      return -1;
    }
    if (a.lastName > b.lastName) {
      return 1;
    }
    if (a.lastName < b.lastName) {
      return -1;
    }
    return 0;
  });
}

// Exports the function
module.exports = {
  sortByFirstAndLastName
};
