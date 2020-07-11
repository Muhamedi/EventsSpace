import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated, logout } from 'common/auth';

//TODO Web Template Studio: Add a new link in the NavBar for your page here.
// A skip link is included as an accessibility best practice. For more information visit https://www.w3.org/WAI/WCAG21/Techniques/general/G1.
const NavBar = () => {
  return (
    <>
      <nav className='navbar navbar-expand-sm navbar-light border-bottom justify-content-between'>
        {isAuthenticated() && (
          <>
            <Link className='navbar-brand' to='/events'>
              Events
            </Link>
            <Link className='navbar-brand' to='/history'>
              History
            </Link>
            <Link className='navbar-brand' to='/ratings'>
              Ratings
            </Link>
          </>
        )}
        <div className='navbar-nav'>
          {isAuthenticated() && (
            <Link
              onClick={() => logout()}
              className='nav-item nav-link active'
              to='/login'
            >
              Log Out
            </Link>
          )}
          {!isAuthenticated() && (
            <>
              <Link className='nav-item nav-link active' to='/login'>
                Log In
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};
export default NavBar;
