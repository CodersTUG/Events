const React = require('react');

const {connect} = require('react-redux');
const {bindActionCreators} = require('redux');

const {add, remove, edit} = require('../actions/items');

const onEdit = (props, item, e) => props.onEdit(item, 'text', e.target.value);

const onAdd = (props) => props.onAdd(document.getElementById("text_input").value);

const Example = (props) => {
    const items = props.items.map((item) => {
        return (
            <div key={item.get('num')}>{item.get('text')} <button onClick={props.onRemove.bind(null, item)}>-</button>
                <input defaultValue={item.get('text')} onBlur={onEdit.bind(null, props, item)}/>
            </div>
        );
    });
    return (
        <div>
            <input id="text_input"/> <button onClick={onAdd.bind(null, props)}>+</button>
            {items}
        </div>
    );
};

module.exports = connect((state) => {
    return {
        items: state.items
    };
}, dispatch => {
    return bindActionCreators({
        onAdd: add,
        onRemove: remove,
        onEdit: edit
    }, dispatch);
})(Example);
