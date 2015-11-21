const {createStore} = require('redux');

const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');

const Example = require('./components/Example');

// Root reducer
const reducer = require('./reducers/items');

// Store
const store = createStore(reducer, {});

const {add} = require('./actions/items');

ReactDOM.render(
    <Provider store={store}>
        <Example/>
    </Provider>,
document.getElementById('container'));

// Dispatch

store.dispatch(add('sample1'));
store.dispatch(add('sample2'));
