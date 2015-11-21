const React = require('react');

const {connect} = require('react-redux');
const {bindActionCreators} = require('redux');

const {add, remove, edit} = require('../actions/items');

const Example = React.createClass({
    propTypes: {
        items: React.PropTypes.object,
        onAdd: React.PropTypes.func,
        onEdit: React.PropTypes.func,
        onRemove: React.PropTypes.func
    },
    getDefaultProps() {
        return {
            items: [],
            onAdd: () => {},
            onEdit: () => {},
            onRemove: () => {}
        };
    },
    render() {
        const items = this.props.items.map((item) => {
            return (
                <div key={item.get('num')}>{item.get('text')} <button onClick={this.props.onRemove.bind(null, item)}>-</button>
                    <input defaultValue={item.get('text')} onBlur={this.edit.bind(null, item)}/>
                </div>
            );
        });
        return (
            <div>
                <input ref="text"/> <button onClick={this.add}>+</button>
                {items}
            </div>
        );
    },
    add() {
        this.props.onAdd(this.refs.text.value);
    },
    edit(item, e) {
        this.props.onEdit(item, 'text', e.target.value);
    }
});

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
