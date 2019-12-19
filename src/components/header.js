import React from 'react';
import { Component } from 'react';

import '../assets/header.css';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sessionEmail: null,
        }
    }

    handleLogoutOnclick = () => {
        this.setState({'sessionEmail': null});
        console.log(this.state.sessionEmail);
    }

    handleLoginOnclick = () => {
        this.setState({'sessionEmail': 'skborey@gmail.com'});
        console.log(this.state.sessionEmail);
    }

    handleRegisterOnclick = () => {
        this.setState({'sessionEmail': 'skborey@gmail.com'});
        console.log(this.state.sessionEmail);
    }

    render () {
        let sessionButton = (
            (this.state.sessionEmail) ? ( 
                <select value= { this.state.sessionEmail } onChange={ this.handleLogoutOnclick }>
                    <option disabled hidden>{ this.state.sessionEmail }</option>
                    <option>Logout</option>
                </select>
            ):(
                <div>
                    <button onClick={ this.handleLoginOnclick }>Login</button>
                    <button onClick={ this.handleRegisterOnclick }>Register</button>
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
  
export default Header;