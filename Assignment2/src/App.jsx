
function ProductRow(props) {
    const product = props.product;
    return (
        <tr>
            <td>{product.name}</td>
            <td>${product.pricePerUnit}</td>
            <td>{product.category}</td>
            <td><a href={product.imageUrl} target="_blank">View</a></td>
        </tr>
    );
}

function ProductTable(props) {
    const productRows = props.products.map(product =>
        <ProductRow key={product.id} product={product} />
    );

    return (
        <table className="bordered-table">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Image</th>
                </tr>
            </thead>
            <tbody>
                {productRows}
            </tbody>
        </table>
    );
}

class ProductAdd extends React.Component {
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

        this.props.createProduct(product);
        form.name.value = "";
        form.pricePerUnit.value = "$";
        form.category.value = "";
        form.imageUrl.value = "";
    }



    render() {
        return (
            <form name="productAdd" onSubmit={this.handleSubmit}>
				<div>Category&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Price Per Unit
					<br />
					<select id="categoryMenu" name="category">
						<option value="Shirts" selected>Shirts</option>
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
				<button>Add Product</button>
            </form>
        );
    }
}

class ProductList extends React.Component {
    constructor() {
        super();
        this.state = { products: [], };
        this.createProduct = this.createProduct.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        setTimeout(() => {
            this.setState({ products: [] });
        }, 500);
    }

    createProduct(product) {
        product.id = this.state.products.length + 1;
        const newProductList = this.state.products.slice();
        newProductList.push(product);
        this.setState({ products: newProductList });
    }

    render() {
        return (
            <React.Fragment>
                <h1>My Company Inventory</h1>
                <p>Showing all available products</p>
                <hr />
                <ProductTable products={this.state.products} />
                <br />
                <p>Add a new product to inventory</p>
                <hr />
                <ProductAdd createProduct={this.createProduct} />
            </React.Fragment>
        );
    }
}

const element = <ProductList />;

ReactDOM.render(element, document.getElementById('contents'));
