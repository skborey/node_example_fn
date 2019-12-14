import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { addRestaurantToCollection } from '../actions/restaurantListAction';

class RestaurantList extends Component {

  constructor(props) {
    super(props);
    this.state = {
        selectedRestaurant: {},
        selectedCollection: {}
    }
  }

    handleAddToCollectionDropdown = (e, restaurantIndex) => {

        // find which collection is selected
        let collectionIndex = e.target.value;

        // console.log(restaurant, this.props.collectionList[collectionIndex]);
        this.props.addRestaurantToCollection( restaurantIndex, collectionIndex );
    }

  render () {

    let collectionDropdown = this.props.collectionList.map((item, index) => {
        return (
            <option key={index} value={index}>{item.title}</option>
        );
    });

    let restaurantList = this.props.restaurantList.map((item, index) => {
        return (
            <li key={index}>
                <h3>{item.title}</h3>
                <i>Open time: {item.open_time}</i>
                <select value='+ Add to Collection' onChange={(e) => this.handleAddToCollectionDropdown(e, item.id)}>
                    <option disabled hidden>+ Add to Collection</option>
                    {collectionDropdown}
                    <option value='createNewCollection'>+ Create New Collection</option>
                </select>
            </li>
        )
    });

    return (
        <div  style={{float: 'left'}}>
            <h3>Restaurants:</h3>
            <ul>
                {restaurantList}
            </ul>
        </div>
    );
  }
}

export default connect(
  (state, props) => ({
    restaurantList: state.restaurantList,
    collectionList: state.collectionList
  }),
  {
    addRestaurantToCollection: addRestaurantToCollection
  }
)(RestaurantList);