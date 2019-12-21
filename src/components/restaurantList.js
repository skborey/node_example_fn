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

      this.props.addRestaurantToCollection( restaurantIndex, collectionIndex );
  }

  handleOnclick = (e) => {
    console.log(e, e.target, e.target.innerText)
  }

  render () {

    let collections = this.props.collectionList.collections;

    let collectionDropdown = Object.keys(collections).map(function(id) {
        return (
            <option key={id} value={id}>{collections[id].name}</option>
        );
    });

    let restaurantList = (this.props.restaurantList.length === 0) ? (<label>No restaurant found.</label>) :
      this.props.restaurantList.map((item, index) => {
        return (
            <div 
              key={index}
              className="list-cls"
              onClick={this.handleOnclick}
              >
                {this.props.sessions.email ?
                (<div 
                  title="Remove from collection"
                  className="remove-cls"
                >x</div>) : ''}
                <div>
                  <label>{(index+1) +'. '+ item.name}</label>
                </div>
                <div>
                  <select 
                      value='+ Add to Collection' 
                      onChange = {(e) => this.handleAddToCollectionDropdown(e, item.id)}
                    >
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

    let style = (this.props.sessions.email) ? {} : {width: "60%", left: "20%"};

    return (
        <div className="restaurant-list-cls" style={style}>
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