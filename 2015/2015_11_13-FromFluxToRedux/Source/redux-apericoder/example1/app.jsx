const {combineReducers, createStore} = require('redux');

// Action Types
const SAMPLE_ACTION = 'SAMPLE_ACTION';

// Action Creators
const sampleAction = (payload) => {
    return {
        type: SAMPLE_ACTION,
        payload
    };
};

// Reducers
const sampleReducer = (state = null, action) => {
    switch (action.type) {
        case SAMPLE_ACTION: {
            return {
                sample: action.payload
            };
        }
        default:
            return state;
    }
};

// Root reducer
const reducer = combineReducers({
    slice1: sampleReducer
});

// Store
const store = createStore(reducer, {});

// Subscribe
store.subscribe(() => {
    console.log(store.getState());
});

// Dispatch
store.dispatch(sampleAction('sample1'));
store.dispatch(sampleAction('sample2'));
