const {compose, createStore, applyMiddleware} = require('redux');

const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');

const Example = require('./components/Example');

// Root reducer
const reducer = require('./reducers/items');

const createLogger = require('redux-logger');

const {devTools, persistState} = require('redux-devtools');
const {DevTools, DebugPanel, LogMonitor} = require('redux-devtools/lib/react');

// Store
const finalCreateStore = compose(
  // Enables your middleware:
  applyMiddleware(createLogger()), // any Redux middleware, e.g. redux-thunk
  // Provides support for DevTools:
  devTools(),
  // Lets you write ?debug_session=<name> in address bar to persist debug sessions
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);
const store = finalCreateStore(reducer, {});

const {add} = require('./actions/items');

ReactDOM.render(
    <div>
    <Provider store={store}>
        <Example/>
    </Provider>
    <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel></div>,

document.getElementById('container'));

// Dispatch

store.dispatch(add('sample1'));
store.dispatch(add('sample2'));
