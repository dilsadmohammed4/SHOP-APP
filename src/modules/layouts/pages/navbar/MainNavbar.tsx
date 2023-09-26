import React from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";

export const MainNavbar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <Navbar bg="success" expand="sm" variant="dark">
                <Container>
                    <Navbar.Brand>
                        <Link to={'/'} className="text-white text-decoration-none">React E-Commerce</Link>
                    </Navbar.Brand>
                    <Navbar.Collapse>
                        <Nav>
                            <Link to={"/products/fashion"} className="nav-link">Fashion</Link>
                        </Nav>
                        <Nav>
                            <Link to={"/products/electronics"} className="nav-link">Electronics</Link>
                        </Nav>
                        <Nav>
                            <Link to={"/products/household"} className="nav-link">HouseHold</Link>
                        </Nav>
                        <Nav>
                            <NavDropdown title="Admin" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={() => navigate('/categories/add')}>Add
                                    Categories</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => navigate('/products/upload')}>Upload
                                    Products</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item onClick={() => navigate('/products/admin')}>Manage
                                    Products</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => navigate("/orders/admin")}>Manage
                                    Orders</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <div className="d-flex ms-auto">
                            <Nav className="">
                                <Link to={"/cart/list"} className="nav-link pe-3">
                                    <i className="bi bi-cart-fill">
                                        <span className="cart-count">{0}</span>
                                    </i>
                                </Link>
                            </Nav>
                            <Nav className="">
                                <Link to={"/users/profile"} className="nav-link">
                                    <img
                                        src="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
                                        alt="" width={25} height={25}/>
                                </Link>
                            </Nav>
                            <Nav>
                                <NavDropdown title="DILSAD" id="basic-nav-dropdown">
                                    <NavDropdown.Item
                                        onClick={() => navigate('/users/profile')}>Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => navigate('/users/change-password')}>Change
                                        Password</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => navigate('/users/orders/me')}>My
                                        Orders</NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item onClick={() => navigate('/')}><i
                                        className="bi bi-power"></i> LogOut</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};