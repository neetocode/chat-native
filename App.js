import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import Router from './src/main/Router'
import axios from 'axios'

import thunk from 'redux-thunk'
import promise from 'redux-promise'

import reducers from './src/main/reducers'



const store = applyMiddleware(thunk, promise)(createStore)(reducers)

axios.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  //   console.log(error);
  return Promise.reject(error);
});

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router onNavigationStateChange={null} />
      </Provider>
    );
  }
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
