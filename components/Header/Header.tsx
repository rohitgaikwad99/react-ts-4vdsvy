import * as React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  return (
    <React.Fragment>
      <div className="header">
        <img src="https://alvimurtaza.github.io/Interview-Front-end/images/l3-l4-engineer/logo.png" />
        <nav className="header-navigation">
          <div>Dashboard</div>
          <div>
            <Link to="/events">Events</Link>
          </div>
          <div>Help</div>
          <div>Logout</div>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default Header;
