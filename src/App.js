import React from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: [],
      size: "",
      sort: "",
    };
  }

  removeFromCart = (item) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({ cartItems: cartItems.filter((x) => x._id !== item._id) });
    console.log(this.state.cartItems);
  };

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({
      cartItems: cartItems,
    });
  };

  filterProducts = (e) => {
    const size = e.target.value;
    console.log(size);
    if (e.target.value === "") {
      this.setState({ size: size, products: data.products });
    } else {
      this.setState({
        size: size,
        products: data.products.filter(
          (item) => item.availableSizes.indexOf(size) >= 0
        ),
      });
    }
  };

  sortProducts = (e) => {
    const sort = e.target.value;
    console.log(sort);
    this.setState((state) => ({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : a._id > b._id
            ? 1
            : -1
        ),
    }));
  };

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main-content">
              <Filter
                count={this.state.products.length}
                size={this.state.sort}
                size={this.state.size}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              />
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
              />
            </div>
            <div className="sidebar">
              <Cart
                cartItems={this.state.cartItems}
                removeFromCart={this.removeFromCart}
              />
            </div>
          </div>
        </main>
        <footer>All Rights Reserved.</footer>
      </div>
    );
  }
}

export default App;
