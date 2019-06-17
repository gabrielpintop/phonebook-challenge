import React, { Component } from 'react';
import ContactDetails from '../contact-details/contact-details';

class ContactsList extends Component {
  render() {
    return (
      <div class="pure-u-sm-1 pure-u-1-3">
        <div class="box">
          <h2>
            <i class="fa fa-users" /> Contacts
          </h2>
          <table class="pure-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
              </tr>
            </thead>

            <tbody>
              <ContactDetails
                firstName="Gabriel"
                lastName="Pinto"
                phone="571306257871"
              />

              <ContactDetails
                firstName="Arun"
                lastName="Kart"
                phone="574158679089"
              />

              <ContactDetails
                firstName="Juan"
                lastName="Torus"
                phone="573012390930"
              />

              <ContactDetails
                firstName="Nolux"
                lastName="Fernandez"
                phone="573102930291"
              />
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ContactsList;
