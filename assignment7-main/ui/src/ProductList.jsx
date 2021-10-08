/* eslint-disable react/jsx-no-undef */
import React from 'react';

import ProductTable from './ProductTable.jsx';
import graphQLFetch from './graphQLFetch.js';

export default class ProductList extends React.Component {
  constructor() {
    super();
    this.state = { products: [], prodCount: [] };
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
            productList {
              id
              name
              pricePerUnit
              category
              imageUrl
            },
            productCount {
              count
            }
          }`;

    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ products: data.productList, prodCount: data.productCount[0].count });
    }
  }

  async deleteProduct(id) {
    const query = `mutation deleteProduct($id: Int!) {
      deleteProduct(id: $id)
    }`;

    const data = await graphQLFetch(query, { id });
    if (data) {
      alert('Product deleted product successfully!');
      this.loadData();
    }
  }

  render() {
    const { products, prodCount } = this.state;

    return (
      <React.Fragment>
        <h4>Showing {prodCount} available products</h4>
        <hr />
        <ProductTable products={products} deleteProduct={this.deleteProduct} />
        <br />
      </React.Fragment>
    );
  }
}
