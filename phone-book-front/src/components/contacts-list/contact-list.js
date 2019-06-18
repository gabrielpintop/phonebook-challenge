import React, { Component } from 'react';
import ContactDetails from '../contact-details/contact-details';
import contactsApi from '../../api/contacts-api';
import utilities from '../../global-functions/utilities';
import './contact-list.css';

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
        data = utilities.sortByFirstAndLastName(data);

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
            <div className="">
              <ul className="list-group list-group-flush margin-top-search-list list-responsive contacts-list">
                {this.state.contacts.map(contact => {
                  return (
                    <ContactDetails
                      key={contact.id}
                      contact={contact}
                      openModal={this.props.openModal}
                    />
                  );
                })}
              </ul>
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
