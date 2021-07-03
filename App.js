import React from 'react';
import Navigation from './Navigator/Navigation';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducers';

const App = () => {
  const store = createStore(reducer);
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
