import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import { initializeSession } from './actions';

import './assets/index.css';
import Header from './components/Header';
import Search from './components/Search';
import CollectionMenu from './components/CollectionMenu';
import RestaurantList from './components/RestaurantList';
import CollaboratorList from './components/CollaboratorList';
import Popup from './components/Popup';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    let token = Cookies.get('token');

    console.log(this.props.sessions);

    if (token) this.props.initializeSession(token);
  }

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

// export default App;
export default connect(
  (state, props) => ({
    sessions: state.sessions
  }),
  {
    initializeSession: initializeSession
  }
)(App);