import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import '../assets/restaurantlist.css';
import {showPopup,
        apiGetRestaurants,
        addRestaurantToCollection,
        removeRestaurantFromCollection
      } from '../actions/';

class RestaurantList extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.apiGetRestaurants(); // no filter
  }

  addRestaurantToCollection = (restaurantId, e) => {

      let collectionId = e.target.value;

      if (collectionId === 'addNewCollection') {
        this.props.showPopup('addNewCollection');
      } else {
        this.props.addRestaurantToCollection(restaurantId, collectionId);
      }
  }

  render () {

    /**
      Restaurant display:
      - search result => display all -> 1) + Add to Collection: redirect to login, 2) No X to remove from collection
      - selected collection => display base on collection -> allow 2 options
      - selected collection but not owner => display base on collection No options
     */

    const isLogin = this.props.sessions.email;

    const collections = this.props.collections;
    const selectedCollectionId = this.props.selectedCollectionId;

    const options = Object.keys(collections).map((id, index) => {
        return (
          <option key={id} value={id}>{collections[id].name}</option>
        );
    });

    let restaurants = this.props.restaurants;
    if (selectedCollectionId) {
      let relations = this.props.relationC2R;
      restaurants = Object.keys(restaurants).filter( (id) => {
          return relations.find( // find all restaurant that have relation with selected collection 
            (relation) => (relation[0] === selectedCollectionId && relation[1] === id)
          )
        }).reduce((obj, id) => {
          obj[id] = restaurants[id];
          return obj;
        }, {});
    }

    const list = Object.keys(restaurants).map((id, i) => {

        return (

          <div 
            key={i}
            className="list-cls"
            onClick={this.handleOnclick}
            >
              { isLogin 
                && selectedCollectionId 
                  && (this.props.sessions.email === this.props.collections[selectedCollectionId].ownerEmail) ? 
                  ( 
                  <div 
                    title="Remove from collection" 
                    className="remove-cls" 
                    onClick = {() => this.props.removeRestaurantFromCollection(id, selectedCollectionId) }
                  >x</div> ) : ''
              }
              <div>
                <label>{(i+1) +'. '+ restaurants[id].name}</label>
              </div>
              <div>
                { isLogin ? (
                    <select 
                        value='+ Add to Collection'
                        onChange = {(e) => this.addRestaurantToCollection(id, e)}
                      >
                        <option disabled hidden>+ Add to Collection</option>
                        { options }
                        <option value='addNewCollection'>+ Create New Collection</option>
                    </select>
                  ) : (
                    <button onClick={() => this.props.showPopup('register')}>+ Add to Collection</button>
                  )
                }

              </div>
              <div>
                <i>Open: {restaurants[id].open}</i>
              </div>
          </div>
        )
      });

    let style = (this.props.sessions.email) ? {} : {width: "60%", left: "20%"};

    return (
        <div className="restaurant-list-cls" style={style}>
            { list.length > 0 ? list : (<h3>There is no records!</h3>)}
        </div>
    );
  }
}

export default connect(
  (state, props) => ({
    sessions: state.sessions,
    restaurants: state.restaurants,
    collections: state.collections,
    relationC2R: state.relationC2R,
    selectedCollectionId: state.selectedCollectionId,    
  }),
  {
    showPopup: showPopup,
    apiGetRestaurants: apiGetRestaurants,
    addRestaurantToCollection: addRestaurantToCollection,
    removeRestaurantFromCollection: removeRestaurantFromCollection,
  }
)(RestaurantList);