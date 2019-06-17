import React, { Component } from 'react';

class NewContact extends Component {
  render() {
    return (
      <div className="pure-u-sm-1 pure-u-1-3">
        <div className="box">
          <h2>
            <i className="fa fa-user-plus" />
            New contact
          </h2>
          <form className="pure-form">
            <fieldset className="pure-group">
              <input
                type="text"
                className="pure-input-1-2"
                placeholder="First Name"
              />
              <input
                type="text"
                className="pure-input-1-2"
                placeholder="Last Name"
              />
              <input
                type="email"
                className="pure-input-1-2"
                placeholder="Phone"
              />
              <button
                type="submit"
                className="pure-button pure-input-1-2 pure-button-primary"
              >
                <i className="fa fa-user-plus" />
                Add
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default NewContact;
