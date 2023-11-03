import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink,
} from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';

import Landing from "./landing";
import SurveyForm from "./survey";
import Results from "./results"
import Signup from "./signup";

const Navbar = () => {

  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  
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
                    <Button onClick={() => logout()} variant="outline-info">
                      Logout
                    </Button>
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
              <Route path="/" element={<Landing />} />
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default Navbar

  