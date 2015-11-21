// Action Types
const ADD_ACTION = 'ADD_ACTION';
const REMOVE_ACTION = 'REMOVE_ACTION';
const EDIT_ACTION = 'EDIT_ACTION';

// Action Creators

const add = (text) => {
    return {
        type: ADD_ACTION,
        text
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

module.exports = {ADD_ACTION, REMOVE_ACTION, EDIT_ACTION, add, remove, edit};
