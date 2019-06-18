import React, { Component } from 'react';
import ContactDetails from '../contact-details/contact-details';
import contactsApi from '../../api/contacts-api';
import './contact-list.css';
import { toast } from 'react-toastify';

class ContactsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      contacts: []
    };
  }

  componentDidMount() {
    this.loadContacts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load) {
      this.setState({
        loading: true,
        contacts: []
      });
      this.loadContacts();
    }
  }

  loadContacts = () => {
    contactsApi
      .getContacts()
      .then(data => {
        // Sort the data by first name and lastName if needed
        data = data.sort((a, b) => {
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

        this.setState({
          contacts: data,
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          loading: false
        });
      });
  };

  render() {
    return (
      <div className="pure-u-1 pure-u-lg-1-3">
        <div className="box">
          <h2>
            <i className="fas fa-users" /> Contacts
          </h2>

          {this.state.loading ? (
            <i className="fas fa-spin fa-spinner fa-2x text-purple" />
          ) : this.state.contacts.length > 0 ? (
            <div className="table-responsive contacts-table">
              <table className="pure-table-striped pure-table-horizontal pure-table">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone</th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.contacts.map(contact => {
                    return (
                      <ContactDetails
                        key={contact.id}
                        firstName={contact.firstName}
                        lastName={contact.lastName}
                        phone={contact.phone}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <h4>There are no contacts</h4>
          )}
        </div>
      </div>
    );
  }
}

export default ContactsList;
