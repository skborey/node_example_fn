import React from 'react';
import { Component } from 'react';

import './assets/index.css';
import Header from './components/Header';
import Search from './components/Search';
import CollectionMenu from './components/CollectionMenu';
import RestaurantList from './components/RestaurantList';
import CollaboratorList from './components/CollaboratorList';
import Popup from './components/Popup';

class App extends Component {

  render () {
    return (
        <div className='app-cls'>
          <Header />
          <Search />
          <div>
            <CollectionMenu />
            <RestaurantList />
            <CollaboratorList />
          </div>
          <Popup/>
        </div>
    );
  }
}

export default App;