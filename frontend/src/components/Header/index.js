import React from 'react';

import { Link } from 'react-router-dom';

import './styles.css';
import logo from '../../assets/logo.png';
import camera from '../../assets/camera.png';

export default function Header() {
  return (
    <header id="header">
        <div className="content">
        <Link to="/" ><img src={logo} alt="home" /></Link>
        <Link to="/new" ><img src={camera} id="camera" alt="new" /></Link>
               
                
        </div>
    </header>
  );
}
