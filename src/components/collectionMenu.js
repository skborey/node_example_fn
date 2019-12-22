import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import '../assets/collectionmenu.css'

import { showPopup, deleteCollection, showCollection } from '../actions/';

class CollectionMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  deleteCollection = (id, name) => {

    if (!window.confirm(`"${name}" will be deleted!`)) return;

    this.props.deleteCollection(id, this.props.sessions.token);
  }

  showCollectionPlease = (e) => {

    if (e.target.title === 'Delete collection') return;

    this.props.showCollection(e.target.id);
  }

  render () {

    const YESTTHIS = this; // in map cannot know `this`

    const collections = this.props.collections;
    const list = Object.keys(collections).map(function(id) {
      return (
        <li 
          key={id}
          id={id}
          onClick={YESTTHIS.showCollectionPlease}
        >
          {collections[id].name}
          <span
            title='Delete collection'
            onClick={ () => YESTTHIS.deleteCollection(id, collections[id].name) }
          >x</span>
        </li>
      )
    });

    return (
      (this.props.sessions.email) ? (
        <div className="collection-menu-cls" >
            <h5>My Collections</h5>
            <ul>
              {list}
            </ul>
            <button
              className="btn-addnew-cls"
              onClick={() => this.props.showPopup('addNewCollection')}
            >+ Add New Collection</button>
        </div>
      ):(null)
    );
  }
}

export default connect(
  (state, props) => ({
    sessions: state.sessions,
    collections: state.collections,
  }),
  {
    showPopup: showPopup,
    deleteCollection: deleteCollection,
    showCollection: showCollection,
  }
)(CollectionMenu);