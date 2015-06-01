/*jshint esnext: true*/

var EventEmitter = require('events').EventEmitter,
	R = require('ramda'),
	assign = Object.assign;

var _products = [];
var _cart = { total: 0, items: [] };

var emitChange = function() {
	store.emit('change');
};

var store = assign({
	getProducts: function() { return _products; },
	setProducts: function(products) { _products = products; emitChange(); },
	getCart: function() { return _cart; },
	setCart: function(cart) { _cart = cart; emitChange(); },

	addToCart: function(productId) {
		var item,
			matchById = R.propEq('id', productId);

		if (R.any(matchById, _cart.items)) {
			item = R.find(matchById, _cart.items);
			item.qty++;

		} else {
			let product = R.find(matchById, _products);
			item = assign({}, product, {qty: 1});
			_cart.items.push(item);
		}

		this._updateTotalItem(item);
		this._updateTotalCart();
		emitChange();
	},

	removeFromCart: function(productId) {
		var matchById = R.propEq('id', productId);
		_cart.items = R.reject(matchById, _cart.items);

		this._updateTotalCart();
		emitChange();
	},

	removeOneFromCart: function(productId) {
		var matchById = R.propEq('id', productId);
		var item = R.find(matchById, _cart.items);
		item.qty--;

		this._updateTotalItem(item);
		this._updateTotalCart();
		emitChange();
	},

	_updateTotalItem: function(item) {
		item.total = item.price * item.qty;
	},

	_updateTotalCart: function() {
		_cart.total = R.pipe(
			R.map(R.prop('total')),
			R.sum
		)(_cart.items);

		_cart.goldOrder = _cart.total > 1000;
		_cart.total = _cart.total * 0.9;
	},

	onChange: function(callback) {
		this.on('change', callback);
	}
}, EventEmitter.prototype);

module.exports = store;