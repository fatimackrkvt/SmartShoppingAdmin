import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import { authenticationService } from './shared/authentication.service';

class logout extends Component {
    
    render() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');

        return (
            <div>
            <p>Logout Successfully</p>
            <p>To Relogin <NavLink to='/login'> Click Here </NavLink> </p>
        </div>
        );
    }
}

logout.propTypes = {

};

export default logout;