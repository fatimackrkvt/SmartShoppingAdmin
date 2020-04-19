import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

function Navbar({title, icon}) {
    return (
        <div className="navbar navbar-light ">
            <h4>
                <i className={icon}/>  <span className="glyphicon glyphicon-shopping-cart"></span> {title}
            </h4>
            <ul  className="navbar-nav ml-auto navbar-expand-lg">
                <li className="nav-item"> <Link className="nav-link" to="/" >Home</Link> </li>
                <li className="nav-item"> <Link className="nav-link" to="/" >Sign In</Link> </li>
                <li className="nav-item"> <Link className="nav-link" to="/" >Sign Up</Link> </li>
                <li className="nav-item"> <Link className="nav-link nav-link-last" to="/logout">Logout</Link> </li>
            </ul>
        </div>
    );
}

Navbar.propTypes = {
    title:PropTypes.string.isRequired,
    icon:PropTypes.string
}

Navbar.defaultProps = {
    title:"Smart Shopping Admin Page",
    icon:"glyphicon glyphicon-shopping-cart"
}

export default Navbar;