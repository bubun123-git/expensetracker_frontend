import React from 'react';
import './MainNavigation.css';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../Store/AuthReducer';

function MainNavigation() {
  const isLoggedIn = useSelector(state => state.authentication.isAuthenticated); // Changed to 'isAuthenticated'
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.push('/');
  };

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
            <button onClick={logoutHandler}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default MainNavigation;
