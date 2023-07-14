import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/payment">Pagos</Link>
          </li>
          <li className="navbar-item">
            <Link to="/map">Mapa</Link>
          </li>
          <li className="navbar-item">
            <Link to="/resources">Recursos</Link>
          </li>
          <li className="navbar-item">
            <Link to="/register">Registrarse</Link>
          </li>
          <li className="navbar-item">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    );
  };
export default Navbar;