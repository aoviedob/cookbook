import React from 'react';
import { Link } from 'react-router';
import '../styles/header.scss';

const Header = () =>
    <nav className="blue lighten-1">
        <div className="nav-wrapper">
            <a href="#" className="brand-logo header"><i className="material-icons">forum</i>CookBook</a>
		    <ul id="nav-mobile" className="right hide-on-med-and-down">
		        <li><Link to="/app/">Recipe Management</Link></li>
		    </ul>
		</div>
	</nav>;

export default Header;
