// Header.js

import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './Header.css'
import logo from '../assets/ENElogo.png'

function Header() {
  return (
    <header>
       <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Mainpage">Evaluation</Link></li>
          <li><Link to="/SyllabusForm">Syllabus</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
