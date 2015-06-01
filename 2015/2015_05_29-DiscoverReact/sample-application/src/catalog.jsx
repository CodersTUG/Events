var React = require('react');

var Product = React.createClass({
	handleClick: function() {
		this.props.onAdd(this.props.product.id);
	},

	render: function() {
		var p = this.props.product;

		return (
			<div className="catalog-item">
				<div>{p.name}</div>
				<div>{p.price}</div>
				<button
					onClick={this.handleClick}
					className="btn btn-warning btn-xs">Add</button>
			</div>
		);
	}
});

var Catalog = React.createClass({
	render: function() {

		return (
			<div className="catalog">
				<h3>You're browsing through {this.props.products.length} products</h3>

				{this.props.products.map(p => {
					return <Product onAdd={this.props.onAdd} product={p}/>
				})}
			</div>
		);
	}
});

module.exports = Catalog;













/*
render: function() {
	return (
		<div className="catalog">
			<h3>You're browsing through {this.props.products.length} products</h3>

			{this.props.products.map(p => {
				return <Product onAdd={this.props.onAdd} product={p}/>
			})}
		</div>
	);
}


return (
	<div className="catalog-item">
		<div>{p.name}</div>
		<div>{p.price}</div>
		<button
			onClick={this.handleClick}
			className="btn btn-warning btn-xs">Add</button>
	</div>
);

*/