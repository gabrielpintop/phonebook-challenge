import React, { Component, Fragment } from 'react';
import Header from './components/header/header';
import NewContact from './components/new-contact/new-contact';
import SearchContact from './components/search-contact/search-contact';
import './app.css';
import ContactsList from './components/contacts-list/contact-list';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ContactModal from './components/contact-modal/contact-modal';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      load: false,
      refresh: false,
      open: false,
      contact: null
    };
  }

  loadData = () => {
    this.setState(
      {
        load: true
      },
      () => {
        this.setState({
          load: false
        });
      }
    );
  };

  openModal = contact => {
    this.setState({
      contact: contact,
      open: true
    });
  };

  closeModal = () => {
    this.setState({
      open: false,
      contact: null
    });
  };

  deletedItem = () => {
    this.setState(
      {
        open: false,
        contact: null,
        load: true,
        refresh: true
      },
      () => {
        this.setState({
          load: false,
          refresh: false
        });
      }
    );
  };

  render() {
    return (
      <Fragment>
        <Header />
        <div className="container">
          <ToastContainer />
          <div className="pure-g main-functionalities-container margin-bottom-30">
            <NewContact loadData={this.loadData} />
            <SearchContact
              openModal={this.openModal}
              refresh={this.state.refresh}
            />
            <ContactsList load={this.state.load} openModal={this.openModal} />
          </div>
        </div>
        <ContactModal
          open={this.state.open}
          contact={this.state.contact}
          closeModal={this.closeModal}
          deletedItem={this.deletedItem}
        />
      </Fragment>
    );
  }
}

export default App;
