import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { resetPopup, register, login } from '../actions/';

import '../assets/popup.css';

class Popup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sessionEmail: null,
            showPage: null,
            popupErrMsg: null,
        }

        this.emailInput = React.createRef();
        this.passwordInput = React.createRef();
    }

    isEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return (re.test(String(email).toLowerCase()))
    }

    handleChange = (e) => {
        if (e.target.name === 'email' && this.isEmail(e.target.value)) this.setState({email: e.target.value});
        else if (e.target.name === 'password') this.setState({password: e.target.value});
    }

    handleButtonOnclick = (e) => { console.log(this.props.sessions);

        let action = e.target.dataset.action;

        switch(action) {
            case 'register':
                this.props.register({email: this.state.email, password: this.state.password});
                break;
            case 'login':
                let email = this.emailInput.current.value;
                let password = this.passwordInput.current.value;
                let isEmail = this.isEmail(email);

                this.emailInput.current.style.borderColor = isEmail ? '': '#ff5722';
                this.passwordInput.current.style.borderColor = password ? '' : '#ff5722';

                if (isEmail && password) {
                    this.setState({popupErrMsg: null});
                    this.props.login({email: email, password: password});
                } else {
                    this.setState({popupErrMsg: "Invalid email or password."});
                }

                break;
            default: console.log('default');
        }
    }

    handleOnclickPopup = (e) => {
        if (e.target.className === 'popup-cls') {
            this.props.resetPopup();
        }
    }

    render () {

        let errMsg = this.state.popupErrMsg ?
                        this.state.popupErrMsg :
                            this.props.popupErrMsg ?
                                this.props.popupErrMsg : null;

        let pages = {
            register: (
                <div>
                    <label>Register</label>
                    <div>
                        <label>Email *: </label>
                        <input
                            name="email"
                            type="email"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label>Password *:  </label>
                        <input
                            name="password"
                            type="password"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label>Confirm Pasword *:  </label>
                        <input 
                            value={this.state.password} 
                            name="confirm-password" 
                            type="password" 
                            onChange={this.handleChange}/>
                    </div>
                    <div>
                        <span className="message-cls">{errMsg}</span>
                        <button 
                            data-action="register"
                            onClick={this.handleButtonOnclick}
                        >Register</button>
                    </div>
                </div>
            ),
            login: (
                <div>
                    <label>Login</label><br />
                    <div>
                        <label>Email : </label>
                        <input 
                            name="email" 
                            type="email"
                            ref={this.emailInput}
                        />
                    </div>
                    <div>
                        <label>Password :  </label>
                        <input
                            name="password"
                            type="password" 
                            ref={this.passwordInput}
                        />
                    </div>
                    <div>
                        <span className="message-cls">{errMsg}</span>
                        <button
                            data-action="login"
                            onClick={this.handleButtonOnclick}
                        >Login</button>
                    </div>
                </div>
            ),
            addNewCollection: (
                <div>
                    <label>New Collection</label><br />
                    <div>
                        <label>Title * : </label>
                        <input type="text" /><br />
                    </div>
                    <div>
                        <span className="message-cls">{errMsg}</span>
                        <button
                            data-action="addNewCollection"
                            onClick={this.handleButtonOnclick}
                        >Add</button>
                    </div>
                </div>
            ),
            addNewCollaborator: (
                <div>
                    <label>New Collaboration</label>
                    <div>
                        <label>Name * : </label>
                        <input type="email" />
                    </div>
                    <div>
                        <label>Search email * : </label>
                        <input type="email" />
                    </div>
                    <div>
                        <span className="message-cls">{errMsg}</span>
                        <button
                            data-action="addNewCollaborator"
                            onClick={this.handleButtonOnclick}
                        >Add</button>
                    </div>
                </div>
            )
        };

        let popup = (
            (this.props.popupPage) ? (
                <div className='popup-cls' onClick={this.handleOnclickPopup} >
                    <div className='block-cls'>
                        {pages[this.props.popupPage]}
                    </div>
                </div>
            ) : (
                null
            )
        );

        return (
            <div>
                {popup}
            </div>
        );
    }
}

export default connect(
  (state, props) => ({
    sessions: state.sessions,
    popupPage: state.popupPage,
    popupErrMsg: state.popupErrMsg,
  }),
  {
      resetPopup: resetPopup,
      register: register,
      login: login,
  }
)(Popup);