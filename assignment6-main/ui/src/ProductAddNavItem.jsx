import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  NavItem, Glyphicon, Modal, Form, FormGroup, FormControl, ControlLabel,
  Button, ButtonToolbar, Tooltip, OverlayTrigger,
} from 'react-bootstrap';
import Toast from './Toast.jsx';

import graphQLFetch from './graphQLFetch.js';

class ProductAddNavItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
      toastVisible: false,
      toastMessage: '',
      toastType: 'success',
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  showModal() {
    this.setState({ showing: true });
  }

  hideModal() {
    this.setState({ showing: false });
  }

  showError(message) {
    this.setState({
      toastVisible: true, toastMessage: message, toastType: 'danger',
    });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
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
      const { history } = this.props;
      history.push('/');
    }
  }

  async createProduct(product) {
    const query = `mutation addProduct($product: ProductInputs!) {
            addProduct(product: $product) {
                id
            }
          }`;

    const data = await graphQLFetch(query, { product },  this.showError);
    if (data) {
      this.loadData();
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.hideModal();
    const form = document.forms.productAdd;

    const product = {
      name: form.name.value, pricePerUnit: form.pricePerUnit.value, category: form.category.value, imageUrl: form.imageUrl.value,
    };

    await this.createProduct(product);

    form.productName.value = '';
    form.pricePerUnit.value = '$';
    form.category.value = 'Shirts';
    form.imageUrl.value = '';
  }

  render() {
    const { showing } = this.state;
    const { toastVisible, toastMessage, toastType } = this.state;
    return (
      <React.Fragment>
        <NavItem onClick={this.showModal}>
          <OverlayTrigger
            placement="left"
            delayShow={1000}
            overlay={<Tooltip id="add-product">Add Product</Tooltip>}
          >
            <Glyphicon glyph="plus" />
          </OverlayTrigger>
        </NavItem>
        <Modal keyboard show={showing} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form name="productAdd">
              <FormGroup>
                <ControlLabel>Category:</ControlLabel>
                <FormControl
                  componentClass="select"
                  name="category"
                  autoFocus
                >
                  <option value="Shirts">Shirts</option>
                  <option value="Jeans">Jeans</option>
                  <option value="Jackets">Jackets</option>
                  <option value="Sweaters">Sweaters</option>
                  <option value="Accessories">Accessories</option>
                </FormControl>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Product Name</ControlLabel>
                <FormControl name="name" />
              </FormGroup>

              <FormGroup>
                <ControlLabel>Price Per Unit (in $)</ControlLabel>
                <FormControl name="pricePerUnit" type="number" />
              </FormGroup>

              <FormGroup>
                <ControlLabel>Image URL</ControlLabel>
                <FormControl name="imageUrl" />
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar>
              <Button
                type="button"
                bsStyle="primary"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
              <Button bsStyle="link" onClick={this.hideModal}>Cancel</Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
        <Toast
          showing={toastVisible}
          onDismiss={this.dismissToast}
          bsStyle={toastType}
        >
          {toastMessage}
        </Toast>
      </React.Fragment>
    );
  }
}

export default withRouter(ProductAddNavItem);
