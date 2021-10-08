import React from 'react';
import {
  Navbar, Nav, NavItem, NavDropdown,
  MenuItem, Glyphicon, Grid,
 } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Contents from './Contents.jsx';
import ProductAddNavItem from './ProductAddNavItem.jsx';

function NavBar() {
    return (
      <Navbar>
        <Navbar.Header>
           <Navbar.Brand>My Company Inventory</Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <LinkContainer exact to="/">
            <NavItem>Home</NavItem>
          </LinkContainer>
          <LinkContainer to="/products">
            <NavItem>Product List</NavItem>
          </LinkContainer>
        </Nav>
        <Nav pullRight>
        <ProductAddNavItem />
        </Nav>
      </Navbar>
    );
  }

  
function Footer() {
  return (
    <small>
      <hr />
      <p className="text-center">
        Full source code available at this
        {' '}
        <a href="https://github.com/OmShelke05/">
          GitHub repository
        </a>
      </p>
    </small>
  );
}

export default function Page() {
  return (
    <div>
      <NavBar />
      <Grid fluid>
      <Contents />
    </Grid>
    <Footer/>
    </div>
  );
}
