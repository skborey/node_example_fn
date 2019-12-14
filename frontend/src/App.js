import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { increment, addNewCollection, deleteCollection } from './actions';
import Header from './components/header';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newCollectionTitle: ''
    } // local state
  }

  handleOnClickIncrement = (e) => {
    return this.props.increment(2);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleAddNewCollection = (e) => {
    e.preventDefault();

    if (!this.state.newCollectionTitle.trim()) return; // empty title

    this.props.addNewCollection(this.state.newCollectionTitle)
    this.setState({ newCollectionTitle: ''});
  }

  handleOnDeleteCollection = (id) => {
    this.props.deleteCollection(id);
  }

  render () {

    let collectionMenu = this.props.collectionList.map((item, index) => {
      return (
        <li key={index}>
          {item.title}
          <span onClick={() => this.handleOnDeleteCollection(index)}> x </span>
        </li>
      )
    });

    return (
        <div>
          <Header />
          <h1>Additional result: { this.props.currResult }</h1>
          <button onClick={this.handleOnClickIncrement}>+</button>

          <div>
            <h3>My Collections</h3>
            <form onSubmit={ this.handleAddNewCollection }>
              <input type="text" name="newCollectionTitle" value={ this.state.newCollectionTitle } onChange={ this.handleChange } />
              <button type="submit">Add</button>
            </form>
            <ol>
              {collectionMenu}
            </ol>
          </div>
        </div>
    );
  }
}

export default connect(
  (state, props) => ({
    currResult: state.currResult,
    collectionList: state.collectionList
  }),
  {
    increment: increment,
    addNewCollection: addNewCollection,
    deleteCollection: deleteCollection
  }
)(App);