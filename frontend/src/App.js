import React from 'react';
import { Component } from 'react';

import Header from './components/header';
import ColleciontMenu from './components/collectionMenu';

class App extends Component {

  render () {
    return (
        <div>
          <Header />
          <ColleciontMenu />
        </div>
    );
  }
}

export default App;