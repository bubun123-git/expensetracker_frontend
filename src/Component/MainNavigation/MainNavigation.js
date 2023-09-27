import React from 'react';
import './MainNavigation.css'
import { NavLink, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Store/Auth-Context';

function MainNavigation() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const history = useHistory();

  const LogoutHandler = () => {
    authCtx.logout();
    history.push('/');
  }

  return (
    <nav className="nav-bar">
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">
            Login
          </NavLink>
        </li>
        {isLoggedIn && (
          <li>
            <NavLink to='/startingpage'>Expenses</NavLink>
          </li>
        )}

        {isLoggedIn && (
          <li>
            <NavLink to="/Home" activeClassName="active">
              Home
            </NavLink>
          </li>
        )}

        {isLoggedIn && (
          <li>
            <NavLink to='/completeProfile'>Update Profile</NavLink>
          </li>
        )}

        {isLoggedIn && (
          <li>
            <button onClick={LogoutHandler}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default MainNavigation;
