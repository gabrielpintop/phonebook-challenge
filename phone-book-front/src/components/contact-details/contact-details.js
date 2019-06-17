import React, { Component } from 'react';

class ContactDetails extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.firstName}</td>
        <td>{this.props.lastName}</td>
        <td>{this.props.phone}</td>
      </tr>
    );
  }
}

export default ContactDetails;
