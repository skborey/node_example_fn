import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from './actions';
import Header from './components/header';

function App() {

  const state = {};
  // const dispatch = useDispatch();
  // const currResult = useSelector(state => state.result);

  const collectionList = useSelector(state => state.collectionList).map((item, index) => {
    return (
      <li key={index}>{item}</li>
    )
  });

  return (
      <div>
        <Header />
        {/* <h1>Additional result: { currResult }</h1>
        <button onClick={() => dispatch(increment(2))}>+</button> */}
        <div>
          <h3>My Collections</h3>
          <input 
            type='text' 
            placeholder='Add new collection' 
            onInput={ 
              (evt) => {
                state.newCollectionTilte = evt.target.value;
                console.log(state);
              }
            }>
          </input>
          <button>Add</button>
          {collectionList}
        </div>
      </div>
  );
}

export default App;