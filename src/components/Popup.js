import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

// import { register } from '../actions/userAction';
// import { resetPopup } from '../actions/popupAction';
import { resetPopup, register, login } from '../actions/';

import '../assets/popup.css';

class Popup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sessionEmail: null,
            showPage: null,
            email: null,
            password: null,
            // showPage: 'register',
        }
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
                if (this.state.email && this.state.password) {
                    this.props.login({email: this.state.email, password: this.state.password});
                }
                break;
            default: console.log('default');
        }
    }

    handleOnclickPopup = (e) => {
        if (e.target.className === 'popup-cls') {
            // this.setState({'showPage': null});
            this.props.resetPopup();
        }
    }

    render () {
        let pages = {
            register: (
                <div>
                    <label>Register</label>
                    <div>
                        <label>Email *: </label><input name="email" type="email" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label>Password *:  </label>
                        <input name="password" type="password" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>Confirm Pasword *:  </label><input name="confirm-password" type="password" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <span className="message-cls">{this.props.popupErrMsg}</span>
                        <button data-action="register" onClick={this.handleButtonOnclick}>Register</button>
                    </div>
                </div>
            ),
            login: (
                <div>
                    <label>Login</label><br />
                    <div>
                        <label>Email : </label><input name="email" type="email" onChange={this.handleChange} /><br />
                    </div>
                    <div>
                        <label>Password :  </label><input name="password" type="password" onChange={this.handleChange} /><br />
                    </div>
                    <div>
                        <span className="message-cls">{this.props.popupErrMsg}</span>
                        <button data-action="login" onClick={this.handleButtonOnclick}>Login</button>
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
                        <span className="message-cls">{this.props.popupErrMsg}</span>
                        <button data-action="addNewCollection" onClick={this.handleButtonOnclick}>Add</button>
                    </div>
                </div>
            ),
            addNewCollaborator: (
                <div>
                    <label>New Collaboration</label><br />
                    <div>
                        <label>Name * : </label><input type="email" /><br />
                    </div>
                    <div>
                        <label>Search email * : </label><input type="email" /><br />
                    </div>
                    <div>
                        <span className="message-cls">{this.props.popupErrMsg}</span>
                        <button data-action="addNewCollaborator" onClick={this.handleButtonOnclick}>Add</button>
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
  
// export default Popup;

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