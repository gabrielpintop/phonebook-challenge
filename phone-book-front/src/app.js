import React, { Component } from 'react';
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
      <div className="container">
        <ToastContainer />
        <Header />
        <div className="pure-g">
          <NewContact loadData={this.loadData} />
          <SearchContact />
          <ContactsList load={this.state.load} />
        </div>
      </div>
    );
  }
}

export default App;
