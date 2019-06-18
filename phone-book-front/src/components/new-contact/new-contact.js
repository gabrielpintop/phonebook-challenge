import React, { Component } from 'react';
import contactsApi from '../../api/contacts-api';
import { toast } from 'react-toastify';
import './new-contact.css';
import ReactPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/dist/style.css';

class NewContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      phone: '',
      loading: false
    };
    this.inputsMaxLength = 25;
    this.inputsMinLength = 3;
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value.replace(/\s/g, '')
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
        this.state.phone.substring(1)
      )
      .then(data => {
        toast.success('😃 ' + data, {
          toastId: 'NewContactSuccess',
          position: toast.POSITION.TOP_CENTER
        });
        this.props.loadData();
        this.setState({
          firstName: '',
          lastName: '',
          phone: '',
          loading: false
        });
      })
      .catch(err => {
        toast.error('😥 ' + err, {
          toastId: 'NewContactError',
          position: toast.POSITION.TOP_CENTER
        });
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
                minLength={this.inputsMinLength}
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
                minLength={this.inputsMinLength}
                required
              />
              <ReactPhoneInput
                defaultCountry="co"
                value={this.state.phone}
                onChange={phone => this.setState({ phone })}
                disabled={this.state.loading}
                disableDropdown={this.state.loading}
                disableCountryCode={this.state.loading}
                inputClass="pure-input-1-2 last-new-contact-input"
                inputExtraProps={{
                  required: true
                }}
              />
            </fieldset>
            {this.state.loading ? (
              <i className="fas fa-spin fa-spinner fa-2x text-purple" />
            ) : (
              <button
                type="submit"
                className="pure-button pure-input-1-2 pure-button-primary"
                disabled={
                  this.state.firstName === '' ||
                  this.state.lastName === '' ||
                  this.state.phone === '' ||
                  this.state.phone.length < 8
                }
              >
                <i className="fas fa-user-plus" />
                Add
              </button>
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default NewContact;
