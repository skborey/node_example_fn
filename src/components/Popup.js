import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { addNewCollection, resetPopup, register, login } from '../actions/';

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

        this.emailReg$ = React.createRef();
        this.passwordReg$ = React.createRef();
        this.confirmReg$ = React.createRef();

        this.newCollectionTitle$ = React.createRef();
    }


    isEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return (re.test(String(email).toLowerCase()))
    }

    isPassword(password) {

        return (password && password.trim().length >= 6);
    }

    handleChange = (e) => {
    }

    handleButtonOnclick = (e) => {

        let action = e.target.dataset.action;
        let email = '';
        let password = '';
        let isEmail = '';

        switch(action) {

            case 'register':
                email = this.emailReg$.current.value;
                password = this.passwordReg$.current.value;
                let confirm = this.confirmReg$.current.value;
                
                isEmail = this.isEmail(email);
                let isPassword = this.isPassword(password);

                this.emailReg$.current.style.borderColor = isEmail ? '': '#ff5722';
                this.passwordReg$.current.style.borderColor = isPassword ? '' : '#ff5722';

                if (isEmail && isPassword) {
                    if (password === confirm) {
                        this.setState({popupErrMsg: null});
                        this.props.register({email: email, password: password});
                    } else {
                        this.confirmReg$.current.style.borderColor = '#ff5722';
                        this.setState({popupErrMsg: "Password is not matched."});
                    }
                } else {
                    this.setState({popupErrMsg: "Invalid data."});
                }

                break;

            case 'login':
                email = this.emailInput.current.value;
                password = this.passwordInput.current.value;
                isEmail = this.isEmail(email);

                this.emailInput.current.style.borderColor = isEmail ? '': '#ff5722';
                this.passwordInput.current.style.borderColor = password ? '' : '#ff5722';

                if (isEmail && password) {
                    this.setState({popupErrMsg: null});
                    this.props.login({email: email, password: password});
                } else {
                    this.setState({popupErrMsg: "Invalid email or password."});
                }

                break;
            case 'addNewCollection':

                let name = this.newCollectionTitle$.current.value;
                name = name ? name.trim() : null;

                this.newCollectionTitle$.current.style.borderColor = name ? '': '#ff5722';

                if (name) {
                    this.setState({popupErrMsg: null});
                    this.props.addNewCollection(name, this.props.sessions.token);
                } else {
                    this.setState({popupErrMsg: "Invalid title."});
                }

                break;

            default: console.log('default');
        }
    }

    handleOnclickPopup = (e) => {
        if (e.target.className === 'popup-cls') {
            this.setState({popupErrMsg: null});
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
                            ref={this.emailReg$}
                        />
                    </div>
                    <div>
                        <label>Password(>=6chars) *:  </label>
                        <input
                            name="password"
                            type="password"
                            ref={this.passwordReg$}
                        />
                    </div>
                    <div>
                        <label>Confirm Pasword *:  </label>
                        <input 
                            name="confirm-password" 
                            type="password" 
                            ref={this.confirmReg$}
                        />
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
                        <input
                            type="text"
                            ref={this.newCollectionTitle$}
                        /><br />
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
    addNewCollection: addNewCollection,
    resetPopup: resetPopup,
    register: register,
    login: login,
  }
)(Popup);