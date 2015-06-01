var pid = 0;

var _products = [
	{id: pid++, name: 'product '+pid, price: 100},
	{id: pid++, name: 'product '+pid, price: 200},
	{id: pid++, name: 'product '+pid, price: 300},
	{id: pid++, name: 'product '+pid, price: 400},

	{id: pid++, name: 'product '+pid, price: 100},
	{id: pid++, name: 'product '+pid, price: 200},
	{id: pid++, name: 'product '+pid, price: 300},
	{id: pid++, name: 'product '+pid, price: 400},

	{id: pid++, name: 'product '+pid, price: 100},
	{id: pid++, name: 'product '+pid, price: 200},
	{id: pid++, name: 'product '+pid, price: 300},
	{id: pid++, name: 'product '+pid, price: 400},

	{id: pid++, name: 'product '+pid, price: 100},
	{id: pid++, name: 'product '+pid, price: 200},
	{id: pid++, name: 'product '+pid, price: 300},
	{id: pid++, name: 'product '+pid, price: 400},

	{id: pid++, name: 'product '+pid, price: 100},
	{id: pid++, name: 'product '+pid, price: 200},
	{id: pid++, name: 'product '+pid, price: 300},
	{id: pid++, name: 'product '+pid, price: 400},
];

var _cart = {
	items: []
};

module.exports = {
	getProducts: function() {
		return new Promise(function(resolve, reject) {
			resolve(_products);
		});
	},

	getCart: function() {
		return new Promise(function(resolve, reject) {
			resolve(_cart);
		});
	}
};