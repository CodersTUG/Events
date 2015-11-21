const Immutable = require('immutable');
const {combineReducers} = require('redux');

const {ADD_ACTION, REMOVE_ACTION, EDIT_ACTION} = require('../actions/items');

// Reducers
const items = (state = Immutable.List(), action) => {
    switch (action.type) {
        case ADD_ACTION: {
            return state.push(Immutable.fromJS({
                num: state.size,
                text: action.text
            }));
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
module.exports = combineReducers({
    items
});
