import React from 'react'
import './NavBar.css'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Outlet } from 'react-router-dom'; 

class NavBarApp extends React.Component {
  render () {
    return (
      <div>
        <Navbar sticky='top' expand='lg' className='navbar-custom' >
          <Container>
            <Navbar.Brand className='navbar-link-custom' href='/'>TBQuizWhiz</Navbar.Brand>
            <Navbar.Toggle className="custom-toggler" aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='me-auto'>
                <Nav.Link className='navbar-link-custom' href='/'>Home</Nav.Link>
                <Nav.Link className='navbar-link-custom' href='/gameOne'>Game 1</Nav.Link>
                <Nav.Link className='navbar-link-custom' href='/gameTwo'>Game 2</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Outlet />
      </div>
    )
  }
}

export default NavBarApp
