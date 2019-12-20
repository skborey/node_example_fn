import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import '../assets/collaborator.css';

class CollaboratorList extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    handleFinishRename = (e) => {
        let id = e.target.id;
        let name = e.target.innerText
        console.log(id, name);
    }

    handleOnDeleteCollaborator = (id) => {
        console.log(id);
    }

    render () {

        let collections = this.props.collectionList.collections;
        let collaborators = this.props.collectionList.collaborators;
        let collaboratorMenu = (this.props.showCollectionId) ?
            collections[this.props.showCollectionId].collaborators.map((id, index) => {
                return (
                    <li key={index} >
                        <span
                            id={collaborators[id]._id}
                            title='Click to rename'
                            contentEditable="true"
                            onBlur={this.handleFinishRename}
                        >
                            {collaborators[id].name}
                        </span>
                        <span 
                            title='Delete collection' 
                            onClick={() => this.handleOnDeleteCollaborator(collaborators[id]._id)}
                        >x</span>
                    </li>
                )}) : null;

        return (
            (this.props.sessions.email) ? (
                <div className="collaborator-menu-cls">
                    <h5>Collaborators</h5>
                    <ul>
                        {collaboratorMenu}
                    </ul>
                    <button className="btn-addnew-cls">+ Add New Collaborator</button>
                </div>
            ):(null)
        );
    }
}

export default connect(
  (state, props) => ({
    sessions: state.sessions,
    collectionList: state.collectionList,
    showCollectionId: state.showCollectionId,
  }),
  {
  }
)(CollaboratorList);