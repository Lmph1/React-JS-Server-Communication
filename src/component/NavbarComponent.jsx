import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../App.css'
export default function NavbarComponent() {
  return (
    <div>
<Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand as = {Link} to = "/">React-Bootstrap</Navbar.Brand>
    <Nav className="me-right">
      <Nav.Link as = {Link} to = "/">Home</Nav.Link>
      <Nav.Link as = {Link} to = "/category">Categories</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
    </div>
  )
}

