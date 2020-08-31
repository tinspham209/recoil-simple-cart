import React from "react";
import { useRecoilValue } from "recoil";
import { productListState } from "../../productState";

ProductList.propTypes = {};

function ProductList() {
	const productList = useRecoilValue(productListState);
	return (
		<div>
			<h2>Product List</h2>

			<ul className="product-list">
				{productList.map((product) => {
					return <li key={product.id}>{product.title}</li>;
				})}
			</ul>
		</div>
	);
}

export default ProductList;
