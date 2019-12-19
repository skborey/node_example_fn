import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import '../assets/restaurantlist.css';
import { addRestaurantToCollection } from '../actions/restaurantListAction';

class RestaurantList extends Component {

  constructor(props) {
    super(props);
    this.state = {
        selectedRestaurant: {},
        selectedCollection: {},
        filterString: "11am - 9pm",
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
          <div className="list-cls" key={index}>
              <div>
                <label>{item.title}</label>
                <i>Open: 10AM - 12PM</i>
              </div>
              <div>
                <select value='+ Add to Collection' onChange={(e) => this.handleAddToCollectionDropdown(e, item.id)}>
                    <option disabled hidden>+ Add to Collection</option>
                    {collectionDropdown}
                    <option value='createNewCollection'>+ Create New Collection</option>
                </select>
              </div>
          </div>
      )
    });

    return (
        <div className="restaurant-list-cls">
            {restaurantList}
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