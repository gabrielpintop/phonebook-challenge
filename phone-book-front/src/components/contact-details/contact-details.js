import React, { Component } from 'react';
import './contact-details.css';

class ContactDetails extends Component {
  openContactModal = () => {
    this.props.openModal(this.props.contact);
  };

  render() {
    return (
      <li className="list-group-item text-left">
        <div className="pure-g">
          <div className="pure-u-4-5 pointer" onClick={this.openContactModal}>
            <h4 className="margin-bottom-0 margin-top-0">
              <span>{this.props.contact.firstName}</span>{' '}
              <span className="contact-last-name">
                {this.props.contact.lastName}
              </span>
            </h4>
            <h5 className="margin-top-5 margin-bottom-0 text-phone-number">
              {this.props.contact.phone}
            </h5>
          </div>
          <div className="pure-u-1-5 text-right my-auto">
            <a
              className="text-phone-number-icon margin-bottom-0"
              href={'tel:+' + this.props.phone}
            >
              <i className="fas fa-phone fa-flip-horizontal fa-lg fas-padding-0 margin-bottom-0" />
              &nbsp;
            </a>
          </div>
        </div>
      </li>
    );
  }
}

export default ContactDetails;
