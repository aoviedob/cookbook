import React from 'react';
import { Link } from 'react-router';

const Footer = () =>
    <footer className="page-footer blue lighten-1">
	    <div className="container">
	        <div className="row">
	            <div className="col l6 s12">
	    	        <h5 className="white-text">CookBook</h5>
	                <p className="grey-text text-lighten-4">This a training application, using technologies like Nodejs,ReactJS and Redux.</p>
	            </div>
	            <div className="col l4 offset-l2 s12">
	                <h5 className="white-text">Links</h5>
	                <ul>
	                    <li><Link className="grey-text text-lighten-3" to="/app/">Recipes Management</Link></li>
	                </ul>
	            </div>
	        </div>
	    </div>
        <div className="footer-copyright">
        	<div className="container">
            	© 2016 Copyright Avantica Technologies
            	<a className="grey-text text-lighten-4 right" href="#!">CookBook</a>
            </div>
        </div>
    </footer>;

export default Footer;

