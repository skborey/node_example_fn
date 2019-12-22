import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import '../assets/collaboratormenu.css';

import { showPopup, deleteCollaborator, renameCollaborator } from '../actions';

class CollaboratorList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            oldName: null,
        }
    }

    deleteCollaborator = (id, name) => {
        
        if (!window.confirm(`"${name}" will be removed from current collection!`)) return;

        this.props.deleteCollaborator(id, this.props.sessions.token);
    }

    renameCollaborator = (e) => {

        const name = e.target.value.trim();

        if (name === this.state.oldName) return;

        if (name) {
            this.props.renameCollaborator(name, e.target.id, this.props.sessions.token);
        } else {
            e.target.value = this.state.oldName;
        }
    }

    handleOnChange = (e) => {
        console.log(e);
    }

    render () {

        const collaborators = this.props.collaborators;
        const relations = this.props.relationC2C
                        .filter(pair => pair[0] === this.props.selectedCollectionId);

        const list = relations.map((pair, index) => {
            let id = pair[1]; // ["collection-id", "colaborator-id"]
            return (
                <li key={index}>
                    <input
                        title="Rename collaborator"
                        type="text"
                        value={collaborators[id].name}
                        onFocus={(e) => { this.setState({ oldName: e.target.value })}}
                        onChange={this.handleOnChange}
                        onBlur={this.renameCollaborator}
                    />
                    <span 
                        title='Delete collection' 
                        onClick={() => this.deleteCollaborator(collaborators[id]._id, collaborators[id].name)}
                    >x</span>
                </li>
            );
        });

        return (
            (this.props.sessions.email
                && this.props.selectedCollectionId)
                ? (
                    <div className="collaborator-menu-cls">
                        <h5>Collaborators</h5>
                        <ul>
                            {list}
                        </ul>
                        <button 
                            className="btn-addnew-cls"
                            onClick={ () => this.props.showPopup('addNewCollaborator')}
                        >+ Add New Collaborator</button>
                    </div>
            ):(null)
        );
    }
}

export default connect(
  (state, props) => ({
    sessions: state.sessions,
    selectedCollectionId: state.selectedCollectionId,
    collaborators: state.collaborators,
    relationC2C: state.relationC2C,
  }),
  {
    showPopup: showPopup,
    renameCollaborator: renameCollaborator,
    deleteCollaborator: deleteCollaborator,
  }
)(CollaboratorList);