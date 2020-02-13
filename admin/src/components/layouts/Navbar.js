import React, { Fragment, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import LeftNavbar from './LeftNavbar';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const { logout, isAuthenticated, user, loadUser } = authContext;
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();

  };
  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href='/'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/'>Login</Link>
      </li>
    </Fragment>
  );
  return (
    <div className="navbar bg-primary">
      <Link to='/home'>
        <h2><i className={icon} /> {title}</h2>
      </Link>
      {isAuthenticated && (
        <LeftNavbar />
      )}
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  )
}

Navbar.prototypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
}

Navbar.defaultProps = {
  title: "Rizk.pk",
  icon: "fas fa-book-reader"
}
export default Navbar;

