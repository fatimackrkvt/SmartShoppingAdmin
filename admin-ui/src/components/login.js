import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import { authenticationService } from './shared/authentication.service';

class Login extends Component {
    state = {email:'',
             password:''
            }

    constructor(props){
        super(props);
        // redirect to home if already logged in
        if(authenticationService.currentUser) { 
            this.props.history.push('/');
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
          });
    }

    handleClick = (e) => {
        e.preventDefault();

        var payload={
            "email":this.state.email,
            "password":this.state.password
        }

        axios.post("/api/users/Login", payload)
        .then( response => {
            if(response.status == 200){  //Login successfull
                
                let user = {token:response.data.token}
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));

                //Redirect to origional page / Home page
                const { from } = this.props.location.state || { from: { pathname: "/" } };
                this.props.history.push(from);
            }
            else{
                console.log("* Status ...",response.status);
            }
        })
        .catch(function (error) {
            console.log("Error... ", error);
        });
    }

    render() {
        return (
            <div className="auth-wrapper">
            <div className="auth-inner">
            <form>
                <h3>Sign In</h3>
    
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
    
                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
    
                <button type="submit" className="btn btn-primary btn-block" onClick={this.handleClick}>Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
                <p className="forgot-password text-right">
                    Not registered yet <NavLink to='/signUp'>Register Now </NavLink>
                </p>
            </form> </div></div>
        );
    }
}

export default Login;