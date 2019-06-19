import React, { Component } from 'react';
import ContactDetails from '../contact-details/contact-details';
import contactsApi from '../../api/contacts-api';
import utilities from '../../global-functions/utilities';
import './contact-list.css';

// Shows all the existing contacts
class ContactsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      contacts: [],
      message: '',
      error: false
    };
  }

  // Loads the contacts when the component is mounted
  componentDidMount() {
    this.loadContacts();
  }

  // Used for loading the contacts again when needed
  componentWillReceiveProps(nextProps) {
    if (nextProps.load) {
      this.setState({
        loading: true,
        contacts: [],
        error: false
      });
      this.loadContacts();
    }
  }

  // Loads all the existing contacts
  loadContacts = () => {
    this.setState({
      loading: true,
      contacts: [],
      error: false,
      message: ''
    });
    contactsApi
      .getContacts()
      .then(data => {
        let message = '';
        if (data.length === 0) {
          message = 'There are no contacts yet. Create one!';
        } else {
          // Sort the data by first name and lastName if needed
          data = utilities.sortByFirstAndLastName(data);
        }

        this.setState({
          contacts: data,
          loading: false,
          message: message
        });
      })
      .catch(err => {
        this.setState({
          error: true,
          message: err,
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
            <div>
              <h4>{this.state.message}</h4>
              {this.state.error ? (
                <button
                  className="pure-button button-purple"
                  onClick={this.loadContacts}
                >
                  <i className="fas fa-sync" />
                  Reload
                </button>
              ) : (
                ''
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ContactsList;
