const React = require('react');

const {connect} = require('react-redux');
const {bindActionCreators} = require('redux');

const {add, remove, edit} = require('../actions/items');

const {createSelector} = require('reselect');

const Example = React.createClass({
    propTypes: {
        items: React.PropTypes.object,
        total: React.PropTypes.number,
        computed: React.PropTypes.number,
        onAdd: React.PropTypes.func,
        onEdit: React.PropTypes.func,
        onRemove: React.PropTypes.func
    },
    getDefaultProps() {
        return {
            items: [],
            total: 0,
            computed: 0,
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
                <h2>{this.props.total}</h2>
                <h2>{this.props.computed}</h2>
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

const totalSelector = (state) => state.items ? state.items.size : 0;

const computedSelector = createSelector([totalSelector], (total) => {
    return total * 2;
});

const selector = createSelector([
    (state) => state.items,
    totalSelector,
    computedSelector
], (items, total, computed) => {
    return {
        items,
        total,
        computed
    };
});

module.exports = connect(selector, dispatch => {
    return bindActionCreators({
        onAdd: add,
        onRemove: remove,
        onEdit: edit
    }, dispatch);
})(Example);
