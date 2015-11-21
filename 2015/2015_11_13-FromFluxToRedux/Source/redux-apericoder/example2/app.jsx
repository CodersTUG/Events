const {combineReducers, createStore} = require('redux');

// Action Types
const SAMPLE_ACTION = 'SAMPLE_ACTION';
const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

// Action Creators

const sampleAction = (payload) => {
    return {
        type: SAMPLE_ACTION,
        payload
    };
};

const incrementCounter = () => {
    return {
        type: INCREMENT_COUNTER
    };
};

const decrementCounter = () => {
    return {
        type: INCREMENT_COUNTER
    };
};

// Reducers
const counterReducer = (state = 0, action) => {
    switch (action.type) {
        case INCREMENT_COUNTER: {
            return state + 1;
        }
        case DECREMENT_COUNTER: {
            return state - 1;
        }
        default:
            return state;
    }
};

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
    sample: sampleReducer,
    counter: counterReducer
});

// Store
const store = createStore(reducer, {});

// Subscribe
store.subscribe(() => {
    console.log(store.getState());
});

// Dispatch
store.dispatch(sampleAction('sample1'));
[1, 2, 3, 4, 5].forEach(() => store.dispatch(incrementCounter()));
[1, 2, 3, 4, 5].forEach(() => store.dispatch(decrementCounter()));
store.dispatch(sampleAction('sample2'));
