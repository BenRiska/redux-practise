// feature 1
import React from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
    };
  }

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
              <Products products={this.state.products} />
            </div>
            <div className="sidebar">Cart Items</div>
          </div>
        </main>
        <footer>All Rights Reserved.</footer>
      </div>
    );
  }
}

export default App;
