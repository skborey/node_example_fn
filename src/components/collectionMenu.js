import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import '../assets/collectionmenu.css'

import { addNewCollection, deleteCollection, showRestaurantInCollection } from '../actions/collectionMenuAction';

class CollectionMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newCollectionTitle: ''
    } // local state
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleAddNewCollection = (e) => {
    e.preventDefault();

    if (!this.state.newCollectionTitle.trim()) return; // empty title

    this.props.addNewCollection(this.state.newCollectionTitle)
    this.setState({ newCollectionTitle: ''});
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

    let collectionMenu = this.props.collectionList.map((item, index) => {
      return (
        <li key={index} id={index} onClick={this.handleClickCollectionMenu}>
          {item.title}
          <span title='Delete collection' onClick={() => this.handleOnDeleteCollection(index, item)}>x</span>
        </li>
      )
    });

    return (
        <div className="collection-menu-cls" >
            <h5>My Collections</h5>
            <ul>
              {collectionMenu}
            </ul>
            <button className="btn-addnew-cls">+ Add New Collection</button>
        </div>
    );
  }
}

export default connect(
  (state, props) => ({
    collectionList: state.collectionList,
    restaurantList: state.restaurantList
  }),
  {
    addNewCollection: addNewCollection,
    deleteCollection: deleteCollection,
    showRestaurantInCollection: showRestaurantInCollection
  }
)(CollectionMenu);