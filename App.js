import React from 'react';
import { AsyncStorage } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { createAppContainer } from "react-navigation";
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';

import { reducer } from './redux';

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

const store = createStore(reducer, undefined, compose(applyMiddleware(thunk), autoRehydrate()));
persistStore(store, {storage: AsyncStorage})

/*** OR (not persist) ***/
// const store = createStore(reducer, undefined, applyMiddleware(thunk));