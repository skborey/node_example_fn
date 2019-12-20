import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import '../assets/restaurantlist.css';
import { addRestaurantToCollection, apiGetRestaurantLists } from '../actions/';

class RestaurantList extends Component {

  constructor(props) {
    super(props);
    this.state = {
        selectedRestaurant: {},
        selectedCollection: {},
        filterString: "11am - 9pm",
    }
  }

  componentDidMount() {
    this.props.apiGetRestaurantLists(); // no filter
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

    let restaurantList = (this.props.restaurantList.length === 0) ? (<label>No restaurant found.</label>) :
      this.props.restaurantList.map((item, index) => {
        return (
            <div className="list-cls" key={index}>
                <div>
                  <label>{((index+1)?(index+1): "")+". "+ item.name}</label>
                </div>
                <div>
                  <select value='+ Add to Collection' onChange={(e) => this.handleAddToCollectionDropdown(e, item.id)}>
                      <option disabled hidden>+ Add to Collection</option>
                      {collectionDropdown}
                      <option value='createNewCollection'>+ Create New Collection</option>
                  </select>
                </div>
                <div>
                  <i>Open: {item.hours}</i>
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
    collectionList: state.collectionList,
    sessions: state.sessions,
  }),
  {
    addRestaurantToCollection: addRestaurantToCollection,
    apiGetRestaurantLists: apiGetRestaurantLists
  }
)(RestaurantList);