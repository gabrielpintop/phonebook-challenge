import React, { Component, Fragment } from 'react';
import Header from './components/header/header';
import NewContact from './components/new-contact/new-contact';
import SearchContact from './components/search-contact/search-contact';
import './app.css';
import ContactsList from './components/contacts-list/contact-list';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      load: false
    };
  }

  loadData = () => {
    this.setState({
      load: true
    });
  };

  render() {
    return (
      <Fragment>
        <Header />
        <div className="container">
          <ToastContainer />
          <div className="pure-g main-functionalities-container margin-bottom-30">
            <NewContact loadData={this.loadData} />
            <SearchContact />
            <ContactsList load={this.state.load} />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
