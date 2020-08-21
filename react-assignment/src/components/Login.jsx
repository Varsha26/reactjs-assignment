import React, { useState, Fragment } from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {login} from "../actions/auth"
import {Link, Redirect} from "react-router-dom";
const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { email, password } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async e => {
        e.preventDefault();
        login(email,password);
    }

    //redirect if logged in
    if(isAuthenticated) {
        return <Redirect to ="/dashboard" />
    }
    return (
        <Fragment>
            <div className="background col-lg-12 col-md-12">
                <div className="col-lg-6 col-md-6 loginContainer ">
                    <div className="col-lg-12 col-md-12 margin-bottom">
                        <h3>React Js</h3>
                        <h2>iJavaScript</h2>
                    </div>
                    <form className="form" onSubmit={e => onSubmit(e)}>
                        <div className="col-lg-12 col-md-12 pl ml margin-bottom form-group">
                            <span className="bold col-md-2 col-lg-2">User ID</span>
                            <input type="email" name="email" className="form-control"
                                value={email}
                                onChange={e => onChange(e)}
                                placeholder="Enter User Id" />
                        </div>
                        <div className="col-lg-12 col-md-12 pl ml margin-bottom form-group">
                            <span className="bold col-md-2 col-lg-2">Password</span>
                            <input type="text" className="form-control"
                            name="password"
                                value={password}
                                onChange={e => onChange(e)} placeholder="Enter Password" />
                        </div>
                        <div className="col-lg-12 col-md-12 text-right margin-bottom">
                            <button className="loginbutton btn btn-lg" type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>


    )


}
login.proptypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, {login})(Login);
