/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

export default class ProductAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.productAdd;

        const product = {
            name: form.name.value, 
            pricePerUnit: form.pricePerUnit.value.substr(1), 
            category: form.category.value, 
            imageUrl: form.imageUrl.value,
        }

        const { createProduct } = this.props;
        createProduct(product);
        form.name.value = '';
        form.pricePerUnit.value = '$';
        form.category.value = '';
        form.imageUrl.value = '';
    }



    render() {
        return (
            <form name="productAdd" onSubmit={this.handleSubmit}>
				<div>Category&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Price Per Unit
					<br />
					<select id="categoryMenu" name="category">
						<option value="Shirts" >Shirts</option>
						<option value="Jeans">Jeans</option>
						<option value="Jackets">Jackets</option>
						<option value="Sweaters">Sweaters</option>
						<option value="Accessories">Accessories</option>
					</select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="text" name="pricePerUnit" defaultValue="$" size="10" />
				</div>
		
				<br />
	
				<div>Product Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Image URL
					<br /><input type="text" name="name" size="10" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="URL" name="imageUrl" size="10"/>
				</div>
		<br />	
				<button type="submit">Add Product</button>
            </form>
        );
    }
}

ProductAdd.propTypes = {
    createProduct: PropTypes.func.isRequired,
  };