import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { increment } from './actions';
import Header from './components/header';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {} // local state
  }

  handleOnClickIncrement = ( e ) => {
    return this.props.increment(2);
  }

  render () {
    return (
        <div>
          <Header />
          <h1>Additional result: { this.props.currResult }</h1>
          <button onClick={this.handleOnClickIncrement}>+</button>
        </div>
    );
  }
}

export default connect(
  (state, props) => ({
    currResult: state.currResult,
  }),
  {
    increment: increment
  }
)(App);