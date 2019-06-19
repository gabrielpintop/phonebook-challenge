import React from 'react';
import headerLogo from '../../assets/phonebook.png';
import './header.css';

// Header of the app with the PhoneBook logo
function Header() {
  return (
    <div className="pure-g">
      <div className="pure-u-1">
        <div className="header">
          <img className="logo" src={headerLogo} alt="Header logo" />
          <p>
            v 2.0 by{' '}
            <a href="https://gabrielpinto.me" target="blank">
              Gabriel Pinto
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Header;
