import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Outlet } from 'react-router-dom'; 

class NavBarApp extends React.Component {
  render () {
    return (
      <div>
        <Navbar expand='lg' className='bg-body-tertiary'>
          <Container>
            <Navbar.Brand href='#home'>TBQ QuizWhiz</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='me-auto'>
                <Nav.Link href='/'>Home</Nav.Link>
                <Nav.Link href='/gameOne'>Game 1</Nav.Link>
                <Nav.Link href='/gameTwo'>Game 2</Nav.Link>
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
