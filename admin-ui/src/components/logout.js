import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class Logout extends Component {
    
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

export default Logout;