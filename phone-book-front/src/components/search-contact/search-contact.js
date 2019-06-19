import React, { Component } from 'react';
import contactsApi from '../../api/contacts-api';
import { toast } from 'react-toastify';
import './search-contact.css';
import ContactDetails from '../contact-details/contact-details';
import utilities from '../../global-functions/utilities';

// Allows the search of contacts based on some criteria
class SearchContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFilter: '',
      searched: false,
      loading: false,
      contacts: []
    };
  }

  // Used for cleaning the search when needed
  componentWillReceiveProps(nextProps) {
    if (nextProps.refresh) {
      this.setState({
        searched: false,
        loading: false,
        contacts: []
      });
    }
  }

  // Handles the change in the search filter. No whitespaces are allowed
  handleFilterChange = e => {
    this.setState(
      {
        searchFilter: e.target.value.replace(/\s/g, '')
      },
      () => {
        if (
          this.state.searched &&
          this.state.contacts.length === 0 &&
          this.state.searchFilter === ''
        ) {
          this.cleanData();
        }
      }
    );
  };

  // Search the contacts based on the filter
  searchContacts = () => {
    contactsApi
      .getContactsByQuery(this.state.searchFilter)
      .then(data => {
        data = utilities.sortByFirstAndLastName(data);
        this.setState({
          contacts: data,
          searched: true,
          loading: false
        });
      })
      .catch(err => {
        toast.error('😥 ' + err, {
          toastId: 'SearchContactError',
          position: toast.POSITION.TOP_CENTER
        });
        this.setState({
          loading: false,
          searched: false
        });
      });
  };

  // Handles the search button event
  handleSubmit = e => {
    e.preventDefault();

    this.setState({
      loading: true,
      searched: false,
      contacts: []
    });
    this.searchContacts();
  };

  // Clean the current results of the query
  cleanData = () => {
    this.setState({
      data: [],
      searched: false
    });
  };

  render() {
    return (
      <div className="pure-u-1 pure-u-lg-1-3">
        <div className="box">
          <h2 className="margin-bottom-0">
            <i className="fas fa-search" />
            Search contact
          </h2>
          <p className="small margin-top-5">
            Search by first name, last name or phone number
          </p>
          <form className="pure-form" onSubmit={this.handleSubmit}>
            <fieldset className="pure-group">
              <input
                type="text"
                value={this.state.searchFilter}
                onChange={this.handleFilterChange}
                className="pure-input-1-2"
                name="searchFilter"
                minLength="3"
                maxLength="25"
                disabled={this.state.loading}
              />
            </fieldset>
            {this.state.loading ? (
              <i className="fas fa-spin fa-spinner fa-2x text-purple" />
            ) : (
              <button
                disabled={this.state.searchFilter.length < 3}
                type="submit"
                className="pure-button pure-input-1-2 pure-button-primary"
              >
                <i className="fas fa-search" />
                Search
              </button>
            )}
          </form>
          {!this.state.loading && this.state.searched ? (
            this.state.contacts.length > 0 ? (
              <div>
                <br />
                <hr />
                <ul className="list-group list-group-flush margin-top-search-list">
                  {this.state.contacts.map(contact => {
                    return (
                      <ContactDetails
                        key={contact.id + 'search'}
                        contact={contact}
                        openModal={this.props.openModal}
                      />
                    );
                  })}
                </ul>
                <br />
                <button
                  onClick={this.cleanData}
                  className="pure-button button-purple"
                >
                  <i className="fas fa-broom fas-padding-0" />
                </button>
              </div>
            ) : (
              <div>
                <br />
                <hr />
                <h4>There are no contacts under the defined criteria</h4>
              </div>
            )
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

export default SearchContact;
