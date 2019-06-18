import React, { Component } from 'react';
import contactsApi from '../../api/contacts-api';
import { toast } from 'react-toastify';
import './search-contact.css';

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

  handleSubmit = e => {
    e.preventDefault();

    this.setState({
      loading: true,
      searched: false,
      contacts: []
    });
    contactsApi
      .getContactsByQuery(this.state.searchFilter)
      .then(data => {
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
          searched: true
        });
      });
  };

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
                maxLength="30"
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
                <ul class="list-group list-group-flush margin-top-search-list">
                  {this.state.contacts.map(contact => {
                    return (
                      <li
                        class="list-group-item text-left"
                        key={contact.id + 'searched'}
                      >
                        <div className="pure-g">
                          <div className="pure-u-4-5">
                            <h4 className="margin-bottom-0 margin-top-0">
                              {contact.firstName} {contact.lastName}
                            </h4>
                            <h5 className="margin-top-5 margin-bottom-0 text-phone-number">
                              {contact.phone}
                            </h5>
                          </div>
                          <div className="pure-u-1-5 text-right my-auto">
                            <a
                              className="text-phone-number-icon margin-bottom-0"
                              href={'tel:+' + contact.phone}
                            >
                              <i class="fas fa-phone fa-flip-horizontal fa-lg fas-padding-0 margin-bottom-0" />
                              &nbsp;
                            </a>
                          </div>
                        </div>
                      </li>
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
