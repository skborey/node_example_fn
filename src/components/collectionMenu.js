import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import '../assets/collectionmenu.css'

import { showPopup, deleteCollection, showRestaurantInCollection } from '../actions/';

class CollectionMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newCollectionTitle: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleOnDeleteCollection = (id, collection) => {

    if (!window.confirm(`"${collection.title}" will be deleted!`)) return;

    this.props.deleteCollection(id);
  }

  handleClickCollectionMenu = (e) => {

    if (e.target.title === 'deleteCollection') return;

    this.props.showRestaurantInCollection( e.target.id );
  }

  render () {

    let collections = this.props.collectionList.collections;
    let collectionMenu = Object.keys(collections).map(function(id) {
      return (
        <li key={id} id={id} >
           {collections[id].name}
           <span 
             title='Delete collection' 
             onClick={() => this.handleOnDeleteCollection(id)}
           >x</span>
        </li>
      )
    })

    return (
      (this.props.sessions.email) ? (
        <div className="collection-menu-cls" >
            <h5>My Collections</h5>
            <ul>
              {collectionMenu}
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
    collectionList: state.collectionList,
    restaurantList: state.restaurantList,
    sessions: state.sessions
  }),
  {
    showPopup: showPopup,
    deleteCollection: deleteCollection,
    showRestaurantInCollection: showRestaurantInCollection
  }
)(CollectionMenu);