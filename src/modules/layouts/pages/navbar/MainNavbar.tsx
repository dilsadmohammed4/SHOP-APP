import React from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import * as userReducer from "../../../../redux/user/user.slice";
import {useSelector} from "react-redux";
import {AppDispatch, RootState, useAppDispatch} from "../../../../redux/store";
import {TokenUtil} from "../../../../utils/TokenUtil";
import * as cartReducer from "../../../../redux/cart/cart.slice";

export const MainNavbar: React.FC = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useAppDispatch();
    const navigateTo = (path: string) => {
        navigate(path);
    }
    const userState: userReducer.InitialState = useSelector((store: RootState) => {
        return store[userReducer.userFeatureKey];
    })
    const clickLogout = () => {

        dispatch({
            type: `${userReducer.logoutAction}`
        })
        navigateTo("/");
    }
    const cartReduxState: cartReducer.InitialState = useSelector((store: RootState) => {
        return store[cartReducer.cartFeatureKey];
    })
    const {cartProduct} = cartReduxState;
    const {user, isAuthenticated} = userState;
    return (
        <>
            <Navbar bg="success" expand="sm" variant="dark">
                <Container>
                    <Navbar.Brand>
                        <Link to={'/'} className="text-white text-decoration-none">React E-Commerce</Link>
                    </Navbar.Brand>
                    <Navbar.Collapse>
                        {
                            TokenUtil.isLoggedIn() && isAuthenticated && user && Object.keys(user).length > 0 &&
                            <>
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
                            </>

                        }
                        <div className="d-flex ms-auto">
                            {
                                TokenUtil.isLoggedIn() && isAuthenticated && user && Object.keys(user).length > 0 &&
                                <>
                                    <Nav className="">
                                        <Link to={"/cart/list"} className="nav-link pe-3">
                                            <i className="bi bi-cart-fill">
                                                <span className="cart-count">{cartProduct?.products.length}</span>
                                            </i>
                                        </Link>
                                    </Nav>
                                    <Nav className="">
                                        <Link to={"/users/profile"} className="nav-link">
                                            <img className="rounded-circle" src={user.imageUrl} alt="" width={25}
                                                 height={25}/>
                                        </Link>
                                    </Nav>
                                    <Nav>
                                        <NavDropdown title={user.username.toUpperCase()} id="basic-nav-dropdown">
                                            <NavDropdown.Item
                                                onClick={() => navigate('/users/profile')}>Profile</NavDropdown.Item>
                                            <NavDropdown.Item onClick={() => navigate('/users/change-password')}>Change
                                                Password</NavDropdown.Item>
                                            <NavDropdown.Item onClick={() => navigate('/users/orders/me')}>My
                                                Orders</NavDropdown.Item>
                                            <NavDropdown.Divider/>
                                            <NavDropdown.Item onClick={clickLogout}><i
                                                className="bi bi-power"></i> LogOut</NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                </>
                            }
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};