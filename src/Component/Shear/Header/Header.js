import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../../../Assets/Images/logo.jpg";
import "./Header.css";

const Header = () => {
  return (
    <div>
      <div className="container p-3">
        <Navbar bg="white" expand="lg">
          <Container>
            <NavLink className="logo" to="/">
              Car Repair
            </NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="m-auto">
                <NavLink className="link" to="/">
                  Home
                </NavLink>
                <NavLink className="link" to="/about">
                  About
                </NavLink>
                <NavLink className="link" to="/contact">
                  Contact
                </NavLink>
                <NavLink className="link" to="/services">
                  Services
                </NavLink>
              </Nav>
              <button className="nav-btn">Login</button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};

export default Header;