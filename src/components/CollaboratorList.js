import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import '../assets/collaborator.css';

class CollaboratorList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRestaurant: {},
            selectedCollection: {}
        }
    }

    render () {
        return (
            (this.props.sessions.email) ? (
                <div className="collaborator-menu-cls">
                    <h5>Collaborators</h5>
                    <button className="btn-addnew-cls">+ Add New Collaborator</button>
                </div>
            ):(null)
        );
    }
}

export default connect(
  (state, props) => ({
    sessions: state.sessions
  }),
  {
  }
)(CollaboratorList);