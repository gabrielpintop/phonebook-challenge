import React, { Component } from 'react';
import contactsApi from '../../api/contacts-api';
import { toast } from 'react-toastify';
import './new-contact.css';

class NewContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      phone: '',
      loading: false
    };
    this.inputsMaxLength = 40;
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    contactsApi
      .createContact(
        this.state.firstName,
        this.state.lastName,
        this.state.phone
      )
      .then(data => {
        toast.success('😃 ' + data);
        this.props.loadData();
        this.setState({
          firstName: '',
          lastName: '',
          phone: '',
          loading: false
        });
      })
      .catch(err => {
        toast.error('😥 ' + err);
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
            <i className="fas fa-user-plus" />
            New contact
          </h2>
          <form className="pure-form" onSubmit={this.handleSubmit}>
            <fieldset className="pure-group">
              <input
                type="text"
                className="pure-input-1-2"
                placeholder="First name"
                name="firstName"
                onChange={this.handleChange}
                maxLength={this.inputsMaxLength}
                value={this.state.firstName}
                disabled={this.state.loading}
                required
              />
              <input
                type="text"
                className="pure-input-1-2"
                placeholder="Last name"
                name="lastName"
                onChange={this.handleChange}
                maxLength={this.inputsMaxLength}
                value={this.state.lastName}
                disabled={this.state.loading}
                required
              />
              <input
                type="number"
                className="pure-input-1-2 last-new-contact-input"
                placeholder="Phone"
                name="phone"
                onChange={this.handleChange}
                maxLength={this.inputsMaxLength}
                value={this.state.phone}
                disabled={this.state.loading}
                required
              />
              {this.state.loading ? (
                <i className="fas fa-spin fa-spinner fa-2x text-purple" />
              ) : (
                <button
                  type="submit"
                  className="pure-button pure-input-1-2 pure-button-primary"
                >
                  <i className="fa fa-user-plus" />
                  Add
                </button>
              )}
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default NewContact;
