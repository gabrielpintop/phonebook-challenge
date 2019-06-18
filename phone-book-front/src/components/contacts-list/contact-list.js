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
        this.setState({
          contacts: data,
          loading: false
        });
      })
      .catch(err => {
        toast.error(err);
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
            <table className="pure-table">
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
          ) : (
            'There are no contacts'
          )}
        </div>
      </div>
    );
  }
}

export default ContactsList;
