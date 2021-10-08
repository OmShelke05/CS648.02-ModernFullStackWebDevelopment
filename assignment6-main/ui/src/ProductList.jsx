/* eslint-disable react/jsx-no-undef */
import React from 'react';

import ProductTable from './ProductTable.jsx';

import graphQLFetch from './graphQLFetch.js';

export default class ProductList extends React.Component {
    constructor() {
        super();
        this.state = { products: [], };
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
            }
          }`;
     
        const data = await graphQLFetch(query);
        if (data) {
        this.setState({ products: data.productList });
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
        const { products } = this.state;
        return (
            <React.Fragment>
                <h1>My Company Inventory</h1>
                <p>Showing all available products</p>
                <hr />
                <ProductTable products={products} deleteProduct={this.deleteProduct} />
                <br />
            </React.Fragment>
        );
    }
}