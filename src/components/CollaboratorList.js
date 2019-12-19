import React from 'react';
import { Component } from 'react';

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
            <div className="collaborator-menu-cls">
                <h5>Collaborators</h5>
                <button className="btn-addnew-cls">+ Add New Collaborator</button>
            </div>
            
        );
    }
}
  
export default CollaboratorList;