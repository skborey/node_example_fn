import React from 'react';
import { Component } from 'react';

import Header from './components/header';
import ColleciontMenu from './components/collectionMenu';
import RestaurantList from './components/restaurantList';

class App extends Component {

  render () {
    return (
        <div>
          <Header />
          <ColleciontMenu />
          <RestaurantList />
        </div>
    );
  }
}

export default App;