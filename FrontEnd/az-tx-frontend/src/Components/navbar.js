import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink,
} from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Landing from "./landing";
import Auth from './auth';
import SurveyForm from "./survey";
import Results from "./results"
import Signup from "./signup";

const Navbar = () => {

  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  
  return (
      <Router>
        <div>
          <nav className="navbar navbar-expand bg-white py-4 shadow">
            <div className="container">
              <NavLink exact to="/" className="btn btn-outline-info mr-4">
                Az-Tx-Health
              </NavLink>
              {isAuthenticated &&(
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <NavLink to="/survey" className="nav-link">
                      SRA Form
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/results" className="nav-link">
                      Results
                    </NavLink>
                  </li>
                </ul>
              )}
              {!isAuthenticated && (
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item" style={{paddingRight: '15px'}}>
                    <Button onClick={() => loginWithRedirect()} variant="outline-info">
                      Login
                    </Button>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/signup" className="btn btn-outline-info mr-4">
                      Signup
                    </NavLink>
                  </li>
                </ul>
              )}
              {isAuthenticated && (
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item" style={{paddingRight: '15px'}}>
                    <NavDropdown 
                      title = 
                        {
                          <svg xmlns="http://www.w3.org/2000/svg" 
                            width="32" 
                            height="32" 
                            fill="currentColor" 
                            className="bi bi-person-circle" 
                            viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
                          />
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                          </svg>
                        } 
                        id="basic-nav-dropdown"
                      >
                      <NavDropdown.Item><NavLink to="/auth" className="nav-link">Account</NavLink></NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item>
                        <Button onClick={() => logout()} variant="outline-info">
                          Logout
                        </Button>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </li>
                </ul>
              )}
            </div>
          </nav>
          <div>
            <Routes>
              <Route path="/results" element={<Results />} />
              <Route path="/survey" element={<SurveyForm />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<Landing />} />
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default Navbar

  