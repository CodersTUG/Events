import React, { Component } from 'react';
import TodoApp from './TodoApp';
import { createStore, combineReducers, compose } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import DiffMonitor from '../../../lib'

import { Provider } from 'react-redux';
import * as reducers from '../reducers';

const finalCreateStore = compose(
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

const reducer = combineReducers(reducers);
const store = finalCreateStore(reducer);

if (module.hot) {
  module.hot.accept('../reducers', () =>
    store.replaceReducer(combineReducers(require('../reducers')))
  );
}

export default class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <TodoApp />
        </Provider>
        <DevTools store={store} monitor={DiffMonitor} shortcut='ctrl+d'/>
      </div>
    );
  }
}
