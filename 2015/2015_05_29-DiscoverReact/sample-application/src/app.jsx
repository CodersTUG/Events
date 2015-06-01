//not interesting but they make ES6, jQuery & bootstrap work
require('babelify/polyfill');
global.jQuery = require('jquery');
require('bootstrap');

//here starts the app
var React = require('react'),
	backend = require('./backend'),
	store = require('./store'),
	Catalog = require('./catalog.jsx'),
	Cart = require('./cart.jsx');

var getAppState = function() {
	return {
		products: store.getProducts(),
		cart: store.getCart()
	};
};

var App = React.createClass({
	getInitialState: function() {
		return getAppState();
	},

	componentDidMount: function() {
		store.onChange(this.updateState);
	},

	componentWillUnmount: function() {
		store.removeChangeListener(this.updateState);
	},

	updateState: function() {
		this.setState(getAppState());
	},

	addProduct: function(productId) {
		console.log('add product', productId);
		store.addToCart(productId);
	},

    render: function() {
		var products = this.state.products;
		var cart = this.state.cart;

		return (
			<div>
				<h1 className="app-title">React shopping cart</h1>

				<div className="row">
					<div className="col-md-8">
						<Catalog products={products} onAdd={this.addProduct}/>
					</div>
					<div className="col-md-4">
						<Cart cart={cart}/>
					</div>
				</div>
			</div>
		);
    }
});

backend.getProducts().then(store.setProducts.bind(store));
backend.getCart().then(store.setCart.bind(store));

React.render(<App/>, document.getElementById('example'));