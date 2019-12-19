import React from 'react';
import { Component } from 'react';
import '../assets/popup.css';

class Popup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sessionEmail: null,
            // showPage: null,
            showPage: 'register',
        }
    }

    handleButtonOnclick = (e) => {
        // test
        let action = e.target.dataset.action;
        let pages = ['register', 'login', 'addNewCollection', 'addNewCollaborator'];
        let nextPageIndex = pages.indexOf(action) + 2;
        if (nextPageIndex < pages.length) this.setState({'showPage': pages[nextPageIndex]});
        else this.setState({'showPage': null});
    }

    handleOnclickPopup = (e) => {
        if (e.target.className === 'popup-cls') {
            this.setState({'showPage': null});
        }
    }

    render () {

        let pages = {
            register: (
                <div>
                    <label>Register</label>
                    <div>
                        <label>Email *: </label><input type="email" />
                    </div>
                    <div>
                        <label>Password *:  </label>
                        <input type="password" />
                    </div>
                    <div>
                        <label>Confirm Pasword *:  </label><input type="password" />
                    </div>
                    <div>
                        <span className="message-cls">There is no User with this email</span>
                        <button data-tag="register" onClick={this.handleButtonOnclick}>Register</button>
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
            (this.state.showPage) ? (
                <div className='popup-cls' onClick={this.handleOnclickPopup} >
                    <div className='block-cls'>
                        {pages[this.state.showPage]}
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
  
export default Popup;