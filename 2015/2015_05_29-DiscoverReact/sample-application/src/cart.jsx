var React = require('react/addons'),
	CTG = React.addons.CSSTransitionGroup,
	store = require('./store');


var Item = React.createClass({
	decrement: function() {
		store.removeOneFromCart(this.props.item.id);
	},

	increment: function() {
		store.addToCart(this.props.item.id);
	},

	remove: function() {
		store.removeFromCart(this.props.item.id);
	},

	render: function() {
		return (
			<div className="cart-item">
				<button onClick={this.remove} className="btn btn-danger btn-xs">x</button>
				<div>{this.props.item.name}</div>
				<div>{this.props.item.qty}</div>X<div>{this.props.item.price}</div>=
				<div className="item-total">{this.props.item.total}</div>
				<button onClick={this.decrement} className="btn btn-primary btn-xs">-</button>
				<button onClick={this.increment} className="btn btn-primary btn-xs">+</button>
			</div>
		);
	}
});


var Cart = React.createClass({
	render: function() {
		var content = this.props.cart.items.length?
			this.renderFull():
			this.renderEmpty();

		return (
			<div className="cart">
				{content}
			</div>
		);
	},

	renderFull: function() {
		var cart = this.props.cart;

		var banner = null;
		if (cart.goldOrder) {
			banner = <h4 className="gold-order">Gold order, 10% discount</h4>
		}

		return (
			<div>
				{banner}
				<h3>Cart - total {cart.total}€</h3>
				<CTG transitionName="add-to-cart" transitionAppear="true">
				{cart.items.map(item => {
					return <Item key={item.id} item={item}/>
				})}
				</CTG>
			</div>
		);
	},

	renderEmpty: function() {
		return (
			<div>
				<h3>Empty Cart :-(</h3>
				<h7>C'mon T-Rex, give us some money!</h7>
			</div>
		);
	}
});

module.exports = Cart;