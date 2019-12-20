import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { showPopup, logout } from '../actions/';

import '../assets/header.css';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    showPopup = (e) => {
        this.props.showPopup(e.target.dataset.action);
    }

    handleLogoutClick = (e) => {
        this.props.logout(this.props.sessions.token);
    }

    render () {
        let sessionButton = (
            (this.props.sessions.email) ? ( 
                <select value= { this.props.sessions.email } onChange={ this.handleLogoutClick }>
                    <option disabled hidden>{ this.props.sessions.email }</option>
                    <option>Logout</option>
                </select>
            ):(
                <div>
                    <button data-action="login" onClick={ this.showPopup }>Login</button>
                    <button data-action="register" onClick={ this.showPopup }>Register</button>
                </div>
            ));

        return (
            <div className='header-cls'>
                <img alt="icon" src={process.env.PUBLIC_URL + '/icon.png'} />
                <h1>Is it open!</h1>
                {sessionButton}
            </div>
        );
    }
}

export default connect(
  (state, props) => ({
    sessions: state.sessions,
    trigger: state.popup
  }),
  {
      showPopup: showPopup,
      logout: logout
  }
)(Header);