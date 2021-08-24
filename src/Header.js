import { Link, useHistory } from 'react-router-dom'
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"

function Header() {
    const history = useHistory();

    let user = JSON.parse(localStorage.getItem('user-info'));
    function logOut(){
        localStorage.clear()
        history.push("/login")
    }

    function logIn(){
        history.push("/login")
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">E-Commerce</Navbar.Brand>
                <Nav className="me-auto navBar">
                    {
                        localStorage.getItem('user-info') ?
                            <>
                                <Link to="/">Product List</Link>
                                <Link to="/addproduct">Add Product</Link>
                                <Link to="/search">Search</Link>
                            </>
                            :
                            <>
                                <Link to="/login">Login</Link>
                                <Link to="/register">Register</Link>
                            </>
                    }
                </Nav>
                <Nav>
                    <NavDropdown title="Session">
                        {
                            localStorage.getItem('user-info') ?
                            <>
                            <NavDropdown.Item className="text-capitalize" href="">{user.name}</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logOut}>Log Out</NavDropdown.Item>
                            </>
                            : 
                            <NavDropdown.Item onClick={logIn}>Log In</NavDropdown.Item>
                        }
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header
