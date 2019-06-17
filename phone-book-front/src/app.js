import React from 'react';
import Header from './components/header/header';
import NewContact from './components/new-contact/new-contact';
import SearchContact from './components/search-contact/search-contact';
import './app.css';
import ContactsList from './components/contacts-list/contact-list';

function App() {
  return (
    <div className="container">
      <Header />
      <div className="pure-g">
        <NewContact />
        <SearchContact />
        <ContactsList />
      </div>
    </div>
  );
}

export default App;
