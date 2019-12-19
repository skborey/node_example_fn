import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

// import { register } from '../actions/userAction';
// import { resetPopup } from '../actions/popupAction';
import { register, resetPopup } from '../actions/';

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

    handleChange = (e) => {
        console.log(e.target.name);

        // do some validate
        if (e.target.name === 'email') this.setState({email: e.target.value});
        else if (e.target.name === 'password') this.setState({password: e.target.value});
    }

    handleButtonOnclick = (e) => {
        // test
        let action = e.target.dataset.action;
        if (action==='register') {
            this.props.register({email: this.state.email, password: this.state.password});
        }

        let pages = ['register', 'login', 'addNewCollection', 'addNewCollaborator'];
        let nextPageIndex = pages.indexOf(action) + 2;
        if (nextPageIndex < pages.length) this.setState({'showPage': pages[nextPageIndex]});
        else this.setState({'showPage': null});
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
                        <span className="message-cls">There is no User with this email</span>
                        <button data-action="register" onClick={this.handleButtonOnclick}>Register</button>
                    </div>
                </div>
            ),
            login: (
                <div>
                    
                    <label>Login</label><br />
                    <div>
                        <label>Email : </label><input type="email" /><br />
                    </div>
                    <div>
                        <label>Password :  </label><input type="password" /><br />
                    </div>
                    <div>
                        <span className="message-cls">There is no User with this email</span>
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
                        <span className="message-cls">There is no User with this email</span>
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
                        <span className="message-cls">There is no User with this email</span>
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
    popupPage: state.popupPage
  }),
  {
      resetPopup: resetPopup,
      register: register
  }
)(Popup);