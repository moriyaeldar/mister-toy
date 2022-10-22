import React from 'react';
import { Link } from 'react-router-dom';

import {  onLogout,onLogin,onSignup } from '../store/user.actions.js'
import { LoginSignup } from "../cmps/login-signup.jsx";

import { connect } from 'react-redux';

import { UserMsg } from '../cmps/user-msg.jsx';

class _Login extends React.Component {
  onLogin = (credentials) => {
    this.props.onLogin(credentials)
}
onSignup = (credentials) => {
    this.props.onSignup(credentials)
}
onLogout = () => {
    this.props.onLogout()
}


  render() {    const { user } = this.props;
  
    return (
      <header>
       
       <section className="home bg-info p-2 text-dark bg-opacity-25 margin">
       {user && (
          <section>
            <Link className="link-dark margin" to={`/user/${user._id}`}>
              User profile
            </Link>
            <section className="user-info margin ">
              <pre>wellcom back! {JSON.stringify(user.username)}</pre>
              <button
                type="button"
                className=" logout btn btn-outline-danger margin"
                onClick={this.onLogout}
              >
                Logout
              </button>
            </section>
          </section>
        )}
       {!user && <LoginSignup onLogin={this.onLogin} onSignup={this.onSignup}/>}
      </section>
        <UserMsg />
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userModule.user,
   
  };
}

const mapDispatchToProps = {
  onSignup,
  onLogin,
    onLogout
  }
export const Login = connect(mapStateToProps,mapDispatchToProps)(_Login);
