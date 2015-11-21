const {combineReducers, createStore, bindActionCreators} = require('redux');
const {Provider, connect} = require('react-redux');
const React = require('react');
const ReactDOM = require('react-dom');

// Action Types
const ADD_ACTION = 'ADD_ACTION';
const REMOVE_ACTION = 'REMOVE_ACTION';
const EDIT_ACTION = 'EDIT_ACTION';

// Action Creators

const add = (item) => {
    return {
        type: ADD_ACTION,
        item
    };
};

const remove = (item) => {
    return {
        type: REMOVE_ACTION,
        item
    };
};

const edit = (item, propName, propValue) => {
    return {
        type: EDIT_ACTION,
        item,
        propName,
        propValue
    };
};


// Reducers
const items = (state = [], action) => {
    switch (action.type) {
        case ADD_ACTION: {
            return state.slice(0).concat([action.item]);
        }
        case REMOVE_ACTION: {
            return state.filter((item) => item.num !== action.item);
        }
        case EDIT_ACTION: {
            return state.map((item) => item.num !== action.item ? item : Object.assign({}, item, {[action.propName]: action.propValue}));
        }
        default:
            return state;
    }
};

// Root reducer
const reducer = combineReducers({
    items
});

// Store
const store = createStore(reducer, {});

const Example = React.createClass({
    propTypes: {
        items: React.PropTypes.array,
        remove: React.PropTypes.func,
        edit: React.PropTypes.func
    },
    render() {
        let itemsList = this.props.items.map((item) => <li key={item.num}>{item.text}</li>);
        return (
            <div>
                <ul>{itemsList}</ul>
                <button onClick={this.update}>Click me!</button>
            </div>
        );
    },
    update() {
        this.props.remove(1);
        this.props.edit(2, "text", "changed");
    }
});

const ConnectedExample = connect((state) => {
    return {
        items: state.items
    };
},
(dispatch) => bindActionCreators({
    remove,
    edit
}, dispatch))(Example);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedExample/>
    </Provider>,
    document.getElementById('container'));

// Dispatch
const item1 = {
    text: 'sample1',
    num: 1
};

const item2 = {
    text: 'sample2',
    num: 2
};

const item3 = {
    text: 'sample3',
    num: 3
};

store.dispatch(add(item1));
store.dispatch(add(item2));
store.dispatch(add(item3));
