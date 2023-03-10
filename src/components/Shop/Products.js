import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
	{
		id: 'p1',
		name: 'Book',
		price: 6,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
	},
	{
		id: 'p2',
		name: 'Coffee',
		price: 3,
		description: 'Ice Americano',
	},
];

const Products = (props) => {
	return (
		<section className={classes.products}>
			<h2>Buy your favorite products</h2>
			<ul>
				{DUMMY_PRODUCTS.map((product) => (
					<ProductItem
                        key={product.id}
                        id={product.id}
						name={product.name}
						price={product.price}
						description={product.description}
					/>
				))}
			</ul>
		</section>
	);
};

export default Products;
