import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink,
} from "react-router-dom";
import Landing from "./landing";
import Survey from "./survey";
import Results from "./results"
import Login from "./login";
import Signup from "./signup";

const navbar = () => {
    return (
        <Router>
          <div>
            <nav className="navbar navbar-expand bg-white py-4 shadow">
              <div className="container">
                <NavLink exact to="/" className="btn btn-outline-primary mr-4">
                  Az-Tx-Health
                </NavLink>
    
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
                <AuthButtons />
              </div>
            </nav>
    
            <div>
              <Routes>
                <Route path="/results" element={<Results />} />
                <Route path="/survey" element={<Survey />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Landing />} />
              </Routes>
            </div>
          </div>
        </Router>
    );
}

export default navbar

function AuthButtons() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/signup" className="nav-link">
            Signup
          </NavLink>
        </li>
      </ul>
    );
  }