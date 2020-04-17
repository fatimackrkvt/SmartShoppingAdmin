import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

class signup extends Component {

    state = {
        name:'',
        email:'',
        password:''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
          });
    }

    handleClick = (e) => {
        e.preventDefault();

        //var self = this;
        var payload={
            "name": this.state.name,
            "email":this.state.email,
            "password":this.state.password
        }

        axios.post('api/users/Register', payload)
        .then(function (response) {
            if(response.data.code == 200){  //Register Succesfully
                
                let user = {token:response.data.token}
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));

                const { from } = this.props.location.state || { from: { pathname: "/" } };
                this.props.history.push(from);

            }
            else{
                console.log("Status ...",response.status);
            }
        })
        .catch(function (error) {
            console.log("Error... ", error);
        });

    }

    render() {
        return (
            <form>
                <h3>Sign Up</h3>
    
                <div className="form-group">
                    <label>Full name</label>
                    <input type="text" className="form-control" placeholder="Full name" 
                           name="name" onChange={this.handleChange}/>
                </div>
    
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email"
                           name="email" onChange={this.handleChange} />
                </div>
    
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password"
                           name="password" onChange={this.handleChange} />
                </div>
    
                <button type="submit" className="btn btn-primary btn-block" onClick={this.handleClick}>
                    Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <NavLink to='/login'>sign in? </NavLink>
                </p>
            </form>
        );
    }
}

signup.propTypes = {

};

export default signup;