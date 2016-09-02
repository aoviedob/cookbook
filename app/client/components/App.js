import React, { PropTypes } from 'react';
import Header from './Header';
import Footer from './Footer';

const App = ({ children }) =>
	<div>
    	<Header/>
        <div className="container">{ children }</div>
    	<Footer/>
    </div>;

App.propTypes = {
    children: PropTypes.object
};

export default App;
