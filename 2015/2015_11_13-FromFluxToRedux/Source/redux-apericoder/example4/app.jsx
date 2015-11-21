const Immutable = require('immutable');
const {combineReducers, createStore} = require('redux');

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
const items = (state = Immutable.List(), action) => {
    switch (action.type) {
        case ADD_ACTION: {
            return state.push(Immutable.fromJS(action.item));
        }
        case REMOVE_ACTION: {
            return state.filter((item) => item !== action.item);
        }
        case EDIT_ACTION: {
            const index = state.findIndex((item) => item === action.item);
            return state.update(index, (item) => item.set(action.propName, action.propValue));
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
let oldState = null;
// Subscribe
store.subscribe(() => {
    if (oldState) {
        console.log(store.getState().items === oldState.items);
    }
    console.log(store.getState().items.toJSON());
    oldState = store.getState();
});

// Dispatch
const item1 = {
    text: 'sample1',
    num: 1
};

const item2 = {
    text: 'sample2',
    num: 2
};

store.dispatch(add(item1));
store.dispatch(add(item2));

store.dispatch(remove(item1));
store.dispatch(edit(item2, "text", "changed"));
store.dispatch(edit(item2, "text", "changed"));
