import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import contactsApi from '../../api/contacts-api';
import './contact-modal.css';
import { toast } from 'react-toastify';

class ContactModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  modalClass = {
    modal: 'contact-modal'
  };

  deleteContact = () => {
    this.setState({
      loading: true
    });
    contactsApi
      .deleteContact(this.props.contact.id)
      .then(data => {
        this.setState({
          loading: false
        });
        toast.success('👍 ' + data, {
          toastId: 'DeleteContactSuccess',
          position: toast.POSITION.TOP_CENTER
        });
        this.props.deletedItem();
      })
      .catch(err => {
        this.setState({
          loading: false
        });
        toast.error('😥 ' + err, {
          toastId: 'DeleteContactError',
          position: toast.POSITION.TOP_CENTER
        });
      });
  };

  closeCurrentModal = () => {
    if (!this.state.loading) {
      this.props.closeModal();
    }
  };

  render() {
    const contact = this.props.contact;
    return contact ? (
      <Modal
        open={this.props.open}
        onClose={this.closeCurrentModal}
        classNames={this.modalClass}
        showCloseIcon={!this.state.loading}
        center
      >
        <h1 className="margin-bottom-0">
          {contact.firstName} {contact.lastName}
        </h1>
        <h3 className="margin-top-5">
          <a href={'tel:+' + contact.phone}>
            <i className="fas fa-phone text-phone-number-icon fa-flip-horizontal" />
            &nbsp;{'+' + contact.phone}
          </a>
        </h3>
        {this.state.loading ? (
          <i className="fas fa-spin fa-spinner fa-2x text-purple" />
        ) : (
          <button
            className="pure-button pure-button-danger"
            onClick={this.deleteContact}
          >
            <i className="fas fa-trash fas-padding-0" />
          </button>
        )}
      </Modal>
    ) : (
      ''
    );
  }
}

export default ContactModal;
