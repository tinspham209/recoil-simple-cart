# Mini Project: Recoil Simple Cart

## Date: 31 - Aug - 2020

### Function:

- Study `Recoil`, a new library to state management from Facebook

### Tech-Stack

- React Hooks
- Recoil - state management

### Agenda:

- Setup project
- Setup RecoilRoot
- Render product list
- Handle add to cart
- Render cart info

### Plan Of Action

1. Setup project with [create-react-app](https://create-react-app.dev/docs/getting-started/)

2. Install `recoil` package

```
npm install --save recoil
```

3. Setup RecoilRoot
   Edit `src/index.js` to add `RecoilRoot` component, so that you can use `recoil hooks any where in ur app.

```js
// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import App from "./App";

ReactDOM.render(
	<React.StrictMode>
		<RecoilRoot>
			<App />
		</RecoilRoot>
	</React.StrictMode>,
	document.getElementById("root")
);
```

4. Render product list

Define `a product list state` using `atom`

```js
// features/cart/productState.js
import { atom } from "recoil";

export const productListState = atom({
	key: "productList",
	default: [
		{ id: 1, price: 150000, title: "Áo thun nam" },
		{ id: 2, price: 250000, title: "Áo sơ mi nữ" },
		{ id: 3, price: 300000, title: "Áo khoắc thời trang" },
	],
});
```

Render `product list state` in component `ProductList`
5 Handle add to cart

```js
// features/cart/component/ProductList.jsx
function ProductList() {
	const productList = useRecoilValue(productListState);

	return (
		<div>
			<h2>Product List</h2>

			<ul className="product-list">
				{productList.map((product) => (
					<li key={product.id}>{product.title}</li>
				))}
			</ul>
		</div>
	);
}

export default ProductList;
```

Define cart state using atom

```js
// features/cart/cartState.js
import { atom } from "recoil";

export const cartState = atom({
	key: "cart",
	// each item in list has 3 keys: id, product and quantity
	default: [],
});
```

Implement `addToCart()` function that take current state and newItem and return a new state

```js
// features/cart/cartState.js
export const addToCart = (cart, item) => {
	const newCart = [...cart];
	const foundIndex = cart.findIndex((x) => x.id === item.id);

	// Increase quantity if existing
	if (foundIndex >= 0) {
		newCart[foundIndex] = {
			...cart[foundIndex],
			quantity: cart[foundIndex].quantity + 1,
		};
		return newCart;
	}

	// Add new item
	newCart.push({
		id: item.id,
		product: item,
		quantity: 1,
	});
	return newCart;
};
```

Add button `Add to cart` to product list

```js
// features/cart/component/ProductList.jsx
function ProductList() {
	const productList = useRecoilValue(productListState);

	// 1. Add this handler
	const handleAddToCart = (product) => {};

	return (
		<div>
			<h2>Product List</h2>

			<ul className="product-list">
				{productList.map((product) => (
					<li key={product.id}>
						{product.title}

						{/* 2. ADD THIS BUTTON */}
						<button
							style={{ marginLeft: "1rem" }}
							onClick={() => handleAddToCart(product)}
						>
							Add to cart
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
```

Implement add to cart handler

```js
// features/cart/component/ProductList.jsx
function ProductList() {
	const productList = useRecoilValue(productListState);
	const [cart, setCart] = useRecoilState(cartState); // 1. Get recoil state

	const handleAddToCart = (product) => {
		const newCart = addToCart(cart, product); // 2. Use helper to create a new state
		setCart(newCart); // 3. Update recoil state
	};
	// return (...);
}
```

6. Render cart info

Render current cart items in `CardInfo` component

```js
// features/cart/components/CartInfo.jsx
function CartInfo(props) {
	const cart = useRecoilValue(cartState);

	return (
		<div>
			<h2>Cart info:</h2>

			<ul className="cart-items">
				{cart.map((item) => (
					<li key={item.id}>
						{item.product.title}: {item.quantity}
					</li>
				))}
			</ul>
		</div>
	);
}
```

Define a `selector` that calculate `cart total` base on cart state

```js
// features/cart/cartState.js
import { atom, selector } from "recoil";

export const cartState = atom({
	key: "cart",
	// each item in list has 3 keys: id, product and quantity
	default: [],
});

// NEW CODE HERE
export const cartTotal = selector({
	key: "cartTotal",
	get: ({ get }) => {
		const cart = get(cartState);

		return cart.reduce((total, item) => {
			return total + item.product.price * item.quantity;
		}, 0);
	},
});
```

Update CartInfo component to also render cart total

```js
function CartInfo(props) {
	const cart = useRecoilValue(cartState);
	const total = useRecoilValue(cartTotal); // 1. Read selector value

	return (
		<div>
			<h2>Cart info:</h2>

			<ul className="cart-items">
				{cart.map((item) => (
					<li key={item.id}>
						{item.product.title}: {item.quantity}
					</li>
				))}
			</ul>

			{/* 2. Render it! Sweeeeet! 😍 */}
			<h4>Total: {total} VND</h4>
		</div>
	);
}
```

### Directory Structure

```
.
├── .gitignore
├── package.json
├── README.md
├── public
└── src
    ├── features
        └── cart
            ├── components
                ├── CartInfo
                └── ProductList
            ├── cartState.js
            ├── productState.js
            └── index.jsx
    ├── App.js
    ├── App.css
    ├── index.css
    └── index.js
```

### Set up

Use the cmd line to clone repo to your computer

```
git clone [github_repo_url]
```

Use the cmd line to install dependencies.

```
npm install
```

Run in cmd for start the dependencies server

```
npm start
```
