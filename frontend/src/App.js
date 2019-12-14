import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from './actions';
import Header from './components/header';

function App() {

  const dispatch = useDispatch();
  const currResult = useSelector(state => state.result);

  return (
      <div>
        <Header />
        <h1>Additional result: { currResult }</h1>
        <button onClick={() => dispatch(increment(2))}>+</button>
        
      </div>
  );
}

export default App;