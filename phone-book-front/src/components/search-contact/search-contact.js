import React, { Component } from 'react';

class SearchContact extends Component {
  render() {
    return (
      <div className="pure-u-1 pure-u-lg-1-3">
        <div className="box">
          <h2>
            <i className="fas fa-search" />
            Search contact
          </h2>
          <form className="pure-form">
            <fieldset className="pure-group">
              <input type="text" className="pure-input-1-2" />
            </fieldset>
            <button
              type="submit"
              className="pure-button pure-input-1-2 pure-button-primary"
            >
              <i className="fa fa-search" />
              Search
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default SearchContact;
